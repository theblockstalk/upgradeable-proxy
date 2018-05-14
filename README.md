# Upgradeable Proxy

This repository tests the upgradeable proxy pattern. It is a simplified version of the system being used by the
[AragonOS](https://github.com/aragon/aragonOS), [Level K](https://github.com/levelkdev/master-storage) and [ZepplinOS](https://github.com/zeppelinos/core) systems. The core upgradeability pattern code has been copied and a few features have been removed.

The results of tests will be summarised here. The contributions of this repository are made for general knowledge only. No contributors are to be held liable for any damages occurred from using code or information from this repository. Do your own thorough testing before deploying any upgradeable smart contract systems.

That said, there are **over 90 unit tests** in this repository that try to put each different way you could use the proxy upgradeable pattern to the test. This readme should point to where such different examples of upgrades can be found for developer reference in times of frustration.

## 1. Getting started

To get up to speed on different upgradeable smart contract strategies, please read [Summary of Ethereum Upgradeable Smart Contract R&D](https://blog.indorse.io/ethereum-upgradeable-smart-contract-strategies-456350d0557c).

As noted in the article, **implementing an upgradeable smart contract requires a well thought out governance strategy**. Section 3.5 advises on how this can be done.

## 2. Running the tests

```
git clone https://github.com/jackandtheblockstalk/upgradeable-proxy
cd upgradeable-proxy
truffle test
```

## 3. A **tested guide** to how to create an upgradeable Ethereum smart contract

### 3.1 The upgrade mechanism

The three main contracts that are used in the upgradeable proxy pattern are:
1. [Proxied.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Proxied.sol)
2. [Proxy.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Proxy.sol)
3. [Upgradeable.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/Upgradeable.sol)

Please see in-code contract and function descriptions for how these contracts allow you to make an upgradeable smart contract. The below diagram shows how the function execution flow (steps 1-4) and how the contract is upgraded (steps 5-7):

![Upgradeable](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/diagram1.jpg)

Understanding the [DELEGATECALL](https://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries) Ethereum opcode is key to understanding the upgradeable proxy pattern.

### 3.2 How to make a simple Uint getter/setter smart contract upgradeable

To see the simplest way of implementing an upgradeable smart contract, check out _UintSimple.sol_ and it's test suite.

There are several ways to structure a smart contract that will be upgradeable. The following three sections explain these different structures and their characteristics. In each of the structures, it was found that the gas cost increase was the same (~3% or 1100 gas).

```
contract UintSimpleV1 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = _value;
    }
}
```

The following three contracts achieve the exact same upgrade of the setValue() logic on _UintSimpleV1_ above.

#### 3.2.1 One smart contract containing all desired storage and logic
See tests for contracts _UintSimple_

```
contract UintSimpleV2 is Upgradeable {
    uint value;

    function getValue() view public returns (uint) {
        return value;
    }

    function setValue(uint _value) public {
        value = 2*_value;
    }
}
```

**Characteristics:**
- Easy to see the entire upgraded contract in one place

#### 3.2.2 A modular smart contract design
See tests for contracts _UintSimpleModular_

See [UintSimpleModular.sol](https://github.com/jackandtheblockstalk/upgradeable-proxy/blob/master/contracts/test/UintSimpleModular.sol)

**Characteristics:**
- Forces strict ordering of state variables
- Adds abstraction and may be more confusing

#### 3.2.3 An inherited smart contract
See tests for contracts _UintInherited_

```
contract UintInheritedV2 is UintSimpleV1 {
    function setValue(uint _value) public {
        value = 2*_value;
    }
}
```

**Characteristics:**
- Easy to see components that are being upgraded.
- Forces the same ordering of state variables.
- Keeps compiler errors on upgrades that are possible but do not make sense (see points 7, 8, 10, 13 of Section 3.1.1 You can below)
- Cannot see the rest of the contract.

### 3.3 What you _can and can't do_ when upgrading a contract

#### 3.3.1 You can :+1:

You can do the following changes on an upgraded contract and it will behave as if you have replaced the contract and kept the state.

1. Add (append) in new storage variables to the upgraded smart contract and use it in functions.
   - See contracts _UintAdvancedV2b_NewStorage_, _UintAdvancedV2e_NewStorage_, _UintAdvancedV2f_NewStorage_ and _UintAdvancedV2j_NewStorage_.
   - **Note:** New variables **must be appended** to not change the existing order of variables. See point 1 of _Section 3.3.2 You can't_ below
   - See point 16 below regarding appending new fields to structures
2. Upgrade uints, addresses, booleans, fixed sized arrays, dynamic arrays, structs and mappings
   - See _UintSimple_, _BoolSimple_, _AddressSimple_, _ArraySimple_, _StructSimple_, _MapSimple_
   - **TODO:** enums, bytes32, dynamic bytes (it seems very likely that this will be possible)
3. Change function logic of pre-existing functions so long as the signature does not change.
   - See contracts _UintSimple_, _UintAdvancedV2g_OverrideFunctionGetter_ and _UintAdvancedV2h_OverrideFunctionSetter_
4. Add new functions to the upgraded contract.
   - See contract _UintAdvancedV2a_NewFunction_
   - **Note:** The new function can be added in any place in the contract. It does not need to be appended as the last function. See contract _UintAdvancedV2i_NewFunction_
   - **Note:** Applications or other smart contracts will need to know about the upgrade to be able to call the new function with the new ABI.
5. Add new events to the upgraded contract.
   - See contract _UintAdvancedV2c_NewEvent_
   - **Note:** The new event can be added in any place in the contract. It does not need to be appended as the last event.
   - **Note:** Applications or other smart contracts will need to know about the upgrade to be able to watch for the new event with the new ABI.
6. Change the order of functions in a contract.
   - See contract _UintAdvancedV2d_ReverseFunctionOrder_
7. Change visibility for upgraded functions.
   - **Note:** Only the following changes were tested
     - public --> external. Functions were still callable externally. See contract _UintAdvancedV2j_ChangeVisibility_
     - public --> internal. Function calls could no longer be made. see contract _UintAdvancedV2k_ChangeVisibility_
   - **TODO:** test this more
   - **Note:** Normal contracts do now allow for inheritance/overloading with changed visibility keywords. The compiler will not issue any warnings when using upgradeable contracts as such. Use with caution.
8. Change access modifier view to pure or from pure to view
   - See contract _UintAdvancedV2l_ChangeKeyword_
   - **Note:** Normal contracts do not allow for functions to be overloaded with different keywords view and pure. The compiler will not issue any warnings when using upgradeable contracts this way. Use with caution.
9. Remove events from the contract
   - See contract _UintEventV2a_RemovedEvent_
10. Change the return type for function calls.
    - Changing to return solidity value types (uint, string etc), as well as arrays and tuples were successful
    - See contracts _UintAdvancedV2n_ChangeReturn_ to _UintAdvancedV2v_ChangeReturn_ (all V2n-v)
    - Changing to return structs was not tested due to limitations of the javascript web3 object at the time. See contract _UintAdvancedV2w_ChangeReturn_
    - **Note:** Applications or other smart contracts will need to know about the upgrade to be able to correctly interpret the new return values with the new ABI.
    - **Note:** Normal contracts do not allow for overloading with different return values. The compiler will not issue any warnings when using upgradeable contracts this way. Use with caution.
11. Change the order of events
    - See contract _UintEventV2b_EventReordered_
12. Send Ether to a payable function in an upgradeable contract
    - See contract _UintEther_
13. Change functions from payable to non-payable and non-payable to payable
    - See contract _UintEther_
    - **Note:** Normal contracts do not allow for overloading with different payable keywords. The compiler will not issue any warnings when using upgradeable contracts this way. Use with caution.
14. Create upgradeable fallback functions (). You can have payable fallback functions and you can upgrade and change from payable to not-payable and visa-versa.
    - See contract _UintFallback_
15. Overload functions in the upgraded contract
    - See contracts _UintAdvancedV2x_Overloaded_ and _UintAdvancedV2y_Overloaded_
    **Note:** This was not fully tested due to limitations of the web3 object.
16. Append new fields to a struct and still be able to access all previously set struct state as expected
    - See contract _ArraySimpleV2c_
    - **Note:** Applications or other smart contracts may need to know about the upgrade to be able to correctly interpret new return values of structs with the new ABI.
17. Change variable value types during an upgrade such as from uint to bool, or bytes32 to uint
    - See contract _ChangeType_
    - **Note:** The contract will interperate any state stored according to the new variable type. Changing state types may cause unexpected results. The compiler will not issue any warnings when using upgradeable contracts this way. Use with caution.
    - **Note:** Seriously, use with caution!
    - It looks like standard Solidity casting rules apply. This has not been thoroughly tested.
    - Mapping key and value types can also be changed. See contract _MapSimple_
    - **TODO** test this further

#### 3.3.2 You can't :thumbsdown:

You cannot do the following changes on an upgraded contract and expect that it will behave like an updated contract with the same state.

1. Change the order of previously defined state variables in the next version upgraded smart contracts
   - See contract _DoubleUintV2_
   - Adding new slots to a fixed size array is not possible. See contract _ArraySimple_
   - Changing from a fixed sized to a dynamic sized array or visa-versa is not possible. See contract _ArraySimple_
   - Adding (appending) fields to a struct is possible but changing the order of fields in a struct is not possible. See _StructSimple_
2. Declare any variables with initialized values `uint variable1 = 8`. This includes declare any constant state variables `uint constant variable1 = 8`.
   - **Note:** state variables must be initialized using the intialize() function.
   - See contract _UintInitialize_
3. An Upgradeable contract cannot have any of the following, which will conflict with the pattern
```
address public target;
mapping (address => bool) public initialized;
event EventUpgrade(address, address, address);
event EventInitialized(address);
modifier initializeOnceOnly();
function upgradeTo(address) public;
```

If you find a way to do any of the above, please send [me](https://twitter.com/theblockstalk) or the team at [Indorse](https://twitter.com/joinindorse) a message, or submit an issue or PR to this repo.

#### 3.3.3 Still to research

**TODO:**
* test using libraries
* test bytecode optimizations

**TODO when web3 is updated:**
* Fix test of Struct changed return value _UintAdvancedV2w_ChangeReturn_
* Fix test of overloaded functions in _UintAdvancedV2x_Overloaded_

### 3.4 initialization

As per point 2 in Section 3.3.2 You can't, contract initialization is not done during deployment as normal. As such a special initialize() function has been built to allow for variable initialization as needed. To initialize the conract:
1. Overload the Upgradeable.initialize() function with the required variable setters. Alternatively, if arguments need to be provided during initialization, then you can create an overloaded initialize function with arguments e.g. initialize(uint). If this is the case you should overload the initialize() and make this function revert: this ensures it cannot be accidentally called. Make sure that any initialization function uses the initializeOnceOnly modifier.
2. After deploying the contract, call the initializer.
3. After upgrading the contract with upgradeTo(address), call the initializer. Alternatively, to call upgradeTo and initialize atomically, get the message data needed to call the initialize() function and pass it as a second argument in the overloaded function upgradeTo(address, bytes)

### 3.5 Upgrade safety and protection

Experimental safety features were implemented to the upgradeable pattern to protect the contract from being accidentally or maliciousl upgraded to the wrong contract. A target contract for the SafeProxy must satisfy, at a minimum, the following conditions to be able to call Proxy.upgradeTo() to change the target:
1. Must have a `address target` variable
2. Must have a `upgradeTo(address) public` function

**Note:**
* empty functions that do nothing will satisfy these conditions.
* one of the safety features depends on the use of the EXTCODESIZE opcode which *may not work after the Serenity hard fork*.
* carefully consider if these safety features are necessary, *onced deployed they cannot be changed*.

The safe upgradeable proxy pattern can be found in [/contracts/safe/](https://github.com/jackandtheblockstalk/upgradeable-proxy/tree/master/contracts/safe). See _UpgraeableCheck_ contracts for test.

### 3.6 Creating a permissioned (Ownable) proxy upgrade

The upgradeable proxy pattern was combined with the Zepplin [Ownable](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/ownership/Ownable.sol) contract standard to allow for the upgradeTo() function to only be called by the administrator (owner). The administrator of the proxy can be set as a multisig or DAO-like contract to provide distributed governance.

The permissioned upgradeable contracts can be seen in the [/contracts/ownable](https://github.com/jackandtheblockstalk/upgradeable-proxy/tree/master/contracts/ownable) folder. Please see _UintOwnable_ contract tests for details.

If appropriate, the ownable and safe features can be combined.

### 3.6 Solidity compiler compatibility

The upgradeable proxy pattern depends on the internal storage layout smart contracts. This storage ordering is determined by Soliddity and is not part of Solidity's public interface. As such, changes to this layout may happen, which would break an upgrade using the upgradeable proxy pattern. The use of this repository is suggested to check that newer versions of the Solidity compiler do not break this upgrade pattern.
