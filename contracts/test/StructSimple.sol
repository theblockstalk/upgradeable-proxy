pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract StructSimpleV1 is Upgradeable {
    struct MyStruct {
        uint sUint;
        bool sBool;
    }
    MyStruct structValue1;
    MyStruct structValue2;

    function getValue() view public returns (uint returnUint, bool returnBool) {
        returnUint = structValue1.sUint;
        returnBool = structValue1.sBool;
    }

    function setValue(uint _sUint, bool _sBool) public {
        structValue1.sUint = _sUint;
        structValue1.sBool = _sBool;
    }
}

contract StructSimpleV2 is Upgradeable {
    struct MyStruct {
        uint sUint;
        bool sBool;
    }
    MyStruct structValue1;
    MyStruct structValue2;

    function getValue() view public returns (uint returnUint, bool returnBool) {
        returnUint = structValue1.sUint;
        returnBool = structValue1.sBool;
    }

    function setValue(uint _sUint, bool _sBool) public {
        structValue1.sUint = 1;
        structValue1.sBool = false;
    }
}

contract StructSimpleV2b is Upgradeable {
    struct MyStruct {
        uint sUint;
        bool sBool;
        uint sUint2;
    }
    MyStruct structValue1;
    MyStruct structValue2;

    function getValue() view public returns (uint returnUint, bool returnBool, uint returnUint2) {
        returnUint = structValue1.sUint;
        returnBool = structValue1.sBool;
        returnUint2 = structValue1.sUint2;
    }

    function getValue2() view public returns (uint returnUint, bool returnBool, uint returnUint2) {
        returnUint = structValue2.sUint;
        returnBool = structValue2.sBool;
        returnUint2 = structValue2.sUint2;
    }

    function setValue(uint _sUint, bool _sBool) public {
        structValue1.sUint = 1;
        structValue1.sBool = false;
        structValue1.sUint2 = 2;
    }
}

contract StructSimpleV2c is Upgradeable {
    struct MyStruct {
        bool sBool;
        uint sUint;
    }
    MyStruct structValue1;
    MyStruct structValue2;

    function getValue() view public returns (uint returnUint, bool returnBool) {
        returnUint = structValue1.sUint;
        returnBool = structValue1.sBool;
    }

    function setValue(uint _sUint, bool _sBool) public {
        structValue1.sUint = 1;
        structValue1.sBool = false;
    }
}
