pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract BoolSimpleV1 is Upgradeable {
    bool value;

    function getValue() view public returns (bool) {
        return value;
    }

    function setValue(bool _value) public {
        value = _value;
    }
}

contract BoolSimpleV2 is Upgradeable {
    bool value;

    function getValue() view public returns (bool) {
        return value;
    }

    function setValue(bool _value) public {
        value = false;
    }
}
