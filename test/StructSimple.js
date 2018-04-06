const Proxy = artifacts.require('Proxy')
const StructSimpleV1 = artifacts.require('StructSimpleV1')
const StructSimpleV2 = artifacts.require('StructSimpleV2')

const INDENT = '      ';

contract('StructSimple', function (accounts) {

    let proxy,
    structSimpleV1,
    structSimpleV2,
    structSimpleV1byProxy;

    beforeEach(async function() {
        structSimpleV1 = await StructSimpleV1.new();
        structSimpleV2 = await StructSimpleV2.new();
        proxy = await Proxy.new(structSimpleV1.address);
        structSimpleV1byProxy = StructSimpleV1.at(proxy.address);
    })

    function parseReturnTuple(value) {
        valueToReturn = [];
        valueToReturn[0]= value[0].toNumber();
        valueToReturn[1] = value[1];
        return valueToReturn;
    }

    it('should be able to upgrade to new struct function', async function () {
        await structSimpleV1byProxy.setValue(111, true)
        let value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [111, true], "Not equal to that supplied")

        await structSimpleV1byProxy.upgradeTo(structSimpleV2.address)
        value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [111, true], "Not equal to that initially supplied")

        await structSimpleV1byProxy.setValue(111, true)
        value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [1, false], "Not equal to the constants defined in function")
    })
})
