const Proxy = artifacts.require('Proxy')
const MapSimpleV1 = artifacts.require('MapSimpleV1')
const MapSimpleV2 = artifacts.require('MapSimpleV2')

const INDENT = '      ';

contract('MapSimple', function (accounts) {

    let proxy,
    mapSimpleV1,
    mapSimpleV2,
    mapSimpleV1byProxy;

    beforeEach(async function() {
        mapSimpleV1 = await MapSimpleV1.new();
        mapSimpleV2 = await MapSimpleV2.new();
        proxy = await Proxy.new(mapSimpleV1.address);
        mapSimpleV1byProxy = MapSimpleV1.at(proxy.address);
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
})
