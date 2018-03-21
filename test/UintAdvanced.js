const Proxy = artifacts.require('Proxy')
const UintAdvancedV1 = artifacts.require('UintAdvancedV1')
const UintAdvancedV2a_NewFunction = artifacts.require('UintAdvancedV2a_NewFunction')
const UintAdvancedV2b_NewStorage = artifacts.require('UintAdvancedV2b_NewStorage')
const UintAdvancedV2c_NewEvent = artifacts.require('UintAdvancedV2c_NewEvent')
const UintAdvancedV2d_ReverseFunctionOrder = artifacts.require('UintAdvancedV2d_ReverseFunctionOrder')
const UintAdvancedV2e_NewStorageGetter = artifacts.require('UintAdvancedV2e_NewStorageGetter')

const INDENT = '      ';

contract('UintAdvanced', function (accounts) {

    let proxy,
        uintAdvancedV1,
        uintAdvancedV2a_NewFunction,
        uintAdvancedV2b_NewStorage,
        uintAdvancedV2c_NewEvent,
        uintAdvancedV2d_ReverseFunctionOrder,
        uintAdvancedV2e_NewStorage;

    let uintAdvancedV1byProxy,
        uintAdvancedV2a_NewFunctionbyProxy,
        uintAdvancedV2c_NewEventbyProxy,
        uintAdvancedV2d_ReverseFunctionOrderbyProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32;

    beforeEach(async function() {
        uintAdvancedV1 = await UintAdvancedV1.new();
        uintAdvancedV2a_NewFunction = await UintAdvancedV2a_NewFunction.new();
        uintAdvancedV2b_NewStorage = await UintAdvancedV2b_NewStorage.new();
        uintAdvancedV2c_NewEvent = await UintAdvancedV2c_NewEvent.new();
        uintAdvancedV2d_ReverseFunctionOrder = await UintAdvancedV2c_NewEvent.new();
        uintAdvancedV2e_NewEvent = await UintAdvancedV2c_NewEvent.new();

        proxy = await Proxy.new(uintAdvancedV1.address);

        uintAdvancedV1byProxy = UintAdvancedV1.at(proxy.address);
        uintAdvancedV2a_NewFunctionbyProxy = UintAdvancedV2a_NewFunction.at(proxy.address);
        uintAdvancedV2c_NewEventbyProxy = UintAdvancedV2c_NewEvent.at(proxy.address);
        uintAdvancedV2d_ReverseFunctionOrder = UintAdvancedV2d_ReverseFunctionOrder.at(proxy.address);
        uintAdvancedV2e_NewStorage = UintAdvancedV2e_NewStorageGetter.at(proxy.address);
        uintAdvancedV2d_ReverseFunctionOrderbyProxy = UintAdvancedV2d_ReverseFunctionOrder.at(proxy.address)
    })

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

    it('should upgrade the contract UintAdvanced to version 2b with new storage BUT THEN FAIL at changing behaviour due to new storage', async function () {
        console.log(INDENT, 'Note that smart contract upgrade 2b fails!!!')
        await uintAdvancedV1byProxy.setValue(inputValue)

        await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2b_NewStorage.address)
        let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.notEqual(inputValue+100, value, "The smart contract value should NOT be 100 more than the inputValue")
        assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
    })

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

    it('should upgrade the contract UintAdvanced to version 2d with a the order of functions reversed', async function () {
        console.log(INDENT, 'Note that smart contract upgrade 2d fails!!!')
        await uintAdvancedV1byProxy.setValue(inputValue)
        let bigNumValue

        await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2d_ReverseFunctionOrder.address)
        try {
            await uintAdvancedV2d_ReverseFunctionOrderbyProxy.getValue.call()
            throw new Error("This error should not occur")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "VM error not encountered")
        }

        try {
            await uintAdvancedV1byProxy.setValue(inputValue2);
            throw new Error("This error should not occur")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "VM error not encountered")
        }
    })

    it('should upgrade the contract UintAdvanced to version 2e with new storage BUT THEN FAIL at changing behaviour due to new storage', async function () {
        console.log(INDENT, 'Note that smart contract upgrade 2e fails!!!')
        await uintAdvancedV1byProxy.setValue(inputValue)

        await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2e_NewStorage.address)
        try {
            await uintAdvancedV2d_ReverseFunctionOrderbyProxy.getValue.call()
            throw new Error("This error should not occur")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "VM error not encountered")
        }
    })
})
