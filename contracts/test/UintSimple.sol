pragma solidity ^0.4.18;

import "../../contracts/Upgradeable.sol";

contract UintSimpleV1_Events {

}

contract UintSimpleV1_Storage is Upgradeable, UintSimpleV1_Events {
    uint value;
}

contract UintSimpleV1_Interface is UintSimpleV1_Events {
    function getValue() view public returns (uint);
    function setValue(uint _value) public;
}

contract UintSimpleV1_Logic is UintSimpleV1_Storage {
  function getValue() view public returns (uint) {
      return value;
  }

  function setValue(uint _value) public {
      value = _value;
  }
}

contract UintSimpleV2_Logic is UintSimpleV1_Storage {
  function getValue() view public returns (uint) {
      return value;
  }

  function setValue(uint _value) public {
      value = 2*_value;
  }
}
