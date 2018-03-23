pragma solidity ^0.4.18;

import "../Upgradeable.sol";

contract UintSimpleModularV1_Events {

}

contract UintSimpleModularV1_Storage is Upgradeable, UintSimpleModularV1_Events {
    uint value;
}

contract UintSimpleModularV1_Interface is UintSimpleModularV1_Events {
    function getValue() view public returns (uint);
    function setValue(uint _value) public;
}

contract UintSimpleModularV1_Logic is UintSimpleModularV1_Storage {
  function getValue() view public returns (uint) {
      return value;
  }

  function setValue(uint _value) public {
      value = _value;
  }
}

contract UintSimpleModularV2_Logic is UintSimpleModularV1_Storage {
  function getValue() view public returns (uint) {
      return value;
  }

  function setValue(uint _value) public {
      value = 2*_value;
  }
}
