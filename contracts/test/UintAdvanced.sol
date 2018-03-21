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

contract UintAdvancedV2a_NewFunction is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function setDoubleValue(uint _value) public {
        value = 2*_value;
    }
}

contract UintAdvancedV2b_NewStorage is Upgradeable {
    uint value;
    uint value2 = 100;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value + value2;
    }
}

contract UintAdvancedV2c_NewEvent is Upgradeable {
    uint value;
    event EventSetValue(uint newValue, uint oldValue);

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        EventSetValue(_value, value);
        value = _value;
    }
}

contract UintAdvancedV2d_ReverseFunctionOrder is Upgradeable {
    uint value;

    function setValue(uint _value) public {
        value = _value;
    }

    function getValue() view public returns (uint) {
        return value;
    }
}

contract UintAdvancedV2e_NewStorage is Upgradeable {
    uint value;
    uint value2 = 100;

    function getValue() view public returns (uint) {
        return value + value2;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

contract UintAdvancedV2f_NewStorage is Upgradeable {
    uint value;
    uint value2 = 100;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

contract UintAdvancedV2g_OverrideFunctionGetter is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value+2;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}


contract UintAdvancedV2h_OverrideFunctionSetter is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value+2;
    }
}

contract UintAdvancedV2i_NewFunction is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setDoubleValue(uint _value) public {
        value = 2*_value;
    }
    
    function setValue(uint _value) public {
        value = _value;
    }
}
