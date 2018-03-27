const Proxy = artifacts.require('Proxy')
const UintInitializeV1a_NotInitialized = artifacts.require('UintInitializeV1a_NotInitialized')
const UintInitializeV1b_Initialized = artifacts.require('UintInitializeV1b_Initialized')
const UintInitializeV2 = artifacts.require('UintInitializeV2')

const INDENT = '      ';

contract('UintInitialize', function (accounts) {

    let proxy,
    uintInitializeV1a_NotInitialized,
    uintInitializeV1b_Initialized,
    uintInitializeV2,
    uintInitializebyProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32, inputValue4 = 43;

    beforeEach(async function() {
        uintInitializeV1a_NotInitialized = await UintInitializeV1a_NotInitialized.new();
        uintInitializeV1b_Initialized = await UintInitializeV1b_Initialized.new();
        uintInitializeV2 = await UintInitializeV2.new()

        proxy = await Proxy.new(uintInitializeV1a_NotInitialized.address);
        uintInitializebyProxy = UintInitializeV1a_NotInitialized.at(proxy.address);
    })

    it('should not initialize if the variable is set in the contract', async function () {
        console.log(INDENT, 'Note that smart contract initialization of UintInitializeV1a_NotInitialized fails!!!')

        let value = await uintInitializebyProxy.getValue.call()
        assert.equal(value.toNumber(), 0, "value should not be initialized")
    })

    it('should be initialize if the variable is set in initialize()', async function () {
        proxy = await Proxy.new(uintInitializeV1b_Initialized.address);
        uintInitializebyProxy = UintInitializeV1b_Initialized.at(proxy.address);

        let value = await uintInitializebyProxy.getValue.call()

        assert.equal(value.toNumber(), 111, "value should be initialized")
    })


    it('should initialize value on upgrade', async function () {
        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address)

        let value = await uintInitializebyProxy.getValue.call()

        assert.equal(value.toNumber(), 111, "value should be initialized")
    })

    async function getEvents(eventFilter) {
        return new Promise((res, rej) => {
            eventFilter.get(function(error, result) {
                if (error) rej(err)
                else res(result)
            })
        })
    }

    it('should emmit EventInitialized when creating Proxy and calling upgradeTo()', async function () {
        proxy = await Proxy.new(uintInitializeV1a_NotInitialized.address);
        let deploymetTx = proxy.transactionHash
        let tx = await web3.eth.getTransaction(deploymetTx)
        let deploymentBlock = tx.blockNumber
        let eventFilter = proxy.EventInitialized({target: uintInitializeV1a_NotInitialized.address},
            { fromBlock: deploymentBlock, toBlock: deploymentBlock })
        let events = await getEvents(eventFilter)
        assert.equal(events[0].event, 'EventInitialized', 'Should initialize contract on create')
        assert.equal(events[0].args.target, uintInitializeV1a_NotInitialized.address, 'Should initialize the Uint v1a contract')

        tx = await proxy.upgradeTo(uintInitializeV1b_Initialized.address)
        assert.equal(tx.logs[0].event, 'EventInitialized', 'Should initialize contract on upgradeTo()')
        assert.equal(tx.logs[0].args.target, uintInitializeV1b_Initialized.address, 'Should initialize the Uint v1b contract')
    })

    it('should only be able to initialize the contract through the proxy once', async function() {
        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address) // upgrade to 1b
        let tx = await uintInitializebyProxy.upgradeTo(uintInitializeV1a_NotInitialized.address) // revert back to v1a
        assert.equal(tx.logs.length, 1, 'There should only be one event')
        assert.equal(tx.logs[0].event, 'EventUpgrade', 'The only event should be EventUpgrade')
    })

    it('should not initialize a contract values again on being upgraded to again', async function() {
        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address)
        await uintInitializebyProxy.upgradeTo(uintInitializeV2.address)
        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address) // should not initialize again

        let value = await uintInitializebyProxy.getValue.call()
        assert.equal(value.toNumber(), 222, "value should be what was initialized by UintInitializeV2")
    })

})
