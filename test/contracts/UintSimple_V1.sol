pragma solidity ^0.4.18;

import "../../contracts/Upgradeable.sol";

contract UintSimple_V1 is Upgradeable {
    uint public value;

    function setValue(uint _value) public {
        value = _value;
    }
}
