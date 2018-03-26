const Proxy = artifacts.require('Proxy')
const UintEther_Normal = artifacts.require('UintEther_Normal')
const UintEther_Payable = artifacts.require('UintEther_Payable')
const UintEther_NotPayable = artifacts.require('UintEther_NotPayable')

const INDENT = '      ';

contract('UintEther', function (accounts) {

    let proxy,
    uintEther_Normal,
    uintEther_Payable,
    uintEther_NotPayable,
    uintEtherbyProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32, inputValue4 = 43;

    beforeEach(async function() {
        uintEther_Normal = await UintEther_Normal.new();
        uintEther_Payable = await UintEther_Payable.new();
        uintEther_NotPayable = await UintEther_NotPayable.new();
        proxy = await Proxy.new(uintEther_Normal.address);
        uintEtherbyProxy = UintEther_Payable.at(proxy.address);
    })

    it('should be able to send Ether to payable function in upgradeable contract', async function () {
        await uintEtherbyProxy.setValue({value:300})
        let value = await uintEtherbyProxy.getValue.call()
        assert.equal(value.toNumber(), 10, "Not equal to the constant defined in the function")
    })

    it('should be able to send Ether to payable function in upgradeable contract that sets value to be the msg.value', async function () {
        proxy = await Proxy.new(uintEther_Payable.address);
        uintEtherbyProxy = UintEther_Payable.at(proxy.address);

        await uintEtherbyProxy.setValue({value:300})
        let value = await uintEtherbyProxy.getValue.call()
        assert.equal(value.toNumber(), 300, "Not equal to the amount of Ether sent")
    })

    it('should be able to upgrade to function with payable function in upgradeable contract', async function () {
        await uintEtherbyProxy.upgradeTo(uintEther_Payable.address);

        await uintEtherbyProxy.setValue({value:300})
        let value = await uintEtherbyProxy.getValue.call()
        assert.equal(value.toNumber(), 300, "Not equal to the amount of Ether sent")
    })

    it('should not be able to send to non-payable function in upgraded contract', async function () {
        await uintEtherbyProxy.upgradeTo(uintEther_NotPayable.address);

        try {
            await uintEtherbyProxy.setValue({value:300})
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "upgradeTo() can only be called by the proxy owner")
        }
    })

    it('should be able to upgrade from non-payable to payble function', async function () {
        proxy = await Proxy.new(uintEther_NotPayable.address);
        uintEtherbyProxy = UintEther_Payable.at(proxy.address);

        try {
            await uintEtherbyProxy.setValue({value:300})
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "upgradeTo() can only be called by the proxy owner")
        }

        await uintEtherbyProxy.upgradeTo(uintEther_Payable.address);

        await uintEtherbyProxy.setValue({value:300})
        let value = await uintEtherbyProxy.getValue.call()
        assert.equal(value.toNumber(), 300, "Not equal to the amount of Ether sent")
    })

})
