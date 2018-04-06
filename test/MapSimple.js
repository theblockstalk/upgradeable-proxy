const Proxy = artifacts.require('Proxy')
const MapSimpleV1 = artifacts.require('MapSimpleV1')
const MapSimpleV2 = artifacts.require('MapSimpleV2')
const MapSimpleV2b = artifacts.require('MapSimpleV2b')
const MapSimpleV2c = artifacts.require('MapSimpleV2c')

const INDENT = '      ';

contract('MapSimple', function (accounts) {

    let proxy,
    mapSimpleV1,
    mapSimpleV2,
    mapSimpleV2b,
    mapSimpleV2c,
    mapSimpleV1byProxy,
    mapSimpleV2bbyProxy,
    mapSimpleV2cbyProxy;

    beforeEach(async function() {
        mapSimpleV1 = await MapSimpleV1.new();
        mapSimpleV2 = await MapSimpleV2.new();
        mapSimpleV2b = await MapSimpleV2b.new();
        mapSimpleV2c = await MapSimpleV2c.new();
        proxy = await Proxy.new(mapSimpleV1.address);
        mapSimpleV1byProxy = MapSimpleV1.at(proxy.address);
        mapSimpleV2bbyProxy = MapSimpleV2b.at(proxy.address);
        mapSimpleV2cbyProxy = MapSimpleV2c.at(proxy.address);
    })

    it('should be able to upgrade to new map function', async function () {
        await mapSimpleV1byProxy.setValue(0, true)
        let value = await mapSimpleV1byProxy.getValue.call(0)
        assert.equal(value, true, "Not equal to true")

        await mapSimpleV1byProxy.upgradeTo(mapSimpleV2.address)
        value = await mapSimpleV1byProxy.getValue.call(0)
        assert.equal(value, true, "Not equal to true")

        await mapSimpleV1byProxy.setValue(0, true)
        value = await mapSimpleV1byProxy.getValue.call(0)
        assert.equal(value, false, "Not equal to false")
    })

    it('should be able to upgrade to new mapping with a different key', async function () {
        await mapSimpleV1byProxy.setValue(0, true)
        let value = await mapSimpleV1byProxy.getValue.call(0)
        assert.equal(value, true, "Not equal to true")

        await mapSimpleV1byProxy.upgradeTo(mapSimpleV2b.address)
        value = await mapSimpleV2bbyProxy.getValue.call(0)
        assert.equal(value, true, "Not equal to true")
        value = await mapSimpleV2bbyProxy.getValue.call(0x0000000000000000000000000000000000000000)
        assert.equal(value, true, "Not equal to true")
        value = await mapSimpleV2bbyProxy.getValue.call(0x0000000000000000000000000000000000000001)
        assert.equal(value, false, "Equal to true")

        await mapSimpleV2bbyProxy.setValue('0x0000000000000000000000000000000000000000', false)
        value = await mapSimpleV2bbyProxy.getValue.call(0)
        assert.equal(value, false, "Equal to false")
    })

    it('should be able to upgrade to new mapping with a different value', async function () {
        await mapSimpleV1byProxy.setValue(0, true)
        let value = await mapSimpleV1byProxy.getValue.call(0)
        assert.equal(value, true, "Not equal to true")

        await mapSimpleV1byProxy.upgradeTo(mapSimpleV2c.address)
        value = await mapSimpleV2cbyProxy.getValue.call(0)
        assert.equal(value.toNumber(), true, "Not equal to 1")
        value = await mapSimpleV2cbyProxy.getValue.call(1)
        assert.equal(value.toNumber(), 0, "Not equal to 0")

        await mapSimpleV2cbyProxy.setValue(0, 222)
        value = await mapSimpleV2cbyProxy.getValue.call(0)
        assert.equal(value.toNumber(), 222, "Not equal to 222")
    })
})
