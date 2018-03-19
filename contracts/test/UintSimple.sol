pragma solidity ^0.4.18;

import "../../contracts/Upgradeable.sol";

contract UintSimple_Interface is Upgradeable {
    function getValue() view public returns (uint);
    function setValue(uint _value) public;
}

contract UintSimple_V1 is UintSimple_Interface {
    uint value;

    function getValue() view public returns (uint) { return value; }
    function setValue(uint _value) public {
        value = _value;
    }
}

contract UintSimple_V2 is UintSimple_V1 {
    function setValue(uint _value) public {
        value = 2*_value;
    }
}
