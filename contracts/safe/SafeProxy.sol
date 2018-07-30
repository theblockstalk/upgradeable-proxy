pragma solidity ^0.4.18;

import '../Proxied.sol';
import './SafeUpgradeable.sol';

contract SafeProxy is Proxied {

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

    constructor(address _target) public {
        upgradeTo(_target);
    }

    function upgradeTo(address _target) public {
        address oldTarget = target();

        assert(oldTarget != _target);
        assert(isContract(_target));
        assert(isUpgradeable(_target));

        setTarget(_target);

        emit EventUpgrade(_target, oldTarget, msg.sender);
    }

    function upgradeTo(address _target, bytes _data) public {
        upgradeTo(_target);
        assert(_target.delegatecall(_data));
    }

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

    /*
     * @notice Checks if if the supplied address points to a contract
     * @param _target - The address to be checked
     * @return true if the target is a contract
     */
    function isContract(address _target) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(_target) } // Note: the EXTCODESIZE may not work after Serenity hard fork
        return size > 0;
    }

    /*
     * @notice Checks if the supplied address is a contract that probably inherits from Upgradeable
     * @param _target - The address to be checked
     * @returns true if the target address implements the upgradeTo() function
     */
    function isUpgradeable(address _target) internal view returns (bool) {
        return _target.call(bytes4(keccak256("upgradeTo(address)")), address(this));
    }

}
