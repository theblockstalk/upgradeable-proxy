pragma solidity ^0.4.18;

import './Proxied.sol';

/*
 * @title Upgradeable v0.5
 * @author Jack Tanner
 * @notice The Upgradeable contract is the parent contract of any contracts that are to be used as an
 * upgradeable contract
 *
 * Upgradeable contracts are set as the target of the Proxy contract and, so long as they do not change
 * any state variables, can be upgraded by calling Proxy.upgradeTo(address)
 */
contract Upgradeable is Proxied {
    /*
     * @notice Modifier to make body of function only execute if the contract has not already been initialized.
     */
    modifier initializeOnceOnly() {
        if(!initialized[target]) {
            initialized[target] = true;
            emit EventInitialized(target);
            _;
        } else revert();
    }

    /**
     * @notice Will always fail if called. This is used as a placeholder for the contract ABI.
     * @dev This is code is never executed by the Proxy using delegate call
     */
    function upgradeTo(address) public {
        assert(false);
    }

    /**
     * @notice Initialize any state variables that would normally be set in the contructor.
     * @dev Initialization functionality MUST be implemented in inherited upgradeable contract if the child contract requires
     * variable initialization on creation. This is because the contructor of the child contract will not execute
     * and set any state when the Proxy contract targets it.
     * This function MUST be called stright after the Upgradeable contract is set as the target of the Proxy. This method
     * can be overwridden so that it may have arguments. Make sure that the initializeOnceOnly() modifier is used to protect
     * from being initialized more than once.
     * If a contract is upgraded twice, pay special attention that the state variables are not initialized again
     */
    function initialize() initializeOnceOnly public {
        // initialize contract state variables here
    }
}
