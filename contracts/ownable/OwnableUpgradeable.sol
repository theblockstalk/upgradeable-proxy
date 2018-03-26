pragma solidity ^0.4.18;

import './OwnableProxied.sol';

contract OwnableUpgradeable is OwnableProxied {

    /**
     * This function, as it is here, will never be executed. The function that will execute will be
     * Proxy.upgradeTo(address)
     */
    function upgradeTo(address) public {
        assert(false);
    }

    /**
     * This abstract function needs to be implemented in child contracts if the child contrat requires
     * variable initialization on creation. This is because, the contructor of the Proxy contract will not
     * initialize any of the upgradeable child contract's variables when the target is set
     */
    function initialize() public {
        if(initializeUpgradeable(target)) {
            // initialize contract variables here
        }
    }

    function initializeUpgradeable(address target) internal returns (bool) {
        if(!initialized[target]) {
            initialized[target] = true;
            EventInitialized(target);
            return true;
        }
        else return false;
    }
}
