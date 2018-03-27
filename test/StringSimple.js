const Proxy = artifacts.require('Proxy')
const StringSimpleV1 = artifacts.require('StringSimpleV1')
const StringSimpleV2 = artifacts.require('StringSimpleV2')

const INDENT = '      ';

contract('StringSimple', function (accounts) {

    let proxy,
    stringSimpleV1,
    stringSimpleV2,
    stringSimpleV1byProxy;

    const inputValue = "I am a new string", inputValue2 = "I am a different string";

    beforeEach(async function() {
        stringSimpleV1 = await StringSimpleV1.new();
        stringSimpleV2 = await StringSimpleV2.new();
        proxy = await Proxy.new(stringSimpleV1.address);
        stringSimpleV1byProxy = StringSimpleV1.at(proxy.address);
    })

    it('should be able to upgrade to new string function', async function () {
        await stringSimpleV1byProxy.setValue(inputValue)
        let value = await stringSimpleV1byProxy.getValue.call()
        assert.equal(value, inputValue, "Not equal to inptValue")

        await stringSimpleV1byProxy.upgradeTo(stringSimpleV2.address)
        value = await stringSimpleV1byProxy.getValue.call()
        assert.equal(value, inputValue, "Not equal to inptValue")

        await stringSimpleV1byProxy.setValue(inputValue2)
        value = await stringSimpleV1byProxy.getValue.call()
        assert.equal(value, "I am a really really really happy string", "Not equal to constant defined in function")
    })
})
