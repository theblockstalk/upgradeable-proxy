pragma solidity ^0.4.18;

import '../Upgradeable.sol';

contract SafeUpgradeable is Upgradeable {
    /**
     * @notice Will always succeed if called.
     * @dev It is called during Proxy.upgradeTo() to check that the contract that inherits from
     * Upgradeable is meant to be an upgradeable contract.
     *
     * Do not remove or change this function , or override in inherited child contract, without
     * adequate changes to Proxy.isUpgradeable()
     */
    function upgradeTo(address) public {
        assert(true); // this is used by isUpgradeable() in Proxy
    }
}
