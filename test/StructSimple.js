const Proxy = artifacts.require('Proxy')
const StructSimpleV1 = artifacts.require('StructSimpleV1')
const StructSimpleV2 = artifacts.require('StructSimpleV2')
const StructSimpleV2b = artifacts.require('StructSimpleV2b')
const StructSimpleV2c = artifacts.require('StructSimpleV2c')

const INDENT = '      ';

contract('StructSimple', function (accounts) {

    let proxy,
    structSimpleV1,
    structSimpleV2,
    structSimpleV2b,
    structSimpleV2c,
    structSimpleV1byProxy,
    structSimpleV2bbyProxy;

    beforeEach(async function() {
        structSimpleV1 = await StructSimpleV1.new();
        structSimpleV2 = await StructSimpleV2.new();
        structSimpleV2b = await StructSimpleV2b.new();
        structSimpleV2c = await StructSimpleV2c.new();
        proxy = await Proxy.new(structSimpleV1.address);
        structSimpleV1byProxy = StructSimpleV1.at(proxy.address);
        structSimpleV2bbyProxy = StructSimpleV2b.at(proxy.address);
        await structSimpleV1byProxy.initialize();
    })

    function parseReturnTuple(value) {
        valueToReturn = [];
        valueToReturn[0]= value[0].toNumber();
        valueToReturn[1] = value[1];
        if(value[2]) valueToReturn[2] = value[2].toNumber();
        return valueToReturn;
    }

    it('should be able to upgrade to new struct function', async function () {
        await structSimpleV1byProxy.setValue(111, true)
        let value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [111, true], "Not equal to that supplied")

        await structSimpleV1byProxy.upgradeTo(structSimpleV2.address)
        await structSimpleV1byProxy.initialize();

        value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [111, true], "Not equal to that initially supplied")

        await structSimpleV1byProxy.setValue(111, true)
        value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [1, false], "Not equal to the constants defined in function")
    })

    it('should be able to upgrade to new struct with added (appended) fields', async function () {
        await structSimpleV1byProxy.setValue(111, true)
        let value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [111, true], "Not equal to that supplied")

        await structSimpleV1byProxy.upgradeTo(structSimpleV2b.address)
        await structSimpleV1byProxy.initialize();

        value = await structSimpleV2bbyProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [111, true, 0], "Not equal to that initially supplied")
        value = await structSimpleV2bbyProxy.getValue2.call()
        assert.deepEqual(parseReturnTuple(value), [0, false, 0], "Not equal to uninitialzed variables")

        await structSimpleV2bbyProxy.setValue(111, true)
        value = await structSimpleV2bbyProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [1, false, 2], "Not equal to the constants defined in function")
        value = await structSimpleV2bbyProxy.getValue2.call()
        assert.deepEqual(parseReturnTuple(value), [0, false, 0], "Not equal to uninitialzed variables")
    })

    it('should not be able to upgrade to new struct with a different order of fields function', async function () {
        console.log(INDENT, 'Note that smart contract array change StructSimpleV2c fails!!!')
        await structSimpleV1byProxy.setValue(111, true)
        let value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [111, true], "Not equal to that supplied")

        await structSimpleV1byProxy.upgradeTo(structSimpleV2c.address)
        await structSimpleV1byProxy.initialize();
        
        value = await structSimpleV1byProxy.getValue.call()
        assert.notDeepEqual(parseReturnTuple(value), [111, true], "Equal to that initially supplied") // Note that this is not as expected
        assert.deepEqual(parseReturnTuple(value), [1, true], "Not equal to morphed values")

        await structSimpleV1byProxy.setValue(111, true)
        value = await structSimpleV1byProxy.getValue.call()
        assert.deepEqual(parseReturnTuple(value), [1, false], "Not equal to the constants defined in function")
    })
})
