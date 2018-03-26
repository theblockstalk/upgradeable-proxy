pragma solidity ^0.4.18;

import "../Upgradeable.sol";

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
    uint value2;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value + value2;
    }

    function initialize() public {
        if(initializeUpgradeable(target)) {
            value2 = 100;
        }
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
    uint value2;

    function getValue() view public returns (uint) {
        return value + value2;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function initialize() public {
        if(initializeUpgradeable(target)) {
            value2 = 100;
        }
    }
}

contract UintAdvancedV2f_NewStorage is Upgradeable {
    uint value;
    uint value2;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function initialize() public {
        if(initializeUpgradeable(target)) {
            value2 = 100;
        }
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

contract UintAdvancedV2j_ChangeVisibility is Upgradeable {
    uint value;

    function getValue() view external returns (uint) {
        return value;
    }

    function setValue(uint _value) external {
        value = _value;
    }
}

contract UintAdvancedV2k_ChangeVisibility is Upgradeable {
    uint value;

    function getValue() view internal returns (uint) {
        return value;
    }

    function setValue(uint _value) internal {
        value = _value;
    }
}

/*contract UintAdvancedV2i_ChangeKeyword is Upgradeable {*/
contract UintAdvancedV2l_ChangeKeyword is Upgradeable {
    uint value;

    function getValue() pure public returns (uint) {
        return 666;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2j_NewStorage is Upgradeable {*/
contract UintAdvancedV2m_NewStorage is Upgradeable {
    uint value;
    uint value2;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function initialize() public {
        if(initializeUpgradeable(target)) {
            value2 = 100;
        }
    }

    function getValue2() public returns (uint) {
        return value2;
    }

    function setValue2(uint _value2) public {
        value2 = _value2;
    }
}

/*contract UintAdvancedV2k_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2n_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (address) {
        return 0xffBf5CE297a5456A2f8FEc4f5961dD0D898b29a7;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

// __________________________________
/*contract UintAdvancedV2l_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2o_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (string) {
        return 'I am a happy string';
    }

    function setValue(uint _value) public {
        value = _value;
    }
}


/*contract UintAdvancedV2m_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2p_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (bool) {
        return true;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2n_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2q_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (bytes32) {
        return 0x30ed9383ab64b27cb4b70035e743294fe1a1c83eaf57eca05033b523d1fa4261;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2o_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2r_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (int) {
        return -3;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2p_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2s_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (uint8) {
        return uint8(-1);
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2q_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2t_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (uint , string) {
        return (value, 'I am a happy string');
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2r_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2u_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (uint[]) {
        uint[] memory x = new uint[](2);
        x[0] = value;
        x[1] = 2*value;
        return x;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2s_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2v_ChangeReturn is Upgradeable {
    uint value;

    function getValue() view public returns (uint[2]) {
        uint[2] memory x;
        x[0] = value;
        x[1] = 2*value;
        return x;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

/*contract UintAdvancedV2t_ChangeReturn is Upgradeable {*/
contract UintAdvancedV2w_ChangeReturn is Upgradeable {
    uint value;

    struct MyStruct {
        uint uintValue;
        string stringValue;
    }

    function getValue() view public returns (MyStruct) {
        MyStruct memory myStruct;
        myStruct.uintValue = value;
        myStruct.stringValue = 'I am a happy string';
        return myStruct;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
