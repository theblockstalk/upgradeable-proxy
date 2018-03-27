pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract ArraySimpleV1a is Upgradeable {
    uint[3] values;
    uint anotherValue;

    function getValues() view public returns (uint[3]) {
        return values;
    }

    function setValues(uint[3] _values) public {
        values = _values;
    }
}

contract ArraySimpleV1b is Upgradeable {
    uint[] values;
    uint anotherValue;

    function getValues() view public returns (uint[]) {
        return values;
    }

    function setValues(uint[] _values) public {
        values = _values;
    }
}

contract ArraySimpleV2a is Upgradeable {
    uint[3] values;
    uint anotherValue;

    function getValues() view public returns (uint[3]) {
        return values;
    }

    function setValues(uint[3] _values) public {
        values = [1, 2, 3];
    }
}

contract ArraySimpleV2a_ExtraValue is Upgradeable {
    uint[4] values;
    uint anotherValue;

    function getValues() view public returns (uint[4]) {
        return values;
    }

    function setValues(uint[4] _values) public {
        values = _values;
    }
}

contract ArraySimpleV2b is Upgradeable {
    uint[] values;
    uint anotherValue;

    function getValues() view public returns (uint[]) {
        return values;
    }

    function setValues(uint[] _values) public {
        values = [1, 2, 3];
    }
}
