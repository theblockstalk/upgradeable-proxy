const Proxy = artifacts.require('Proxy')
const DoubleUintV1 = artifacts.require('DoubleUintV1')
const DoubleUintV2a_NewStorage = artifacts.require('DoubleUintV2a_NewStorage')

const INDENT = '      ';

contract('DoubleUint', function (accounts) {

    let proxy,
    doubleUintV1,
    doubleUintV2a_NewStorage,
    doubleUintV1byProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32, inputValue4 = 43;

    beforeEach(async function() {
        doubleUintV1 = await DoubleUintV1.new();
        doubleUintV2a_NewStorage = await DoubleUintV2a_NewStorage.new();
        proxy = await Proxy.new(doubleUintV1.address);
        doubleUintV1byProxy = DoubleUintV1.at(proxy.address);
    })

    it('should upgrade the contract DoubleUint to version 2 with variables in reverse order', async function () {
        console.log(INDENT, 'Note that smart contract upgrade 2a fails!!!')
        await doubleUintV1byProxy.setValue(inputValue)
        await doubleUintV1byProxy.setValue2(inputValue2)

        await doubleUintV1byProxy.upgradeTo(doubleUintV2a_NewStorage.address)

        let bigNumValue = await doubleUintV1byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.notEqual(inputValue, value, "The value should not be equal to inputValue, as expected")
        assert.equal(inputValue2, value, "The value should be equal to inputValue2 as the variable order was changed")

        bigNumValue = await doubleUintV1byProxy.getValue2.call()
        value = bigNumValue.toNumber();
        assert.notEqual(inputValue2, value, "The value should not be equal to inputValue2, as expected")
        assert.equal(inputValue, value, "The value should be equal to inputValue as the variable order was changed")

        await doubleUintV1byProxy.setValue(inputValue3)
        await doubleUintV1byProxy.setValue2(inputValue4)

        bigNumValue = await doubleUintV1byProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue3, value, "The value should be equal to inputValue3 as the variable order was changed on the setter and the getter")

        bigNumValue = await doubleUintV1byProxy.getValue2.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue4, value, "The value should be equal to inputValue4 as the variable order was changed on the setter and the getter")
    })

})
