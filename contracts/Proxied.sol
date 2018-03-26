pragma solidity ^0.4.18;

contract Proxied {
  address public target;
  /*bool public initialized;*/
  mapping (address => bool) public initialized;

  event EventUpgrade(address indexed newTarget, address indexed oldTarget, address indexed admin);

  function upgradeTo(address _target) public;
}
