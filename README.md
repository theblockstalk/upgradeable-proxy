# Upgradeable Proxy

This repository tests the proxy upgradeability mechanism. It is a simplified version of the system being used by the
[AragonOS](https://github.com/aragon/aragonOS) and [ZepplinOS](https://github.com/zeppelinos/core) system. The core upgradeability mechanism has been copied and a few features have been removed.

## Getting started

To get up to speed on upgradeable smart contract strategies, please read [Summary of Ethereum Upgradeable Smart Contract R&D](https://blog.indorse.io/ethereum-upgradeable-smart-contract-strategies-456350d0557c).

As noted in the article, **implementing an upgradeable smart contract requires a well thought out governance strategy**. This github repo will **not** explor this aspect of upgradeable contracts.


## Running the tests

```
git clone https://github.com/jackandtheblockstalk/upgradeable-proxy
cd upgradeable-proxy
truffle test
```

## A guide to how to create an upgradeable smart contract on ethereum

### The upgrade mechanism

The three main contracts that are used in the upgradeable proxy mechanism are:
1. [Proxied.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Proxied.sol)
2. [Proxy.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Proxy.sol)
3. [Upgradeable.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Upgradeable.sol)

TODO: write descriptions of contracts above into code...

Please see in-code contract and function descriptions for how these contract allow you to make an upgradeable smart contract.

### How to make a simple Uint getter/setter smart contract upgradeable

To see the simplest way of iplementing an upgradeable smart contract, check out UintSimple.sol and it's test suite.

There are several ways to structure a smart contract that will be upgradeable. The following three sections explain these different structures and their pros and cons. In each of the structures, it was found that the gas cost increase was the same (~3% or 1100 gas).

#### One smart contract containing all desired storage and logic
See tests for UintSimple.sol

#### A modular smart contract
See tests for UintSimpleModular.sol

#### An inherited smart contract
See tests for UintInherited.sol

### What can and can't you do when upgradeing a contract with the Proxy

#### You can

* Change function logic of pre-existing functions so long as the signature does not change. See UintSimple.sol.
* Add new functions to the upgraded contract. See UintAdvancedV2a_NewFunction.sol.
⋅⋅⋅**Note:** applications or other smart contracts will need to know about the upgrade to be able to call the new function.
* Add new events to the upgraded contract. See UintAdvancedV2c_NewEvent.
⋅⋅⋅**Note:** applications or other smart contracts will need to know about the upgrade to be able to watch for the new event.

#### You can't

So far as I can tell, you cannot do the following. If you know how to do this please send [me](https://twitter.com/theblockstalk) or the team at [Indorse](https://twitter.com/joinindorse) a message, or submit an issue or PR to this repo.

* Add in new storage variables to the upgraded smart contrat. See UintAdvancedV2b_NewStorage.sol

#### Still to research

TODO
* Change the order of functions
* Overide two functions
* Add overwridden functions with different argument
* Change the visibility of functions (external/public/internal/private)
* Change keywords on functios (pure/view)
* Change the order of variables
* Test upgradeability of data structures: strings, mappings, structs, arrays
* Test different behaviours of function calls vs txs (executeable) for different actions. See if there is a difference.
