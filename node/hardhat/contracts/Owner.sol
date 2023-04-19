// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Owner {
    /*
     *  Events
     */
    event Deposit(address indexed sender, uint value);
    event OwnerAddition(address indexed owner, bool);
    event OwnerRemoval(address indexed owner);

    /*
     *  Storage
     */
    mapping(address => bool) public isOwner;
    address public admin;
    address[] public owners;

    /*
     *  Constructor
     */
    constructor() {
        admin = msg.sender;
    }

    /*
     *  Modifiers
     */
    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    modifier onlyWallet() {
        require(msg.sender == address(this), "msg.sender != contract");
        _;
    }

    modifier ownerDoesNotExist(address owner) {
        require(!isOwner[owner], "owner already exists");
        _;
    }

    modifier ownerExists(address owner) {
        require(isOwner[owner]);
        _;
    }

    modifier notNull(address _address) {
        require(_address != address(0));
        _;
    }

    /// @dev Allows to add a new owner. Transaction has to be sent by wallet.
    /// @param owner Address of new owner.
    function addOwner(
        address owner
    ) public isAdmin notNull(owner) returns (bool) {
        // ownerDoesNotExist(owner)
        if (isOwner[owner]) {
            emit OwnerAddition(owner, false);
            return false;
        }
        isOwner[owner] = true;
        owners.push(owner);
        emit OwnerAddition(owner, true);
        return true;
    }

    /// @dev Allows to remove an owner. Transaction has to be sent by wallet.
    /// @param owner Address of owner.
    function removeOwner(address owner) public isAdmin ownerExists(owner) {
        isOwner[owner] = false;
        for (uint i = 0; i < owners.length; i++)
            if (owners[i] == owner) {
                delete owners[i];
                break;
            }
        emit OwnerRemoval(owner);
    }

    /// @dev Allows to replace an owner with a new owner. Transaction has to be sent by wallet.
    /// @param owner Address of owner to be replaced.
    /// @param newOwner Address of new owner.
    function replaceOwner(
        address owner,
        address newOwner
    ) public isAdmin ownerExists(owner) ownerDoesNotExist(newOwner) {
        for (uint i = 0; i < owners.length; i++)
            if (owners[i] == owner) {
                owners[i] = newOwner;
                break;
            }
        isOwner[owner] = false;
        isOwner[newOwner] = true;
        emit OwnerRemoval(owner);
        emit OwnerAddition(newOwner, true);
    }
}
