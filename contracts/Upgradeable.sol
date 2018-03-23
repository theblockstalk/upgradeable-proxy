pragma solidity ^0.4.18;

import './Proxied.sol';

/*
 * @dev The Upgradeable contract is made the parent contract of any contract are to have upgradeable logic.
 *
 * Upgradeable contracts are set as the target of the Proxy contract and, so long as they do not change
 * any state variables, can be upgraded by calling Proxy.upgradeTo(address)
 */
contract Upgradeable is Proxied {
    
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
        assert(!initialized);
        initialized = true;
    }
}

/*contract Upgradeable2 is Proxied {

    function upgradeTo(address) public {
        assert(false);
    }

    function initialize() public;
}*/
