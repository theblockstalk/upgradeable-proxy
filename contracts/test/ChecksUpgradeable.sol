pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UpgradeCheck_CanUpgrade is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}

contract UpgradeCheck_CannotUpgrade {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }
}

contract UpgradeCheckV2_CanUpgrade is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }
}

contract UpgradeCheckV2b_CannotUpgrade {
    address target;
    mapping (address => bool) initialized;
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }

    function upgradeTo() public {}
}

contract UpgradeCheckV3_CanUpgrade {
    address public target;
    /*mapping (address => bool) public initialized;*/
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }

    function upgradeTo(address) public {}
    function initialize() public {}
}
