const Proxy = artifacts.require('Proxy')
const UintEventV1 = artifacts.require('UintEventV1')
const UintEventV2a_RemovedEvent = artifacts.require('UintEventV2a_RemovedEvent')
const UintEventV2b_EventReordered = artifacts.require('UintEventV2b_EventReordered')

const INDENT = '      ';

contract('UintEvent', function (accounts) {

    let proxy,
    uintEventV1,
    uintEventV2a_RemovedEvent,
    uintEventV2b_EventReordered,
    uintEventV1byProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32, inputValue4 = 43;

    beforeEach(async function() {
        uintEventV1 = await UintEventV1.new();
        uintEventV2a_RemovedEvent = await UintEventV2a_RemovedEvent.new();
        uintEventV2b_EventReordered = await UintEventV2b_EventReordered.new();
        proxy = await Proxy.new(uintEventV1.address);
        uintEventV1byProxy = UintEventV1.at(proxy.address);
        await uintEventV1byProxy.initialize();
    })

    it('should upgrade the contract UintEvent to version 2a with event removed', async function () {
        let tx = await uintEventV1byProxy.setValue(inputValue)
        let valueChangedLog = tx.logs[0]
        assert.equal(valueChangedLog.event, "EventValueChanged", "First log should be EventValueChanged")
        assert.equal(valueChangedLog.args.newValue.toNumber(), inputValue, "The new value should be inputValue")

        await uintEventV1byProxy.upgradeTo(uintEventV2a_RemovedEvent.address)
        await uintEventV1byProxy.initialize();

        tx = await uintEventV1byProxy.setValue(inputValue)
        valueChangedLog = tx.logs[0]
        assert.strictEqual(valueChangedLog, undefined, 'There should be no event emitted')
    })

    it('should upgrade the contract UintEvent to version 2b with events in reverse order', async function () {
        let tx = await uintEventV1byProxy.setValue(inputValue)
        let valueChangedLog = tx.logs[0]
        assert.equal(valueChangedLog.event, "EventValueChanged", "First log should be EventValueChanged")
        assert.equal(valueChangedLog.args.newValue.toNumber(), inputValue, "The new value should be inputValue")

        await uintEventV1byProxy.upgradeTo(uintEventV2b_EventReordered.address)
        await uintEventV1byProxy.initialize();
        
        tx = await uintEventV1byProxy.setValue(inputValue)
        valueChangedLog = tx.logs[0]
        assert.equal(valueChangedLog.event, "EventValueChanged", "First log should be EventValueChanged")
        assert.equal(valueChangedLog.args.newValue.toNumber(), inputValue, "The new value should be inputValue")
    })
})
