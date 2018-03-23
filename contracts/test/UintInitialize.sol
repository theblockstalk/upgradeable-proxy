pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintInitializeV1a_NotInitialized is Upgradeable {
    uint value = 111;

    function getValue() view public returns (uint) {
        return value;
    }

    function initialize() internal {}
}

contract UintInitializeV1b_Initialized is Upgradeable2 {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }
    event EventInitialized();
    function initialize() public {
        value = 111;
        EventInitialized();
    }

    /*function initializePublic() public {
        initialize();
    }*/
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
