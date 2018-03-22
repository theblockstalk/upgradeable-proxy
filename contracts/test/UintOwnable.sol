pragma solidity ^0.4.18;

import "../ownable/OwnableUpgradeable.sol";

contract UintSimpleV1 is OwnableUpgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

contract UintSimpleV2 is OwnableUpgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }
}
