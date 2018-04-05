pragma solidity ^0.4.18;

import './Proxied.sol';

/*
 * @dev The Upgradeable contract is made the parent contract of any contract are to have upgradeable logic.
 *
 * Upgradeable contracts are set as the target of the Proxy contract and, so long as they do not change
 * any state variables, can be upgraded by calling Proxy.upgradeTo(address)
 */
contract Upgradeable is Proxied {

    /*
     * @notice Sets the target variable to be the address of the contract.
     *
     * @dev This is checked during Proxy.upgradeTo() to check that the contract that inherits from
     * Upgradeable is meant to be an upgradeable conract.
     * Do not remove or change this functionality without adequate changese to Proxy.isUpgradeable()
     */
    function Upgradeable() public {
        target = address(this);
    }

    /**
     * @notice Will always succeed if called.
     *
     * @dev It is called during Proxy.upgradeTo() to check that the contract that inherits from
     * Upgradeable is meant to be an upgradeable contract.
     * Do not remove or change this function without adequate changes to Proxy.isUpgradeable()
     */
    function upgradeTo(address) public {
        assert(true); // this is used by isUpgradeable() in Proxy
    }

    modifier initializeOnceOnly() {
        if(!initialized[target]) {
            initialized[target] = true;
            EventInitialized(target);
            _;
        }
    }

    /**
     * @notice Initialize any state variables that would normally be set in the contructor.
     *
     * @dev Initialization functionality MUST be implemented in inherited upgradeable contract if the child contract requires
     * variable initialization on creation. This is because the contructor of the child contract will not execute
     * and set any state when the Proxy contract targets it. As such initialization is coded into Proxy.upgradeTo()
     * that will execute the folllowing function only the first time that this upgradeable contract is targeted.
     */
    function initialize() initializeOnceOnly public
        // initialize contract state variables here
    }

    /*
     * @notice Returns true and emits event if the contract has not been initialized before, else fails.
     * @param _target - the address of the contract that will initialize the state
     */
    /*function initializeUpgradeable(address _target) internal returns (bool) {
        if(!initialized[_target]) {
            initialized[_target] = true;
            EventInitialized(_target);
            return true;
        }
        else return false;
    }*/
}
