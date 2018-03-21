# Upgradeable Proxy

This repository tests the proxy upgradeability mechanism. It is a simplified version of the system being used by the
[AragonOS](https://github.com/aragon/aragonOS) and [ZepplinOS](https://github.com/zeppelinos/core) system. The core upgradeability mechanism has been copied and a few features have been removed.

## 1. Getting started

To get up to speed on upgradeable smart contract strategies, please read [Summary of Ethereum Upgradeable Smart Contract R&D](https://blog.indorse.io/ethereum-upgradeable-smart-contract-strategies-456350d0557c).

As noted in the article, **implementing an upgradeable smart contract requires a well thought out governance strategy**. This github repo will **not** explor this aspect of upgradeable contracts.


## 2. Running the tests

```
git clone https://github.com/jackandtheblockstalk/upgradeable-proxy
cd upgradeable-proxy
truffle test
```

## 3. A guide to how to create an upgradeable smart contract on ethereum

### 3.1 The upgrade mechanism

The three main contracts that are used in the upgradeable proxy mechanism are:
1. [Proxied.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Proxied.sol)
2. [Proxy.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Proxy.sol)
3. [Upgradeable.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Upgradeable.sol)

TODO: write descriptions of contracts above into code...

Please see in-code contract and function descriptions for how these contract allow you to make an upgradeable smart contract.

### 3.2 How to make a simple Uint getter/setter smart contract upgradeable

To see the simplest way of iplementing an upgradeable smart contract, check out UintSimple.sol and it's test suite.

There are several ways to structure a smart contract that will be upgradeable. The following three sections explain these different structures and their pros and cons. In each of the structures, it was found that the gas cost increase was the same (~3% or 1100 gas).

#### 3.2.1 One smart contract containing all desired storage and logic
See tests for contracts _UintSimple_

#### 3.2.2 A modular smart contract
See tests for contracts _UintSimpleModular_

#### 3.2.3 An inherited smart contract
See tests for contracts _UintInherited_

### 3.3 What can and can't you do when upgradeing a contract with the Proxy

#### 3.3.1 You can

* Change function logic of pre-existing functions so long as the signature does not change. See contracts _UintSimple_, _UintAdvancedV2g_OverrideFunctionGetter_ and _UintAdvancedV2h_OverrideFunctionSetter_
* Add new functions to the upgraded contract. See contract _UintAdvancedV2a_NewFunction_
**Note:** the new function can be added in out of order. See contract _UintAdvancedV2i_NewFunction_
⋅⋅⋅**Note:** applications or other smart contracts will need to know about the upgrade to be able to call the new function.
* Add new events to the upgraded contract. See contract _UintAdvancedV2c_NewEvent_

⋅⋅⋅**Note:** applications or other smart contracts will need to know about the upgrade to be able to watch for the new event.
* Change the order of transactions in a function. See contract _UintAdvancedV2d_ReverseFunctionOrder_
* Change visibility for upgraded functions.

**Note:** Only the following changes were tested
⋅⋅⋅ public --> external. Functions were still callable externally. See contract _UintAdvancedV2j_ChangeVisibility_
⋅⋅⋅ public --> internal. Function calls could no longer be made. see contract _UintAdvancedV2k_ChangeVisibility_
⋅⋅⋅TODO: test this more
* Change access modifier view to pure. See contract _UintAdvancedV2i_ChangeKeyword_

#### 3.3.2 You can't

* Add in new storage variables to the upgraded smart contrat and use it in functions. See contracts _UintAdvancedV2b_NewStorage_, _UintAdvancedV2e_NewStorage_ and _UintAdvancedV2f_NewStorage_. You can add add new storage variables, however, these new variables cannot be used in an of the upgraded functions.

If you find a way to do any of the above, please send [me](https://twitter.com/theblockstalk) or the team at [Indorse](https://twitter.com/joinindorse) a message, or submit an issue or PR to this repo.

#### Still to research

TODO
* TODO: Change access modifier pure to view.
* Change return type
* Change the order of variables (need two variables)
* Test upgradeability of data structures: strings, mappings, structs, arrays
* upgrade a contract twice with many things that can be upgraded upgraded
