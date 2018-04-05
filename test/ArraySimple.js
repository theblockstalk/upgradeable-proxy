const Proxy = artifacts.require('Proxy')
const ArraySimpleV1a = artifacts.require('ArraySimpleV1a')
const ArraySimpleV1b = artifacts.require('ArraySimpleV1b')
const ArraySimpleV2a = artifacts.require('ArraySimpleV2a')
const ArraySimpleV2a_ExtraValue = artifacts.require('ArraySimpleV2a_ExtraValue')
const ArraySimpleV2b = artifacts.require('ArraySimpleV2b')

const INDENT = '      ';

contract('ArraySimple', function (accounts) {

    let proxy,
    arraySimpleV1a,
    arraySimpleV1b,
    arraySimpleV2a,
    arraySimpleV2a_ExtraValue,
    arraySimpleV2b,
    arraySimplebyProxy,
    arraySimpleV2a_ExtraValuebyProxy;

    const inputValues = [11, 22, 33], inputValues2 = [12, 23, 34];

    beforeEach(async function() {
        arraySimpleV1a = await ArraySimpleV1a.new();
        arraySimpleV1b = await ArraySimpleV2a.new();
        arraySimpleV2a = await ArraySimpleV2a.new();
        arraySimpleV2a_ExtraValue = await ArraySimpleV2a_ExtraValue.new();
        arraySimpleV2b = await ArraySimpleV2b.new();
        proxy = await Proxy.new(arraySimpleV1a.address);
        arraySimplebyProxy = ArraySimpleV1a.at(proxy.address);
        arraySimpleV2a_ExtraValuebyProxy = ArraySimpleV2a_ExtraValue.at(proxy.address);
        arraySimpleV1bbyProxy = ArraySimpleV1b.at(proxy.address);
    })

    function parseBigNumberArray(bnArray) {
        for (let i = 0; i < bnArray.length; i++) {
            bnArray[i] = bnArray[i].toNumber();
        }
    }

    it('should be able to upgrade fixed size array function', async function () {
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
        console.log('Note that smart contract array change arraySimpleV2a_ExtraValue fails!!!')
        try {
            await arraySimpleV2a_ExtraValuebyProxy.setValues([1, 2, 3, 4]);
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "upgradeTo() can only be called by the proxy owner")
        }
    })

    it('should not be able to upgrade to function that increases fixed array size', async function () {
        console.log('Note that smart contract array change arraySimpleV2a_ExtraValue fails!!!')
        await arraySimplebyProxy.upgradeTo(arraySimpleV2a_ExtraValue.address)
        await arraySimpleV2a_ExtraValuebyProxy.setValues([1, 2, 3, 4]);

        let values = await arraySimplebyProxy.getValues.call()
        parseBigNumberArray(values)
        assert.deepEqual(values, [1, 2, 3], "Should only equal the first 3 values of the input")
    })

    it('should not be able to upgrade a fixed size array to a dynamic array', async function () {
        console.log('Note that smart contract array change arraySimpleV2b fails!!!')
        await arraySimplebyProxy.setValues(inputValues)
        let values = await arraySimplebyProxy.getValues.call()
        parseBigNumberArray(values)
        assert.deepEqual(values, inputValues, "Not equal to inputValues")

        await arraySimplebyProxy.upgradeTo(arraySimpleV2b.address)
        values = await arraySimplebyProxy.getValues.call()
        parseBigNumberArray(values)
        console.log('1', inputValues, values)
        assert.notDeepEqual(values, inputValues, "Equal to inputValues") // Note that values are not correct here

        // await arraySimplebyProxy.setValues(inputValues2)
        // values = await arraySimplebyProxy.getValues.call()
        // parseBigNumberArray(values)
        // console.log('2', '[1, 2, 3]', values)
        // assert.deepEqual(values, [1, 2, 3], "Not equal to constant defined in function")
        // throw new Error("This error should not happen");
    })

    it('should be able to upgrade a dynamic size array function', async function () {
        proxy = await Proxy.new(arraySimpleV1b.address);
        arraySimpleV1bbyProxy = ArraySimpleV1b.at(proxy.address);
        await arraySimpleV1bbyProxy.setValues(inputValues)
        let values = await arraySimpleV1bbyProxy.getValues.call()
        parseBigNumberArray(values)
        assert.deepEqual(values, inputValues, "Not equal to inputValues")

        // await arraySimpleV1bbyProxy.upgradeTo(arraySimpleV2b.address)
        // values = await arraySimplebyProxy.getValues.call()
        // parseBigNumberArray(values)
        // assert.deepEqual(values, inputValues, "Not equal to inputValues")
        //
        // await arraySimplebyProxy.setValues(inputValues2)
        // values = await arraySimplebyProxy.getValues.call()
        // parseBigNumberArray(values)
        // assert.deepEqual(values, [1, 2, 3], "Not equal to constant defined in function")
    })
})
