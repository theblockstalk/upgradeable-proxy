pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintEther_Normal is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue() payable public {
        value = 10;
    }
}

contract UintEther_Payable is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue() payable public {
        value = msg.value;
    }
}

contract UintEther_NotPayable is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue() public {
        value = msg.value;
    }
}
