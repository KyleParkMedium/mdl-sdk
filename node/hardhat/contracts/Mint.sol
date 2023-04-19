// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Mint {
    address payable private _vault;
    address private middleMan;
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    event Transfer(address indexed from, address indexed to, uint256 value);

    modifier onlyMiddleMan() {
        require(msg.sender == middleMan, "msg.sender != middleMan");
        _;
    }

    constructor(
        address payable vault,
        address _middleMan,
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_
    ) {
        _vault = vault;
        middleMan = _middleMan;
        _totalSupply = totalSupply_;
        _name = name_;
        _symbol = symbol_;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function _transfer(uint256 amount) public payable {
        require(msg.sender != address(0), "mint to the zero address");
        require(_balances[msg.sender] >= amount, "Insufficient balance");

        _totalSupply -= amount;
        _balances[msg.sender] -= amount;

        _vault.transfer(amount);
        emit Transfer(msg.sender, _vault, amount);
    }

    function _mint(
        address payable account,
        uint256 amount
    ) public payable onlyMiddleMan {
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply += amount;
        _balances[account] += amount;

        account.transfer(amount);
        emit Transfer(middleMan, account, amount);
    }

    function setUser1() public {
        _balances[msg.sender] += 10000;
        _totalSupply += 10000;
    }

    function getVault() public view returns (address) {
        return _vault;
    }
}
