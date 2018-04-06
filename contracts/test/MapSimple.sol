pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract MapSimpleV1 is Upgradeable {
    mapping (uint => bool) values;

    function getValue(uint _index) view public returns (bool) {
        return values[_index];
    }

    function setValue(uint _index, bool _value) public {
        values[_index] = _value;
    }
}

contract MapSimpleV2 is Upgradeable {
    mapping (uint => bool) values;

    function getValue(uint _index) view public returns (bool) {
        return values[_index];
    }

    function setValue(uint _index, bool _value) public {
        values[_index] = false;
    }
}

contract MapSimpleV2b is Upgradeable {
    mapping (address => bool) values;

    function getValue(address _index) view public returns (bool) {
        return values[_index];
    }

    function setValue(address _index, bool _value) public {
        values[_index] = _value;
    }
}

contract MapSimpleV2c is Upgradeable {
    mapping (uint => uint) values;

    function getValue(uint _index) view public returns (uint) {
        return values[_index];
    }

    function setValue(uint _index, uint _value) public {
        values[_index] = _value;
    }
}
