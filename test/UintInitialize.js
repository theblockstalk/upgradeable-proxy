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
        await uintInitializebyProxy.initialize();
    })

    it('should not initialize if the variable is set in the contract', async function () {
        console.log(INDENT, 'Note that smart contract initialization of UintInitializeV1a_NotInitialized fails!!!')

        let value = await uintInitializebyProxy.getValue.call()
        assert.equal(value.toNumber(), 0, "value should not be initialized")
    })

    it('should be initialize if the variable is set in initialize()', async function () {
        proxy = await Proxy.new(uintInitializeV1b_Initialized.address);
        uintInitializebyProxy = UintInitializeV1b_Initialized.at(proxy.address);
        await uintInitializebyProxy.initialize();

        let value = await uintInitializebyProxy.getValue.call()

        assert.equal(value.toNumber(), 111, "value should be initialized")
    })

    it('should initialize value on upgrade', async function () {
        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address)
        await uintInitializebyProxy.initialize();

        let value = await uintInitializebyProxy.getValue.call()

        assert.equal(value.toNumber(), 111, "value should be initialized")
    })

    it('should emmit EventInitialized when calling initialize()', async function () {
        proxy = await Proxy.new(uintInitializeV1a_NotInitialized.address);
        uintInitializebyProxy = UintInitializeV1a_NotInitialized.at(proxy.address);
        let initializationTx = await uintInitializebyProxy.initialize();
        let events = initializationTx.logs;
        assert.equal(events[0].event, 'EventInitialized', 'Should initialize contract on create')
        assert.equal(events[0].args.target, uintInitializeV1a_NotInitialized.address, 'Should initialize the Uint v1a contract')

        await proxy.upgradeTo(uintInitializeV1b_Initialized.address)
        initializationTx = await uintInitializebyProxy.initialize();
        events = initializationTx.logs;
        assert.equal(events[0].event, 'EventInitialized', 'Should initialize contract on upgradeTo()')
        assert.equal(events[0].args.target, uintInitializeV1b_Initialized.address, 'Should initialize the Uint v1b contract')
    })

    it('should only be able to initialize the contract through the proxy once', async function() {
        let initialized = await uintInitializebyProxy.initialized(uintInitializeV1a_NotInitialized.address);
        assert(initialized, "target uintInitializeV1a_NotInitialized should be initialized")

        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address) // upgrade to 1b
        initialized = await uintInitializebyProxy.initialized(uintInitializeV1b_Initialized.address);
        assert(!initialized, "target uintInitializeV1b_Initialized should not be initialized yet")
        await uintInitializebyProxy.initialize();
        initialized = await uintInitializebyProxy.initialized(uintInitializeV1b_Initialized.address);
        assert(initialized, "target uintInitializeV1b_Initialized should now be initialized")

        await uintInitializebyProxy.upgradeTo(uintInitializeV1a_NotInitialized.address) // revert back to v1a
        initialized = await uintInitializebyProxy.initialized(uintInitializeV1a_NotInitialized.address);
        assert(initialized, "target uintInitializeV1a_NotInitialized should be initialized ")
        try {
            await uintInitializebyProxy.initialize();
            initialized = await uintInitializebyProxy.initialized(uintInitializeV1a_NotInitialized.address);
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "should not be able to initialize again")
        }
    })

    it('should not initialize a contract values again on being upgraded to again', async function() {
        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address)
        await uintInitializebyProxy.initialize();
        await uintInitializebyProxy.upgradeTo(uintInitializeV2.address)
        await uintInitializebyProxy.initialize();
        await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address) // cannot be initialized again
        try {
            await uintInitializebyProxy.initialize();
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: revert", "should not be able to initialize again")
        }
        let value = await uintInitializebyProxy.getValue.call()
        assert.equal(value.toNumber(), 222, "value should be what was initialized by UintInitializeV2")
    })

    it('should be able to atomically initialize the contract with upgradeTo()', async function() {
        let initialized = await uintInitializebyProxy.initialized(uintInitializeV1a_NotInitialized.address);
        assert(initialized, "target uintInitializeV1a_NotInitialized should be initialized")

        let initializeTx = await uintInitializebyProxy.initialize.request();
        let initializeData = initializeTx.params[0].data;
        let initializeSignature = web3.sha3("initialize()").substring(0, 10);;
        assert.equal(initializeData, initializeSignature, "initialization data does not equal signature")

        initialized = await uintInitializebyProxy.initialized(uintInitializeV1b_Initialized.address);
        assert(!initialized, "target uintInitializeV1b_Initialized should not be initialized yet")
        
        const web3Abi = require('web3-eth-abi');
        // const web3 = uintInitializebyProxy.web3;
        const upgradeToOverloadedAbi = {
          "constant": false,
          "inputs": [
            {
              "name": "_target",
              "type": "address"
            },
            {
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
        let upgradeToTransactionData = web3Abi.encodeFunctionCall(upgradeToOverloadedAbi, [uintInitializeV1b_Initialized.address, initializeData]);
        await web3.eth.sendTransaction({from: accounts[0], to: uintInitializebyProxy.address, data: upgradeToTransactionData, value: 0});
        // await uintInitializebyProxy.upgradeTo(uintInitializeV1b_Initialized.address, initializeData) // upgrade to 1b
        initialized = await uintInitializebyProxy.initialized(uintInitializeV1b_Initialized.address);
        assert(initialized, "target uintInitializeV1b_Initialized should be initialized")

        upgradeToTransactionData = web3Abi.encodeFunctionCall(upgradeToOverloadedAbi, [uintInitializeV1a_NotInitialized.address, initializeData]);
        try {
            await web3.eth.sendTransaction({from: accounts[0], to: uintInitializebyProxy.address, data: upgradeToTransactionData, value: 0});
            // await uintInitializebyProxy.upgradeTo(uintInitializeV1a_NotInitialized.address, initializeData) // revert back to v1a
            throw new Error("This error should not happen")
        } catch (error) {
            assert.equal(error.message, "VM Exception while processing transaction: invalid opcode", "should not be able to initialize again when upgradeing")
        }

        await uintInitializebyProxy.upgradeTo(uintInitializeV1a_NotInitialized.address) // revert back to v1a

    })

})
