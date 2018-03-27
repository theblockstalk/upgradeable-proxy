pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintFallbackV1 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () public {
        value = 10;
    }
}

contract UintFallbackV2 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () public {
        value = 20;
    }
}

contract UintFallbackV3 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () public {
        revert();
    }
}


contract UintFallbackV4 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function () payable public {
        value = msg.value;
    }
}
