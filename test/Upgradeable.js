// const TokenV1_Init = artifacts.require('TokenV1_Init')
// const TokenV1_Balance = artifacts.require('TokenV1_Balance')
// const TokenV1_Transfer= artifacts.require('TokenV1_Transfer')
// const TokenV1_Mint = artifacts.require('TokenV1_Mint')
// const TokenV1_Interface = artifacts.require('TokenV1_Interface')
//
// const TokenV1_1_Mint = artifacts.require('TokenV1_1_Mint')
//
// const Registry = artifacts.require('Registry')
const Proxy = artifacts.require('Proxy')
const UintSimpleV1_Interface = artifacts.require('UintSimpleV1_Interface')
const UintSimpleV1_Logic = artifacts.require('UintSimpleV1_Logic')
const UintSimpleV2_Logic = artifacts.require('UintSimpleV2_Logic')

contract('Upgradeable', function ([sender, receiver]) {

    // let impl_v1_init,
    //     impl_v1_balance,
    //     impl_v1_transfer,
    //     impl_v1_mint,
    //     registry
    let proxy,
    uintSimpleV1,
    uintSimpleV2,
    UintSimpleV1_InterfacebyProxy,
    uintSimpleV1byProxy,
    uintSimpleV2byProxy;

    beforeEach(async function() {
        uintSimpleV1 = await UintSimpleV1_Logic.new();
        uintSimpleV2 = await UintSimpleV2_Logic.new();
        proxy = await Proxy.new(uintSimpleV1.address);
        uintSimpleV1_InterfacebyProxy = UintSimpleV1_Interface.at(proxy.address);
        uintSimpleV1byProxy = UintSimpleV1_Logic.at(proxy.address);
        uintSimpleV2byProxy = UintSimpleV2_Logic.at(proxy.address);
    })

    it('should be able to use UintSimple_V1 like any contract', async function() {
        const inputValue = 10;
        await uintSimpleV1.setValue(inputValue)
        let bigNumValue = await uintSimpleV1.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")
    })

    it('should be able to use UintSimple_V2 like any contract', async function() {
        const inputValue = 10;
        await uintSimpleV2.setValue(inputValue)
        let bigNumValue = await uintSimpleV2.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

    it('should delegate call to implementation', async function () {
        const inputValue = 10;
        await uintSimpleV1_InterfacebyProxy.setValue(inputValue)
        let bigNumValue = await uintSimpleV1_InterfacebyProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")
    })

    it('should upgrade the contract UintSimple', async function () {
        const inputValue = 10;
        await uintSimpleV1_InterfacebyProxy.setValue(inputValue)
        let bigNumValue = await uintSimpleV1_InterfacebyProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        await proxy.upgradeTo(uintSimpleV2.address)
        await uintSimpleV1_InterfacebyProxy.setValue(inputValue);
        bigNumValue = await uintSimpleV1_InterfacebyProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

    it('should upgrade the contract UintSimple using the UintSimpleV1_Logic interface', async function () {
        const inputValue = 10;
        await uintSimpleV1byProxy.setValue(inputValue)
        let bigNumValue = await uintSimpleV1byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        await proxy.upgradeTo(uintSimpleV2.address)
        await uintSimpleV1byProxy.setValue(inputValue);
        bigNumValue = await uintSimpleV1byProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

    it('should upgrade the contract UintSimple using the UintSimpleV2_Logic interface', async function () {
        const inputValue = 10;
        await uintSimpleV2byProxy.setValue(inputValue)
        let bigNumValue = await uintSimpleV2byProxy.getValue.call()
        let value = bigNumValue.toNumber();
        assert.equal(inputValue, value, "The two values should be the same")

        await proxy.upgradeTo(uintSimpleV2.address)
        await uintSimpleV2byProxy.setValue(inputValue);
        bigNumValue = await uintSimpleV2byProxy.getValue.call()
        value = bigNumValue.toNumber();
        assert.equal(inputValue*2, value, "The value in the contract should be twice the input value")
    })

})
