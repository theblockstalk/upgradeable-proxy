const Proxy = artifacts.require('Proxy')
const UintSimpleV1_Logic = artifacts.require('UintSimpleV1_Logic')
const UintSimpleV2_Logic = artifacts.require('UintSimpleV2_Logic')

contract('UintSimple', function (accounts) {

    let proxy,
    uintSimpleV1,
    uintSimpleV2,
    UintSimpleV1byProxy;

    const inputValue = 10;

    beforeEach(async function() {
        uintSimpleV1 = await UintSimpleV1_Logic.new();
        uintSimpleV2 = await UintSimpleV2_Logic.new();
        proxy = await Proxy.new(uintSimpleV1.address);
        uintSimple_byProxy = UintSimpleV1_Logic.at(proxy.address);
    })

    it('should be able to use UintSimple_V1 like any contract', async function() {
        await uintSimpleV1.setValue(inputValue)
        let bigNumValue = await uintSimpleV1.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")
    })

    it('should be able to use UintSimple_V2 like any contract', async function() {
        await uintSimpleV2.setValue(inputValue)
        let bigNumValue = await uintSimpleV2.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

    it('should delegate call to implementation', async function () {
        await uintSimple_byProxy.setValue(inputValue)
        let bigNumValue = await uintSimple_byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")
    })

    it('should upgrade the contract UintSimple to version 2 with different logic', async function () {
        await uintSimple_byProxy.setValue(inputValue)
        let bigNumValue = await uintSimple_byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        await uintSimple_byProxy.upgradeTo(uintSimpleV2.address)
        await uintSimple_byProxy.setValue(inputValue);
        bigNumValue = await uintSimple_byProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

    it('should emit EventUpgrade on upgrade', async function () {
        await uintSimple_byProxy.setValue(inputValue)
        let bigNumValue = await uintSimple_byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        let tx = await uintSimple_byProxy.upgradeTo(uintSimpleV2.address)
        let upgradeLog = tx.logs[0]
        assert.equal(upgradeLog.event, "EventUpgrade", "First log should be EventUpgrade")
        assert.equal(upgradeLog.args.oldTarget, uintSimpleV1.address, "The old target should be the deployed UintSimpleV1_Logic address")
        assert.equal(upgradeLog.args.newTarget, uintSimpleV2.address, "The new target should be the deployed UintSimpleV2_Logic address")
        assert.equal(upgradeLog.args.admin, accounts[0], "The upgrade should be done by account[0]")
    })

    it('should determine the differece in gas cost for regular vs. upgradeable contract call', async function () {
        let gasCosts = []
        let tx = await uintSimpleV1.setValue(inputValue)
        gasCosts[0] = tx.receipt.gasUsed
        tx = await uintSimple_byProxy.setValue(inputValue)
        gasCosts[1] = tx.receipt.gasUsed

        await uintSimple_byProxy.upgradeTo(uintSimpleV2.address)
        tx = await uintSimpleV2.setValue(inputValue)
        gasCosts[2] = tx.receipt.gasUsed
        tx = await uintSimple_byProxy.setValue(inputValue)
        gasCosts[3] = tx.receipt.gasUsed

        console.log('the gas cost of calling UintSimpleV1_Logic.setValue(', inputValue, ') increased by ', 100*(gasCosts[1]/gasCosts[0] - 1),
            '% when made upgradeable, or ', gasCosts[1] - gasCosts[0], ' gas')
        console.log('the gas cost of calling UintSimpleV2_Logic.setValue(', inputValue, ') increased by ', 100*(gasCosts[3]/gasCosts[2] - 1),
            '% when made upgradeable, or ', gasCosts[3] - gasCosts[2], ' gas')
    })

})
