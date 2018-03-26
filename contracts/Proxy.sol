pragma solidity ^0.4.18;

import './Proxied.sol';

contract Proxy is Proxied {
    function Proxy(address _target) public {
        upgradeTo(_target);
    }

    function upgradeTo(address _target) public {
        address oldTarget = target;
        target = _target;
        bytes4 initializeSig = bytes4(keccak256("initialize()"));
        assert(target.delegatecall(initializeSig));

        EventUpgrade(_target, oldTarget, msg.sender);

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
