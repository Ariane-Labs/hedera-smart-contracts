// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import "./Modifiers.sol";

contract DerivedContract is Modifiers {

    constructor(uint256 _baseValue) Modifiers(_baseValue) {
        
    }    
    
    function show() public override pure returns(string memory) {
        return "This is the derived contract";
    }
}