pragma solidity ^0.4.18;

import './OwnableProxied.sol';

contract OwnableUpgradeable is OwnableProxied {

    /*
      * @notice Modifier to make body of function only execute if the contract has not already been initialized.
      */
     modifier initializeOnceOnly() {
         if(!initialized[target]) {
             initialized[target] = true;
             emit EventInitialized(target);
             _;
         }
     }

     /**
     * This function, as it is here, will never be executed. The function that will execute will be
     * Proxy.upgradeTo(address)
     */
    function upgradeTo(address) public {
        assert(true);
    }

     /**
      * @notice Initialize any state variables that would normally be set in the contructor.
      * @dev Initialization functionality MUST be implemented in inherited upgradeable contract if the child contract requires
      * variable initialization on creation. This is because the contructor of the child contract will not execute
      * and set any state when the Proxy contract targets it. As such initialization is coded into Proxy.upgradeTo()
      * that will execute the folllowing function only the first time that this upgradeable contract is targeted.
      * Overrided initialize() in inherited child SHOULD have ititializeOnceOnly modifier.
      * If a contract is upgraded twice, pay special attention that the state variables are not initialized again
      */
     function initialize() initializeOnceOnly public {
         // initialize contract state variables here
     }
}
