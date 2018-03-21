const Proxy = artifacts.require('Proxy')
const UintAdvancedV1 = artifacts.require('UintAdvancedV1')
const UintAdvancedV2a_NewFunction = artifacts.require('UintAdvancedV2a_NewFunction')
const UintAdvancedV2b_NewStorage = artifacts.require('UintAdvancedV2b_NewStorage')
const UintAdvancedV2c_NewEvent = artifacts.require('UintAdvancedV2c_NewEvent')
const UintAdvancedV2d_ReverseFunctionOrder = artifacts.require('UintAdvancedV2d_ReverseFunctionOrder')
const UintAdvancedV2e_NewStorage = artifacts.require('UintAdvancedV2e_NewStorage')
const UintAdvancedV2f_NewStorage = artifacts.require('UintAdvancedV2f_NewStorage')
const UintAdvancedV2g_OverrideFunctionGetter = artifacts.require('UintAdvancedV2g_OverrideFunctionGetter')
const UintAdvancedV2h_OverrideFunctionSetter = artifacts.require('UintAdvancedV2h_OverrideFunctionSetter')
const UintAdvancedV2i_NewFunction = artifacts.require('UintAdvancedV2i_NewFunction')

const INDENT = '        ';

contract('UintAdvanced', function (accounts) {

    let proxy,
        uintAdvancedV1,
        uintAdvancedV2a_NewFunction,
        uintAdvancedV2b_NewStorage,
        uintAdvancedV2c_NewEvent,
        uintAdvancedV2d_ReverseFunctionOrder,
        uintAdvancedV2e_NewStorage,
        uintAdvancedV2f_NewStorage,
        uintAdvancedV2g_OverrideFunctionGetter,
        uintAdvancedV2h_OverrideFunctionSetter,
        uintAdvancedV2i_NewFunction;

    let uintAdvancedV1byProxy,
        uintAdvancedV2a_NewFunctionbyProxy,
        uintAdvancedV2c_NewEventbyProxy,
        uintAdvancedV2i_NewFunctionbyProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32;

    beforeEach(async function() {
        uintAdvancedV1 = await UintAdvancedV1.new();
        uintAdvancedV2a_NewFunction = await UintAdvancedV2a_NewFunction.new();
        uintAdvancedV2b_NewStorage = await UintAdvancedV2b_NewStorage.new();
        uintAdvancedV2c_NewEvent = await UintAdvancedV2c_NewEvent.new();
        uintAdvancedV2d_ReverseFunctionOrder = await UintAdvancedV2d_ReverseFunctionOrder.new();
        uintAdvancedV2e_NewStorage = await UintAdvancedV2e_NewStorage.new();
        uintAdvancedV2f_NewStorage = await UintAdvancedV2f_NewStorage.new();
        uintAdvancedV2g_OverrideFunctionGetter = await UintAdvancedV2g_OverrideFunctionGetter.new();
        uintAdvancedV2h_OverrideFunctionSetter = await UintAdvancedV2h_OverrideFunctionSetter.new();
        uintAdvancedV2i_NewFunction = await UintAdvancedV2i_NewFunction.new();

        proxy = await Proxy.new(uintAdvancedV1.address);

        uintAdvancedV1byProxy = UintAdvancedV1.at(proxy.address);
        uintAdvancedV2a_NewFunctionbyProxy = UintAdvancedV2a_NewFunction.at(proxy.address);
        uintAdvancedV2c_NewEventbyProxy = UintAdvancedV2c_NewEvent.at(proxy.address);
        uintAdvancedV2i_NewFunctionbyProxy = UintAdvancedV2i_NewFunction.at(proxy.address);
    })

    describe('test adding new functions to the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2a with a new function', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2a_NewFunction.address)
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            await uintAdvancedV1byProxy.setValue(inputValue2);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")

            await uintAdvancedV2a_NewFunctionbyProxy.setDoubleValue(inputValue3);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue3*2, value, "The value in the contract should be twice the input value")
        })

        it('should upgrade the contract UintAdvanced to version 2i with a new function in a different order', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2i_NewFunction.address)
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            await uintAdvancedV1byProxy.setValue(inputValue2);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")

            await uintAdvancedV2i_NewFunctionbyProxy.setDoubleValue(inputValue3);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue3*2, value, "The value in the contract should be twice the input value")
        })
    })

    describe('test adding new storage variables to the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2b with new storage BUT THEN FAIL at changing behaviour of setter due to new storage', async function () {
            console.log(INDENT, 'Note that smart contract upgrade 2b fails!!!')
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2b_NewStorage.address)
            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.notEqual(inputValue+100, value, "The smart contract value should NOT be 100 more than the inputValue")
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
        })

        it('should upgrade the contract UintAdvanced to version 2e with new storage BUT THEN FAIL at changing behaviour of getter due to new storage', async function () {
            console.log(INDENT, 'Note that smart contract upgrade 2e fails!!!')
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2e_NewStorage.address)
            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.notEqual(inputValue+100, value, "The smart contract value should NOT be 100 more than the inputValue")
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
        })

        it('should upgrade the contract UintAdvanced to version 2f with new storage that is not used in any new functions', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2f_NewStorage.address)
            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
        })

    })

    describe('test adding new events to the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2c with new event', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2c_NewEvent.address)
            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            let tx = await uintAdvancedV2c_NewEventbyProxy.setValue(inputValue2)
            let setValueLog = tx.logs[0]
            assert.equal(setValueLog.event, "EventSetValue", "First log should be EventSetValue")
            assert.equal(setValueLog.args.oldValue.toNumber(), inputValue, "The old value should be inputValue")
            assert.equal(setValueLog.args.newValue.toNumber(), inputValue2, "The new value should be inputValue2")

            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")
        })
    })

    describe('test changing the order of functions in the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2d with a the order of functions reversed', async function () {
            console.log(INDENT, 'Note that smart contract upgrade 2d fails!!!')
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2d_ReverseFunctionOrder.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            await uintAdvancedV1byProxy.setValue(inputValue2)
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")


        })
    })

    describe('test overwride the contract functions with new logic', () => {
        it('should upgrade the contract UintAdvanced to version 2g with a function call logic updated', async function () {
            // console.log(INDENT, 'Note that smart contract upgrade 2g fails!!!')
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2g_OverrideFunctionGetter.address)

            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue+2, value, "The values should be equal to inputValue+2")
        })

        it('should upgrade the contract UintAdvanced to version 2h with a function tx logic updated', async function () {
            // console.log(INDENT, 'Note that smart contract upgrade 2g fails!!!')
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2h_OverrideFunctionSetter.address)

            await uintAdvancedV1byProxy.setValue(inputValue)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue+2, value, "The values should be equal to inputValue+2")
        })
    })





})
