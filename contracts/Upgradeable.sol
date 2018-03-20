pragma solidity ^0.4.18;

import './Proxied.sol';

contract Upgradeable is Proxied {

  function upgradeTo(address _target) public {
    assert(false);
  }
}
