const Proxy = artifacts.require('Proxy')
const UpgradeCheck_CanUpgrade = artifacts.require('UpgradeCheck_CanUpgrade')
const UpgradeCheck_CannotUpgrade = artifacts.require('UpgradeCheck_CannotUpgrade')
const UpgradeCheckV2_CanUpgrade = artifacts.require('UpgradeCheckV2_CanUpgrade')
const UpgradeCheckV2b_CannotUpgrade = artifacts.require('UpgradeCheckV2b_CannotUpgrade')
const UpgradeCheckV3_CanUpgrade = artifacts.require('UpgradeCheckV3_CanUpgrade')

const INDENT = '      ';

contract('UpgradeCheck', function (accounts) {

    let proxy,
    upgradeCheck_CanUpgrade,
    upgradeCheck_CannotUpgrade,
    upgradeCheckV2_CanUpgrade,
    upgradeCheckV2a_CannotUpgrade,
    upgradeCheckV2b_CannotUpgrade,
    upgradeCheckV3_CanUpgrade,
    upgradeCheckbyProxy;

    const inputValue = 10;

    beforeEach(async function() {
        upgradeCheck_CanUpgrade = await UpgradeCheck_CanUpgrade.new();
        upgradeCheck_CannotUpgrade = await UpgradeCheck_CannotUpgrade.new();
        upgradeCheckV2_CanUpgrade = await UpgradeCheckV2_CanUpgrade.new();
        upgradeCheckV2b_CannotUpgrade = await UpgradeCheckV2b_CannotUpgrade.new();
        upgradeCheckV3_CanUpgrade = await UpgradeCheckV3_CanUpgrade.new();

        proxy = await Proxy.new(upgradeCheck_CanUpgrade.address);
        upgradeCheckbyProxy = UpgradeCheck_CanUpgrade.at(proxy.address);
    })

    it('should be able to deploy Proxy with upgradeable contract target', async function () {
        await Proxy.new(upgradeCheck_CanUpgrade.address);
    })

    it('should upgrade to an upgradeable contract', async function () {
        await proxy.upgradeTo(upgradeCheckV2_CanUpgrade.address)
    })

    it('should not be able to upgrade to itself', async function () {
        try {
            await proxy.upgradeTo(upgradeCheck_CanUpgrade.address)
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: invalid opcode", "Cannot upgrade to self")
        }
    })

    it('should not be able to deploy Proxy with non-upgradeable contract', async function () {
        try {
            await Proxy.new(upgradeCheck_CannotUpgrade.address);
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: invalid opcode", "Cannot deploy Proxy to a non-upgradeable contract")
        }
    })

    it('should not be able to upgrade to a non-upgradeable contract', async function () {
        try {
            await proxy.upgradeTo(upgradeCheck_CannotUpgrade.address)
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: invalid opcode", "Cannot upgrade to a non-upgradeable contract")
        }
    })

    it('should not be able to upgrade to a non-contract', async function () {
        try {
            await Proxy.new(accounts[1]);
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: invalid opcode", "Cannot upgrade to a non-contract")
        }
    })

    it('should only upgrade if upgradeTo(address) functions exist', async function() {
        try {
            await proxy.upgradeTo(upgradeCheckV2b_CannotUpgrade.address)
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: invalid opcode", "Cannot upgrade to a non-contract")
        }

        await proxy.upgradeTo(upgradeCheckV3_CanUpgrade.address)
    })

})
