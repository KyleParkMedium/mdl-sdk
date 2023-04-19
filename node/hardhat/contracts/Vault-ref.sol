// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract VaultRef is ReentrancyGuard, Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // 암호화폐 예치 정보를 저장하는 구조체
    struct UserInfo {
        uint256 amount; // 예치한 암호화폐의 수량
        uint256 rewardDebt; // 예치 시점의 미지급 보상액
    }

    // Vault 컨트랙트에서 사용하는 상수값
    uint256 public constant DURATION = 7 days;

    // Vault 컨트랙트에서 사용하는 변수
    uint256 public periodFinish; // 현재 보상 기간의 종료 시간
    uint256 public rewardRate; // 단위 시간당 보상액
    uint256 public lastUpdateTime; // 마지막 업데이트 시간
    uint256 public rewardPerTokenStored; // 단위 암호화폐 당 미지급 보상액
    uint256 public totalSupply; // 예치된 암호화폐의 총 수량
    uint256 public lockedAmount; // 현재 잠긴 암호화폐의 수량
    uint256 public unlockTime; // 암호화폐 잠금이 해제되는 시점
    IERC20 public token; // 예치할 암호화폐의 ERC20 토큰
    mapping(address => UserInfo) public userInfo;

    event RewardAdded(uint256 reward);
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(address _token) {
        token = IERC20(_token);
    }

    // Vault 컨트랙트에 예치할 암호화폐의 잠금을 해제하고 보상을 지급하는 함수
    function unlockAndClaim() external nonReentrant {
        require(block.timestamp >= unlockTime, "Vault: locked");
        require(userInfo[msg.sender].amount > 0, "Vault: no deposit");

        uint256 reward = _calculateReward(msg.sender);
        if (reward > 0) {
            _payReward(reward);
        }

        _withdraw(userInfo[msg.sender].amount);
        userInfo[msg.sender].amount = 0;
        userInfo[msg.sender].rewardDebt = 0;
        totalSupply = totalSupply.sub(userInfo[msg.sender].amount);

        emit Withdrawn(msg.sender, userInfo[msg.sender].amount);
        emit RewardPaid(msg.sender, reward);
    }

    // 이전 보상 기간 동안 지급되지 않은 보상을 지급하고 새로운 보상을 추가하는 함수
    function notifyRewardAmount(uint256 reward) external onlyOwner {
        require(reward > 0, "Vault: reward is zero");

        if (block.timestamp >= periodFinish) {
            rewardRate = reward.div(DURATION);
        } else {
            uint256 remaining = periodFinish.sub(block.timestamp);
            uint256 leftover = remaining.mul(rewardRate);
            rewardRate = reward.add(leftover).div(DURATION);
        }

        uint256 balance = token.balanceOf(address(this));
        require(
            rewardRate <= balance.div(DURATION),
            "Vault: insufficient balance"
        );

        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp.add(DURATION);
        emit RewardAdded(reward);
    }

    // 암호화폐를 예치하는 함수
    function deposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Vault: amount is zero");

        _updateReward(msg.sender);

        token.safeTransferFrom(msg.sender, address(this), amount);
        userInfo[msg.sender].amount = userInfo[msg.sender].amount.add(amount);
        totalSupply = totalSupply.add(amount);

        emit Deposited(msg.sender, amount);
    }

    // 예치한 암호화폐를 출금하는 함수
    function withdraw() public nonReentrant {
        uint256 amount = userInfo[msg.sender].amount;
        require(amount > 0, "Vault: no deposit");

        _updateReward(msg.sender);
        _withdraw(amount);

        userInfo[msg.sender].amount = 0;
        userInfo[msg.sender].rewardDebt = 0;
        totalSupply = totalSupply.sub(amount);

        emit Withdrawn(msg.sender, amount);
    }

    // 예치한 암호화폐를 출금하고 동시에 보상을 지급하는 함수
    function withdrawAndClaim() external nonReentrant {
        _updateReward(msg.sender);
        _withdraw(userInfo[msg.sender].amount);

        uint256 reward = _calculateReward(msg.sender);
        if (reward > 0) {
            _payReward(reward);
        }

        userInfo[msg.sender].amount = 0;
        userInfo[msg.sender].rewardDebt = 0;
        totalSupply = totalSupply.sub(userInfo[msg.sender].amount);

        emit Withdrawn(msg.sender, userInfo[msg.sender].amount);
        emit RewardPaid(msg.sender, reward);
    }

    // 사용자의 미지급 보상액을 계산하는 함수
    function _calculateReward(address user) private view returns (uint256) {
        uint256 reward = userInfo[user]
            .amount
            .mul(rewardPerToken().sub(userInfo[user].rewardDebt))
            .div(1e18);
        return reward;
    }

    // 보상을 지급하는 함수
    function _payReward(uint256 reward) private {
        uint256 balance = token.balanceOf(address(this));
        require(reward <= balance, "Vault: insufficient balance");

        token.safeTransfer(msg.sender, reward);
        lockedAmount = lockedAmount.sub(reward);
        emit RewardPaid(msg.sender, reward);
    }

    // 예치한 암호화폐를 출금하는 내부 함수
    function _withdraw(uint256 amount) private {
        token.safeTransfer(msg.sender, amount);
    }

    // 사용자의 미지급 보상액을 업데이트하는 함수
    function _updateReward(address user) private {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();
        if (user != address(0)) {
            userInfo[user].rewardDebt = userInfo[user]
                .amount
                .mul(rewardPerTokenStored)
                .div(1e18);
        }
    }

    // 단위 암호화폐 당 미지급 보상액을 계산하는 함수
    function rewardPerToken() public view returns (uint256) {
        if (totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored.add(
                lastTimeRewardApplicable()
                    .sub(lastUpdateTime)
                    .mul(rewardRate)
                    .mul(1e18)
                    .div(totalSupply)
            );
    }

    // 마지막으로 보상이 지급된 시간을 반환하는 함수
    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }
}
