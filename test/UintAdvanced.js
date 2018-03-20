const Proxy = artifacts.require('Proxy')
const UintAdvancedV1 = artifacts.require('UintAdvancedV1')
const UintAdvancedV2a_NewFunction = artifacts.require('UintAdvancedV2a_NewFunction')
const UintAdvancedV2b_NewStorage = artifacts.require('UintAdvancedV2b_NewStorage')
const UintAdvancedV2c_NewEvent = artifacts.require('UintAdvancedV2c_NewEvent')

contract('UintAdvanced', function (accounts) {

    let proxy,
    uintAdvancedV1,
    uintAdvancedV2a_NewFunction,
    uintAdvancedV2b_NewStorage,
    uintAdvancedV2c_NewEvent,
    uintAdvancedV1byProxy,
    uintAdvancedV2a_NewFunctionbyProxy,
    uintAdvancedV2b_NewStoragebyProxy,
    uintAdvancedV2c_NewEventbyProxy;

    const inputValue = 10, inputValue2 = 22, inputValue3 = 33;

    beforeEach(async function() {
        uintAdvancedV1 = await UintAdvancedV1.new();
        uintAdvancedV2a_NewFunction = await UintAdvancedV2a_NewFunction.new();
        uintAdvancedV2b_NewStorage = await UintAdvancedV2b_NewStorage.new();
        uintAdvancedV2c_NewEvent = await UintAdvancedV2c_NewEvent.new();
        proxy = await Proxy.new(uintAdvancedV1.address);
        uintAdvancedV1byProxy = UintAdvancedV1.at(proxy.address);
        uintAdvancedV2a_NewFunctionbyProxy = UintAdvancedV2a_NewFunction.at(proxy.address);
        uintAdvancedV2b_NewStoragebyProxy = UintAdvancedV2b_NewStorage.at(proxy.address);
        uintAdvancedV2c_NewEventbyProxy = UintAdvancedV2c_NewEvent.at(proxy.address);
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

    it('should upgrade the contract UintAdvanced to version 2b with new storage', async function () {
        await uintAdvancedV1byProxy.setValue(inputValue)

        await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2b_NewStorage.address)
        let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue+100, value, "The smart contract value should be 100 more than before")
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
})
