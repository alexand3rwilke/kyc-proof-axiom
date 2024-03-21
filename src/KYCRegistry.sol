// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract KYCRegistry {
    address public masterContract;
    mapping(address => bool) public isKYCCompleted;

    modifier onlyMaster() {
        require(msg.sender == masterContract, "Caller is not Axiom");
        _;
    }

    constructor(address _masterContract) {
        masterContract = _masterContract;
    }

    function registerAccount(address user) external onlyMaster {
        isKYCCompleted[user] = true;
    }
}
