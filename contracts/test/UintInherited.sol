pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintInheritedV1 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

contract UintInheritedV2 is UintInheritedV1 {
    function setValue(uint _value) public {
        value = 2*_value;
    }
}
