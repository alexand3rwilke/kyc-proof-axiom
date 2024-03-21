// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract kycProof is ERC721 {
    address public minter;
    
    constructor(address minter) ERC721("KYCProof", "KYP") {
        minter = msg.sender; 
    }

    modifier onlyMinter() {
        require(msg.sender == minter, "Caller is not the minter");
        _;
    }

    function mint(address to, uint256 tokenId) public onlyMinter {
        _mint(to, tokenId);
    }

    function setMinter(address newMinter) public onlyMinter {
        minter = newMinter;
    }
}