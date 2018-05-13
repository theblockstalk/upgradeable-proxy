pragma solidity ^0.4.18;

import '../Proxied.sol';
import './SafeUpgradeable.sol';

contract SafeProxy is Proxied {

    constructor(address _target) public {
        upgradeTo(_target);
    }

    function upgradeTo(address _target) public {
        assert(target != _target);
        assert(isContract(_target));
        assert(isUpgradeable(_target));

        address oldTarget = target;
        target = _target;

        emit EventUpgrade(_target, oldTarget, msg.sender);
    }

    /*
     * @notice Performs an upgrade and then executes a transaction. Intended use to upgrade and initialize atomically
     */
    function upgradeTo(address _target, bytes _data) public {
        upgradeTo(_target);
        assert(target.delegatecall(_data));
    }

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
        assembly { size := extcodesize(_target) } // Note: the EXTCODESIZE may not work after Serenity hard fork
        return size > 0;
    }

    /*
     * @notice Checks if the supplied address is a contract that probably inherits from Upgradeable
     * @param _target - The address to be checked
     * @returns true if the target address implements the upgradeTo() function
     */
    function isUpgradeable(address _target) internal view returns (bool) {
        return SafeUpgradeable(_target).call(bytes4(keccak256("upgradeTo(address)")), address(this));
    }

}
