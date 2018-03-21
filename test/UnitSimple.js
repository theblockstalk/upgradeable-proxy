const Proxy = artifacts.require('Proxy')
const UintSimpleV1 = artifacts.require('UintSimpleV1')
const UintSimpleV2 = artifacts.require('UintSimpleV2')

const INDENT = '      ';

contract('UintSimple', function (accounts) {

    let proxy,
    uintSimpleV1,
    uintSimpleV2,
    uintSimpleV1byProxy;

    const inputValue = 10;

    beforeEach(async function() {
        uintSimpleV1 = await UintSimpleV1.new();
        uintSimpleV2 = await UintSimpleV2.new();
        proxy = await Proxy.new(uintSimpleV1.address);
        uintSimpleV1byProxy = UintSimpleV1.at(proxy.address);
    })

    it('should upgrade the contract UintSimple to version 2 with different logic', async function () {
        await uintSimpleV1byProxy.setValue(inputValue)
        let bigNumValue = await uintSimpleV1byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        await uintSimpleV1byProxy.upgradeTo(uintSimpleV2.address)
        bigNumValue = await uintSimpleV1byProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        await uintSimpleV1byProxy.setValue(inputValue);
        bigNumValue = await uintSimpleV1byProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

    it('should emit EventUpgrade on upgrade', async function () {
        let tx = await uintSimpleV1byProxy.upgradeTo(uintSimpleV2.address)
        let upgradeLog = tx.logs[0]
        assert.equal(upgradeLog.event, "EventUpgrade", "First log should be EventUpgrade")
        assert.equal(upgradeLog.args.oldTarget, uintSimpleV1.address, "The old target should be the deployed UintSimpleV1 address")
        assert.equal(upgradeLog.args.newTarget, uintSimpleV2.address, "The new target should be the deployed UintSimpleV2 address")
        assert.equal(upgradeLog.args.admin, accounts[0], "The upgrade should be done by account[0]")
    })

    it('should determine the differece in gas cost for regular vs. upgradeable contract call', async function () {
        let gasCosts = []
        let tx = await uintSimpleV1.setValue(inputValue)
        gasCosts[0] = tx.receipt.gasUsed
        tx = await uintSimpleV1byProxy.setValue(inputValue)
        gasCosts[1] = tx.receipt.gasUsed

        await uintSimpleV1byProxy.upgradeTo(uintSimpleV2.address)
        tx = await uintSimpleV2.setValue(inputValue)
        gasCosts[2] = tx.receipt.gasUsed
        tx = await uintSimpleV1byProxy.setValue(inputValue)
        gasCosts[3] = tx.receipt.gasUsed

        console.log(INDENT, 'the gas cost of calling UintSimpleV1.setValue(', inputValue, ') increased by ', 100*(gasCosts[1]/gasCosts[0] - 1),
            '% when made upgradeable, or ', gasCosts[1] - gasCosts[0], ' gas')
        console.log(INDENT, 'the gas cost of calling UintSimpleV2.setValue(', inputValue, ') increased by ', 100*(gasCosts[3]/gasCosts[2] - 1),
            '% when made upgradeable, or ', gasCosts[3] - gasCosts[2], ' gas')
    })

})
