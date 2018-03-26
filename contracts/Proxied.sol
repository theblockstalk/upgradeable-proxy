pragma solidity ^0.4.18;

contract Proxied {
  address public target;
  mapping (address => bool) public initialized;

  event EventUpgrade(address indexed newTarget, address indexed oldTarget, address indexed admin);
  event EventInitialized(address indexed target);

  function upgradeTo(address _target) public;
}
