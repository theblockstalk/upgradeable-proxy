pragma solidity ^0.4.18;

import './OwnableProxied.sol';

contract OwnableProxy is OwnableProxied {
    function OwnableProxy(address _target) public {
        upgradeTo(_target);
    }

    // onlyOwner moifier has been applied to function
    function upgradeTo(address _target) public onlyOwner {
        EventUpgrade(_target, target, msg.sender);
        target = _target;
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
}
