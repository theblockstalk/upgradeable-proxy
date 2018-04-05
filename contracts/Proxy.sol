pragma solidity ^0.4.18;

import './Proxied.sol';
import './Upgradeable.sol';

/*
 * @title Proxy v0.5
 * @author Jack Tanner
 * @notice The Proxy contract forwards all calls to a target with delegate call and thus create an upgradeable
 * stateful contract
 */
contract Proxy is Proxied {
    /*
     * @notice Constructor sets the target and emmits an event with the first target
     * @param _target - The target Upgradeable contracts address
     */
    function Proxy(address _target) public {
        upgradeTo(_target);
    }

    /*
     * @notice Upgrades the contract to a different target that has a changed logic. Targets must be inherited from
     * Upgraeable to be valid targets and must also follow several rules.
     * @dev See https://github.com/jackandtheblockstalk/upgradeable-proxy for what can and cannot be done in Upgradeable
     * contracts
     * @param _target - The target Upgradeable contracts address
     */
    function upgradeTo(address _target) public {
        assert(target != _target);
        assert(isContract(_target));
        assert(isUpgradeable(_target));

        address oldTarget = target;
        target = _target;
        bytes4 initializeSignature = bytes4(keccak256("initialize()"));
        assert(target.delegatecall(initializeSignature));

        EventUpgrade(_target, oldTarget, msg.sender);
    }

    /*
     * @notice Fallback function that will execute code from the target contract to process a function call.
     * @dev Will use the delegatecall opcode to retain the current state of the Proxy contract and use the logic
     * from the target contract to process it.
     */
    function () payable public {
        bytes memory data = msg.data;
        address impl = target;

        assembly {
            let result := delegatecall(gas, impl, add(data, 0x20), mload(data), 0, 0)
            let size := returndatasize

            let ptr := mload(0x40)
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }

    /*
     * @notice Checks if if the supplied address points to a contract
     * @param _target - The address to be checked
     * @return true if the target is a contract
     */
    function isContract(address _target) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(_target) }
        return size > 0;
    }

    /*
     * @notice Checks if the supplied address is a contract the probably inherits from Upgradeable
     * @param _target - The address to be checked
     * @returns true if the target address implements the upgradeTo() function
     */
    function isUpgradeable(address _target) internal view returns (bool) {
        return Upgradeable(_target).call(bytes4(keccak256("upgradeTo(address)")), address(this));
    }
}
