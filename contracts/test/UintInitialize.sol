pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintInitializeV1a_NotInitialized is Upgradeable {
    uint value = 111;

    function getValue() view public returns (uint) {
        return value;
    }
}

contract UintInitializeV1b_Initialized is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() initializeOnceOnly public {
        value = 111;
    }
}

contract UintInitializeV2 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() initializeOnceOnly public {
        value = 222;
    }
}

contract UintInitializeV3 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() initializeOnceOnly public {
        revert(); // Should overloade this inherited function to prevent accidental execution which would then block initialize(uint) from executing
    }

    function initialize(uint _value) initializeOnceOnly public {
        value = _value;
    }
}
