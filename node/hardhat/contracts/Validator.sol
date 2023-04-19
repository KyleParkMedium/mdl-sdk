// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract Validator {
    function recoverAddress(
        bytes32 message,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        return ecrecover(message, v, r, s);
    }
}
