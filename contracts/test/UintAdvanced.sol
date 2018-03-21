pragma solidity ^0.4.18;

import "../../contracts/Upgradeable.sol";

contract UintAdvancedV1 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

contract UintAdvancedV2a_NewFunction is UintAdvancedV1 {

    function setDoubleValue(uint _value) public {
        value = 2*_value;
    }
}

contract UintAdvancedV2b_NewStorage is UintAdvancedV1 {
    uint value2 = 100;

    function setValue(uint _value) public {
        value = _value + value2;
    }
}

contract UintAdvancedV2c_NewEvent is UintAdvancedV1 {
    event EventSetValue(uint newValue, uint oldValue);

    function setValue(uint _value) public {
        EventSetValue(_value, value);
        value = _value;
    }
}

contract UintAdvancedV2d_ReverseFunctionOrder is UintAdvancedV1 {
    function setValue(uint _value) public {
        value = _value;
    }

    function getValue() view public returns (uint) {
        return value;
    }


}

contract UintAdvancedV2e_NewStorage is UintAdvancedV1 {
    uint value2 = 100;

    function getValue() view public returns (uint) {
        return value + value2;
    }
}

contract UintAdvancedV2f_NewStorage is UintAdvancedV1 {
    uint value2 = 100;
}
