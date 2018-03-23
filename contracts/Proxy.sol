pragma solidity ^0.4.18;

import './Proxied.sol';
/*import './Upgradeable.sol';*/

/*interface Initializeable {
    function initialize() internal;
}*/


contract Proxy is Proxied {
/*contract Proxy is Proxied, Initializeable {*/
    function Proxy(address _target) public {
        upgradeTo(_target);
        this.call(keccak256("initialize()"));
        /*Initializeable(this).initialize();*/
        /*initialize();*/
    }

    function upgradeTo(address _target) public {
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
