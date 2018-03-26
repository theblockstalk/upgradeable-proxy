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
    /*event EventInitialized();*/
    function initialize() public {
        /*assert(!initialized);
        initialized = true;*/
        assert(!initialized[target]);
        initialized[target] = true;
        value = 111;
        /*EventInitialized();*/
    }
}

contract UintInitializeV2 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() public {
        /*assert(!initialized);
        initialized = true;*/
        assert(!initialized[target]);
        initialized[target] = true;
        value = 222;
    }
}
