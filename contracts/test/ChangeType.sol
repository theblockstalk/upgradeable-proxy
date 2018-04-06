pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract ChangeType_Uint is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

contract ChangeType_Uint8 is Upgradeable {
    uint8 value;

    function getValue() view public returns (uint8) {
        return value;
    }

    function setValue(uint8 _value) public {
        value = _value;
    }
}

contract ChangeType_Bool is Upgradeable {
    bool value;

    function getValue() view public returns (bool) {
        return value;
    }

    function setValue(bool _value) public {
        value = _value;
    }
}

contract ChangeType_String is Upgradeable {
    string value;

    function getValue() view public returns (string) {
        return value;
    }

    function setValue(string _value) public {
        value = _value;
    }
}

contract ChangeType_Bytes32 is Upgradeable {
    bytes32 value;

    function getValue() view public returns (bytes32) {
        return value;
    }

    function setValue(bytes32 _value) public {
        value = _value;
    }
}
