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
    }

    function upgradeTo(address _target) public {
        /*if (!initialized[_target]) {*/
            bytes4 initializeSig = bytes4(keccak256("initialize()"));
            /*delegatedFwd2(initializeSig);*/
            assert(target.delegatecall(initializeSig));
            /*address(this).call(bytes4(keccak256("initialize()")));*/
            /*assert(address(this).call(bytes4(keccak256("initialize()"))));*/
            /*Initializeable(this).initialize();*/
            /*initialize();*/
            /*initialized[_target] = true;*/
        /*}*/
        /*require(isContract(_target));*/
        EventUpgrade(_target, target, msg.sender);
        target = _target;
        /*this.call(keccak256("initialize()"));*/
        /*assert(this.call(bytes4(keccak256("initialize()"))));*/

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
