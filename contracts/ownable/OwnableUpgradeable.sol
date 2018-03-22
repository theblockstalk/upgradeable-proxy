pragma solidity ^0.4.18;

import './OwnableProxied.sol';

contract OwnableUpgradeable is OwnableProxied {

  function upgradeTo(address) public {
    assert(false);
  }
}
