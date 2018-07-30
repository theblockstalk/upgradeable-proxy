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

    bytes32 private constant TARGET_SLOT = 0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3;

    function target() public view returns (address targ) {
        bytes32 slot = TARGET_SLOT;
        assembly {
          targ := sload(slot)
        }
    }

    function setTarget(address _target) private {
        bytes32 slot = TARGET_SLOT;
        assembly {
          sstore(slot, _target)
        }
    }

    /*
     * @notice Constructor sets the target and emmits an event with the first target
     * @param _target - The target Upgradeable contracts address
     */
    constructor(address _target) public {
        assert(TARGET_SLOT == keccak256("org.zeppelinos.proxy.implementation"));
        upgradeTo(_target);
    }

    /*
     * @notice Upgrades the contract to a different target that has a changed logic.
     * @dev See https://github.com/jackandtheblockstalk/upgradeable-proxy for what can and cannot be done in Upgradeable
     * contracts
     * @param _target - The target Upgradeable contracts address
     */
    function upgradeTo(address _target) public {
        address oldTarget = target();
        assert(oldTarget != _target);

        setTarget(_target);

        emit EventUpgrade(_target, oldTarget, msg.sender);
    }

    /*
     * @notice Performs an upgrade and then executes a transaction. Intended use to upgrade and initialize atomically
     */
    function upgradeToAndCall(address _target, bytes _data) public {
        upgradeTo(_target);
        assert(_target.delegatecall(_data));
    }

    /*
     * @notice Fallback function that will execute code from the target contract to process a function call.
     * @dev Will use the delegatecall opcode to retain the current state of the Proxy contract and use the logic
     * from the target contract to process it.
     */
    function () payable public {
        address targetAddress = target();

        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize)

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(gas, targetAddress, 0, calldatasize, 0, 0)

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize)

            switch result
            // delegatecall returns 0 on error.
            case 0 { revert(0, returndatasize) }
            default { return(0, returndatasize) }
        }
    }
}
