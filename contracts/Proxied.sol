pragma solidity ^0.4.18;

contract Proxied {
  address public target;

  event EventUpgrade(address indexed newTarget, address indexed oldTarget, address indexed admin);

  function upgradeTo(address _target) public;
}
