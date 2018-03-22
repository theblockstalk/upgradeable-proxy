pragma solidity ^0.4.18;

import '../Proxied.sol';
import './Ownable.sol';

contract OwnableProxied is Ownable, Proxied {}
