const Proxy = artifacts.require('Proxy')
const ArraySimpleV1a = artifacts.require('ArraySimpleV1a')
const ArraySimpleV2a = artifacts.require('ArraySimpleV2a')
const ArraySimpleV2a_ExtraValue = artifacts.require('ArraySimpleV2a_ExtraValue')

const INDENT = '      ';

contract('ArraySimple', function (accounts) {

    let proxy,
    arraySimpleV1a,
    arraySimpleV2a,
    arraySimpleV2a_ExtraValue,
    arraySimplebyProxy,
    arraySimpleV2a_ExtraValuebyProxy;

    const inputValues = [11, 22, 33], inputValues2 = [12, 23, 34];

    beforeEach(async function() {
        arraySimpleV1a = await ArraySimpleV1a.new();
        arraySimpleV2a = await ArraySimpleV2a.new();
        arraySimpleV2a_ExtraValue = await ArraySimpleV2a_ExtraValue.new();
        proxy = await Proxy.new(arraySimpleV1a.address);
        arraySimplebyProxy = ArraySimpleV1a.at(proxy.address);
        arraySimpleV2a_ExtraValuebyProxy = ArraySimpleV2a_ExtraValue.at(proxy.address);
    })

    function parseBigNumberArray(bnArray) {
        for (let i = 0; i < bnArray.length; i++) {
            bnArray[i] = bnArray[i].toNumber();
        }
    }

    it('should be able to upgrade to new fixed size array function', async function () {
        await arraySimplebyProxy.setValues(inputValues)
        let values = await arraySimplebyProxy.getValues.call()
        parseBigNumberArray(values)
        assert.deepEqual(values, inputValues, "Not equal to inputValues")

        await arraySimplebyProxy.upgradeTo(arraySimpleV2a.address)
        values = await arraySimplebyProxy.getValues.call()
        parseBigNumberArray(values)
        assert.deepEqual(values, inputValues, "Not equal to inputValues")

        await arraySimplebyProxy.setValues(inputValues2)
        values = await arraySimplebyProxy.getValues.call()
        parseBigNumberArray(values)
        assert.deepEqual(values, [1, 2, 3], "Not equal to constant defined in function")
    })

    it('should not be able to use ABI for function that accesses storage that does not exist', async function () {
        try {
            await arraySimpleV2a_ExtraValuebyProxy.setValues([1, 2, 3, 4]);
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "upgradeTo() can only be called by the proxy owner")
        }
    })

    it('should not be able to upgrade to function that increases fixed array size', async function () {
        await arraySimplebyProxy.upgradeTo(arraySimpleV2a_ExtraValue.address)
        await arraySimpleV2a_ExtraValuebyProxy.setValues([1, 2, 3, 4]);

        let values = await arraySimplebyProxy.getValues.call()
        parseBigNumberArray(values)
        assert.deepEqual(values, [1, 2, 3], "Should only equal the first 3 values of the input")
    })
})
