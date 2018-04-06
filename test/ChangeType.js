const Proxy = artifacts.require('Proxy')
const ChangeType_Uint = artifacts.require('ChangeType_Uint')
const ChangeType_Uint8 = artifacts.require('ChangeType_Uint8')
const ChangeType_Bool = artifacts.require('ChangeType_Bool')
const ChangeType_String = artifacts.require('ChangeType_String')
const ChangeType_Bytes32 = artifacts.require('ChangeType_Bytes32')

const INDENT = '      ';

const UINT256_MAX = web3.toBigNumber(2).pow(256).minus(1)
const UINT8_MAX = web3.toBigNumber(2).pow(8).minus(1);

contract('ChangeType', function (accounts) {

    let proxy,
    changeType_Uint,
    changeType_Uint8,
    changeType_Bool,
    changeType_String,
    changeType_Bytes32,
    changeTypebyProxy;

    beforeEach(async function() {
        changeType_Uint = await ChangeType_Uint.new();
        changeType_Uint8 = await ChangeType_Uint8.new();
        changeType_Bool = await ChangeType_Bool.new();
        changeType_String = await ChangeType_String.new();
        changeType_Bytes32 = await ChangeType_Bytes32.new();
        proxy = await Proxy.new(changeType_Uint.address);
        changeTypebyProxy = ChangeType_Uint.at(proxy.address);
    })

    it('should be able to upgrade uint to uint8 with 1', async function () {
        await changeTypebyProxy.setValue(1)
        let value = await changeTypebyProxy.getValue.call()
        assert.equal(value.toNumber(), 1, "Not equal to 1")

        await changeTypebyProxy.upgradeTo(changeType_Uint8.address)
        changeTypebyProxy = ChangeType_Uint8.at(proxy.address);
        value = await changeTypebyProxy.getValue.call()
        assert.equal(value.toNumber(), 1, "Not equal to 1")

        await changeTypebyProxy.setValue(2)
        value = await changeTypebyProxy.getValue.call()
        assert.equal(value.toNumber(), 2, "Not equal to 2")
    })

    it('should be able to upgrade uint to uint8 with UINT8_MAX', async function () {
        await changeTypebyProxy.setValue(UINT8_MAX)
        let value = await changeTypebyProxy.getValue.call()
        assert.deepEqual(value, UINT8_MAX, "Not equal to UINT8_MAX")

        await changeTypebyProxy.upgradeTo(changeType_Uint8.address)
        changeTypebyProxy = ChangeType_Uint8.at(proxy.address);
        value = await changeTypebyProxy.getValue.call()
        assert.deepEqual(value, UINT8_MAX, "Not equal to UINT8_MAX")
    })

    it('should be able to upgrade uint to uint8 with UINT256_MAX', async function () {
        await changeTypebyProxy.setValue(UINT256_MAX)
        let value = await changeTypebyProxy.getValue.call()
        assert.deepEqual(value, UINT256_MAX, "Not equal to UINT256_MAX before upgrade")

        await changeTypebyProxy.upgradeTo(changeType_Uint8.address)
        changeTypebyProxy = ChangeType_Uint8.at(proxy.address);
        value = await changeTypebyProxy.getValue.call()
        assert.notDeepEqual(value, UINT256_MAX, "Equal to UINT256_MAX after upgrade") // Note that this is not as expected
        assert.deepEqual(value, UINT8_MAX, "Not equal to UINT8_MAX after upgrade")
    })

    it('should be able to upgrade uint to bool with 1', async function () {
        await changeTypebyProxy.setValue(1)
        let value = await changeTypebyProxy.getValue.call()
        assert.equal(value, 1, "Not equal to 1 before upgrade")

        await changeTypebyProxy.upgradeTo(changeType_Bool.address)
        changeTypebyProxy = ChangeType_Bool.at(proxy.address);
        value = await changeTypebyProxy.getValue.call()
        assert.notStrictEqual(value, 1, "Equal to 1 after upgrade") // Note that this is not as expected
        assert.equal(value, true, "Not equal to true after upgrade")
    })

    it('should be able to upgrade uint to bool with 0', async function () {
        await changeTypebyProxy.setValue(0)
        let value = await changeTypebyProxy.getValue.call()
        assert.equal(value, 0, "Not equal to 0 before upgrade")

        await changeTypebyProxy.upgradeTo(changeType_Bool.address)
        changeTypebyProxy = ChangeType_Bool.at(proxy.address);
        value = await changeTypebyProxy.getValue.call()
        console.log(value)
        assert.notStrictEqual(value, 0, "Equal to 0 after upgrade") // Note that this is not as expected
        assert.equal(value, false, "Not equal to false after upgrade")
    })

    it('should be able to upgrade uint to bool with UINT256_MAX', async function () {
        await changeTypebyProxy.setValue(UINT256_MAX)
        let value = await changeTypebyProxy.getValue.call()
        assert.deepEqual(value, UINT256_MAX, "Not equal to UINT256_MAX before upgrade")

        await changeTypebyProxy.upgradeTo(changeType_Bool.address)
        changeTypebyProxy = ChangeType_Bool.at(proxy.address);
        value = await changeTypebyProxy.getValue.call()
        assert.notDeepEqual(value, UINT256_MAX, "Equal to UINT256_MAX after upgrade") // Note that this is not as expected
        assert.deepEqual(value, true, "Not equal to true after upgrade")
    })

    it('should be able to upgrade uint to string with UINT256_MAX', async function () {
        await changeTypebyProxy.setValue(UINT256_MAX)
        let value = await changeTypebyProxy.getValue.call()
        assert.deepEqual(value, UINT256_MAX, "Not equal to UINT256_MAX before upgrade")

        await changeTypebyProxy.upgradeTo(changeType_String.address)
        changeTypebyProxy = ChangeType_String.at(proxy.address);
        try {
            value = await changeTypebyProxy.getValue.call()
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "getValue() was able to be called")
        }
    })

    it('should be able to upgrade uint to bytes32 with UINT256_MAX', async function () {
        await changeTypebyProxy.setValue(UINT256_MAX)
        let value = await changeTypebyProxy.getValue.call()
        assert.deepEqual(value, UINT256_MAX, "Not equal to UINT256_MAX before upgrade")

        await changeTypebyProxy.upgradeTo(changeType_Bytes32.address)
        changeTypebyProxy = ChangeType_Bytes32.at(proxy.address);
        value = await changeTypebyProxy.getValue.call()
        assert.notDeepEqual(value, UINT256_MAX, "Equal to UINT256_MAX after upgrade") // Note that this is not as expected
        assert.deepEqual(value, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', "Not equal to 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff after upgrade")
    })
})
