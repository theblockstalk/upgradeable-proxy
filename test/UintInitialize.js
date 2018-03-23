const Proxy = artifacts.require('Proxy')
const UintInitializeV1a_NotInitialized = artifacts.require('UintInitializeV1a_NotInitialized')
const UintInitializeV1b_Initialized = artifacts.require('UintInitializeV1b_Initialized')
// const DoubleUintV2a_NewStorage = artifacts.require('DoubleUintV2a_NewStorage')

const INDENT = '      ';

contract('UintInitialize', function (accounts) {

    let proxy,
    uintInitializeV1a_NotInitialized,
    uintInitializeV1b_Initialized,
    uintInitializebyProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32, inputValue4 = 43;

    beforeEach(async function() {
        uintInitializeV1a_NotInitialized = await UintInitializeV1a_NotInitialized.new();
        uintInitializeV1b_Initialized = await UintInitializeV1b_Initialized.new();

        proxy = await Proxy.new(uintInitializeV1a_NotInitialized.address);
        uintInitializebyProxy = UintInitializeV1a_NotInitialized.at(proxy.address);
    })

    it('should not initialize if the variable is set in the contract', async function () {
        let value = await uintInitializebyProxy.getValue.call()

        assert.equal(value.toNumber(), 0, "value should not be initialized")
    })

    it('should be initialize if the variable is set in initialize()', async function () {
        proxy = await Proxy.new(uintInitializeV1b_Initialized.address);
        uintInitializebyProxy = UintInitializeV1b_Initialized.at(proxy.address);

        await uintInitializebyProxy.initializePublic();
        let value = await uintInitializebyProxy.getValue.call()

        assert.equal(value.toNumber(), 111, "value should be initialized")
    })

    it('should upgrade the contract DoubleUint to version 2 with variables in reverse order', async function () {
        // console.log(INDENT, 'Note that smart contract upgrade 2a fails!!!')
        // await doubleUintV1byProxy.setValue(inputValue)
        // await doubleUintV1byProxy.setValue2(inputValue2)
        //
        // await doubleUintV1byProxy.upgradeTo(doubleUintV2a_NewStorage.address)
        //
        // let bigNumValue = await doubleUintV1byProxy.getValue.call()
        // let value = bigNumValue.toNumber();
        // assert.notEqual(inputValue, value, "The value should not be equal to inputValue, as expected")
        // assert.equal(inputValue2, value, "The value should be equal to inputValue2 as the variable order was changed")
        //
        // bigNumValue = await doubleUintV1byProxy.getValue2.call()
        // value = bigNumValue.toNumber();
        // assert.notEqual(inputValue2, value, "The value should not be equal to inputValue2, as expected")
        // assert.equal(inputValue, value, "The value should be equal to inputValue as the variable order was changed")
        //
        // await doubleUintV1byProxy.setValue(inputValue3)
        // await doubleUintV1byProxy.setValue2(inputValue4)
        //
        // bigNumValue = await doubleUintV1byProxy.getValue.call()
        // value = bigNumValue.toNumber();
        // assert.equal(inputValue3, value, "The value should be equal to inputValue3 as the variable order was changed on the setter and the getter")
        //
        // bigNumValue = await doubleUintV1byProxy.getValue2.call()
        // value = bigNumValue.toNumber();
        // assert.equal(inputValue4, value, "The value should be equal to inputValue4 as the variable order was changed on the setter and the getter")
    })

})
