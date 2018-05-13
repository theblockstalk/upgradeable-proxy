pragma solidity ^0.4.18;

/*
 * @title Proxied v0.5
 * @author Jack Tanner
 * @notice The Proxied contract acts as the parent contract to Proxy and Upgradeable with and creates space for
 * state variables, functions and events that will be used in the upgraeable system.
 *
 * @dev Both the Proxy and Upgradeable need to hae the target and initialized state variables stored in the exact
 * same storage location, which is why they must both inherit from Proxied. Defining them in the saparate contracts
 * does not work.
 *
 * @param target - This stores the current address of the target Upgradeable contract, which can be modified by
 * calling upgradeTo()
 *
 * @param initialized - This mapping records which targets have been initialized with the Upgradeable.initialize()
 * function. Target Upgradeable contracts can only be intitialed once.
 */
contract Proxied {
  address public target;
  mapping (address => bool) public initialized;

  event EventUpgrade(address indexed newTarget, address indexed oldTarget, address indexed admin);
  event EventInitialized(address indexed target);

  function upgradeTo(address _target) public;
}
