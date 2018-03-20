const Proxy = artifacts.require('Proxy')
const UintSimpleOneContractV1 = artifacts.require('UintSimpleOneContractV1')
const UintSimpleOneContractV2 = artifacts.require('UintSimpleOneContractV2')

contract('UintSimpleOneContract', function (accounts) {

    let proxy,
    uintSimpleOneContractV1,
    uintSimpleOneContractV2,
    uintSimpleOneContractV1byProxy;

    const inputValue = 10;

    beforeEach(async function() {
        uintSimpleOneContractV1 = await UintSimpleOneContractV1.new();
        uintSimpleOneContractV2 = await UintSimpleOneContractV2.new();
        proxy = await Proxy.new(uintSimpleOneContractV1.address);
        uintSimpleOneContractV1byProxy = UintSimpleOneContractV1.at(proxy.address);
    })

    it('should upgrade the contract UintSimpleOneContract to version 2 with different logic', async function () {
        await uintSimpleOneContractV1byProxy.setValue(inputValue)
        let bigNumValue = await uintSimpleOneContractV1byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        await uintSimpleOneContractV1byProxy.upgradeTo(uintSimpleOneContractV2.address)
        await uintSimpleOneContractV1byProxy.setValue(inputValue);
        bigNumValue = await uintSimpleOneContractV1byProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

    it('should emit EventUpgrade on upgrade', async function () {
        await uintSimpleOneContractV1byProxy.setValue(inputValue)
        let bigNumValue = await uintSimpleOneContractV1byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        let tx = await uintSimpleOneContractV1byProxy.upgradeTo(uintSimpleOneContractV2.address)
        let upgradeLog = tx.logs[0]
        assert.equal(upgradeLog.event, "EventUpgrade", "First log should be EventUpgrade")
        assert.equal(upgradeLog.args.oldTarget, uintSimpleOneContractV1.address, "The old target should be the deployed UintSimpleOneContractV1 address")
        assert.equal(upgradeLog.args.newTarget, uintSimpleOneContractV2.address, "The new target should be the deployed UintSimpleOneContractV2 address")
        assert.equal(upgradeLog.args.admin, accounts[0], "The upgrade should be done by account[0]")
    })

    it('should determine the differece in gas cost for regular vs. upgradeable contract call', async function () {
        let gasCosts = []
        let tx = await uintSimpleOneContractV1.setValue(inputValue)
        gasCosts[0] = tx.receipt.gasUsed
        tx = await uintSimpleOneContractV1byProxy.setValue(inputValue)
        gasCosts[1] = tx.receipt.gasUsed

        await uintSimpleOneContractV1byProxy.upgradeTo(uintSimpleOneContractV2.address)
        tx = await uintSimpleOneContractV2.setValue(inputValue)
        gasCosts[2] = tx.receipt.gasUsed
        tx = await uintSimpleOneContractV1byProxy.setValue(inputValue)
        gasCosts[3] = tx.receipt.gasUsed

        console.log('the gas cost of calling UintSimpleOneContractV1.setValue(', inputValue, ') increased by ', 100*(gasCosts[1]/gasCosts[0] - 1),
            '% when made upgradeable, or ', gasCosts[1] - gasCosts[0], ' gas')
        console.log('the gas cost of calling UintSimpleOneContractV2.setValue(', inputValue, ') increased by ', 100*(gasCosts[3]/gasCosts[2] - 1),
            '% when made upgradeable, or ', gasCosts[3] - gasCosts[2], ' gas')
    })

})
