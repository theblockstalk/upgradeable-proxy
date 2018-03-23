pragma solidity ^0.4.18;

contract Proxied {
  address public target;

  event EventUpgrade(address newTarget, address oldTarget, address admin);

  function upgradeTo(address _target) public;
}
