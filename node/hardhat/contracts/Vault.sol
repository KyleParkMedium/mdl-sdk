// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vault {
    address admin;
    address[] private signers;
    mapping(address => uint256) private balances;
    uint256 private timeLockPeriod;
    uint256 private lastUpdateTime;

    constructor(address _admin, uint256 _timeLockPeriod) {
        admin = _admin;
        timeLockPeriod = _timeLockPeriod;
    }

    modifier onlyContract() {
        require(msg.sender == address(this), "msg.sender != contract");
        _;
    }

    event lock(address indexed account, uint256 value, uint256 balances);
    event unlock(address indexed account, uint256 value, uint256 balances);

    function setExample(uint256 amount) public returns (bool) {
        balances[msg.sender] += amount;
        return true;
    }

    function deposit(address account) public payable {
        balances[account] += msg.value;
        emit lock(account, msg.value, balances[account]);
    }

    // 중개자만 호출 가능 또는 특정 컨트랙트만 호출 가능
    function withdraw(address to, uint256 amount) public {
        // msg.sender에 대한 조건 혹은 로직 구현 필
        require(address(this).balance >= amount, "Insufficient balance");
        require(
            block.timestamp > lastUpdateTime + timeLockPeriod,
            "Time lock period has not elapsed"
        );
        return this._withdraw(to, amount);
    }

    function _withdraw(address to, uint256 amount) public onlyContract {
        lastUpdateTime = block.timestamp;
        payable(to).transfer(amount);
        emit unlock(to, amount, balances[to]);
    }

    function contractBalanceOf() public view returns (uint256) {
        return address(this).balance;
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function getAdmin() public view returns (address) {
        return admin;
    }
}
