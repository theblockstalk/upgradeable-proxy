pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintInitializeV1a_NotInitialized is Upgradeable {
    uint value = 111;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() internal {}
}

contract UintInitializeV1b_Initialized is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() internal {
        value = 111;
    }

    function initializePublic() public {
        initialize();
    }
}

contract UintInitializeV2 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() internal {
        value = 222;
    }
}
