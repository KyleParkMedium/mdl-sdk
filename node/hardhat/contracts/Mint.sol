// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Mint {
    address payable private _vault;
    address payable private _middleMan;
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    event Transfer(address indexed from, address indexed to, uint256 value);

    modifier onlyMiddleMan() {
        require(msg.sender == _middleMan, "msg.sender != middleMan");
        _;
    }

    constructor(
        address payable vault_,
        address payable middleMan_,
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    ) {
        _vault = vault_;
        _middleMan = middleMan_;
        _totalSupply = totalSupply_;
        _name = name_;
        _symbol = symbol_;
    }

    receive() external payable {
        console.log("check");
    }

    fallback() external payable {
        console.log("check");
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function _transfer(uint256 amount) public payable {
        require(msg.sender != address(0), "mint to the zero address");
        require(msg.sender.balance >= amount, "Insufficient balance");

        (bool sent, bytes memory data) = _vault.call{value: msg.value}(
            abi.encodeWithSignature("deposit(address)", msg.sender)
        );
        require(sent, "Failed to send Ether");

        emit Transfer(msg.sender, _vault, amount);
    }

    function _mint(
        address payable account,
        uint256 amount
    ) public payable onlyMiddleMan {
        require(msg.sender != address(0), "mint to the zero address");
        require(msg.sender.balance >= amount, "Insufficient balance");
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply += amount;
        _balances[account] += amount;

        (bool sent, bytes memory data) = account.call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit Transfer(_middleMan, account, amount);
    }

    function getVault() public view returns (address) {
        return _vault;
    }
}
