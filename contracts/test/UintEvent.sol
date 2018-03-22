pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintEventV1 is Upgradeable {
    uint value;
    event EventValueChanged(uint newValue);

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        EventValueChanged(_value);
        value = _value;
    }
}

contract UintEventV2a_RemovedEvent is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
