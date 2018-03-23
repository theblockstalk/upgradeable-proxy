const Proxy = artifacts.require('Proxy')
const UintAdvancedV1 = artifacts.require('UintAdvancedV1')
const UintAdvancedV2a_NewFunction = artifacts.require('UintAdvancedV2a_NewFunction')
const UintAdvancedV2b_NewStorage = artifacts.require('UintAdvancedV2b_NewStorage')
const UintAdvancedV2c_NewEvent = artifacts.require('UintAdvancedV2c_NewEvent')
const UintAdvancedV2d_ReverseFunctionOrder = artifacts.require('UintAdvancedV2d_ReverseFunctionOrder')
const UintAdvancedV2e_NewStorage = artifacts.require('UintAdvancedV2e_NewStorage')
const UintAdvancedV2f_NewStorage = artifacts.require('UintAdvancedV2f_NewStorage')
const UintAdvancedV2g_OverrideFunctionGetter = artifacts.require('UintAdvancedV2g_OverrideFunctionGetter')
const UintAdvancedV2h_OverrideFunctionSetter = artifacts.require('UintAdvancedV2h_OverrideFunctionSetter')
const UintAdvancedV2i_NewFunction = artifacts.require('UintAdvancedV2i_NewFunction')
const UintAdvancedV2j_ChangeVisibility = artifacts.require('UintAdvancedV2j_ChangeVisibility')
const UintAdvancedV2k_ChangeVisibility = artifacts.require('UintAdvancedV2k_ChangeVisibility')
const UintAdvancedV2i_ChangeKeyword = artifacts.require('UintAdvancedV2i_ChangeKeyword')
const UintAdvancedV2j_NewStorage = artifacts.require('UintAdvancedV2j_NewStorage')
const UintAdvancedV2k_ChangeReturn = artifacts.require('UintAdvancedV2k_ChangeReturn')
const UintAdvancedV2l_ChangeReturn = artifacts.require('UintAdvancedV2l_ChangeReturn')
const UintAdvancedV2m_ChangeReturn = artifacts.require('UintAdvancedV2m_ChangeReturn')
const UintAdvancedV2n_ChangeReturn = artifacts.require('UintAdvancedV2n_ChangeReturn')
const UintAdvancedV2o_ChangeReturn = artifacts.require('UintAdvancedV2o_ChangeReturn')
const UintAdvancedV2p_ChangeReturn = artifacts.require('UintAdvancedV2p_ChangeReturn')
const UintAdvancedV2q_ChangeReturn = artifacts.require('UintAdvancedV2q_ChangeReturn')
const UintAdvancedV2r_ChangeReturn = artifacts.require('UintAdvancedV2r_ChangeReturn')
const UintAdvancedV2s_ChangeReturn = artifacts.require('UintAdvancedV2s_ChangeReturn')
const UintAdvancedV2t_ChangeReturn = artifacts.require('UintAdvancedV2t_ChangeReturn')

const INDENT = '        ';

contract('UintAdvanced', function (accounts) {

    let proxy,
        uintAdvancedV1,
        uintAdvancedV2a_NewFunction,
        uintAdvancedV2b_NewStorage,
        uintAdvancedV2c_NewEvent,
        uintAdvancedV2d_ReverseFunctionOrder,
        uintAdvancedV2e_NewStorage,
        uintAdvancedV2f_NewStorage,
        uintAdvancedV2g_OverrideFunctionGetter,
        uintAdvancedV2h_OverrideFunctionSetter,
        uintAdvancedV2i_NewFunction,
        uintAdvancedV2j_ChangeVisibility,
        uintAdvancedV2k_ChangeVisibility,
        uintAdvancedV2i_ChangeKeyword,
        uintAdvancedV2j_NewStorage,
        uintAdvancedV2k_ChangeReturn,
        uintAdvancedV2l_ChangeReturn,
        uintAdvancedV2m_ChangeReturn,
        uintAdvancedV2n_ChangeReturn,
        uintAdvancedV2o_ChangeReturn,
        uintAdvancedV2p_ChangeReturn,
        uintAdvancedV2q_ChangeReturn,
        uintAdvancedV2r_ChangeReturn,
        uintAdvancedV2s_ChangeReturn,
        uintAdvancedV2t_ChangeReturn;

    let uintAdvancedV1byProxy,
        uintAdvancedV2a_NewFunctionbyProxy,
        uintAdvancedV2c_NewEventbyProxy,
        uintAdvancedV2i_NewFunctionbyProxy,
        uintAdvancedV2j_NewStoragebyProxy,
        uintAdvancedV2k_ChangeReturnbyProxy,
        uintAdvancedV2l_ChangeReturnbyProxy,
        uintAdvancedV2m_ChangeReturnbyProxy,
        uintAdvancedV2n_ChangeReturnbyProxy,
        uintAdvancedV2o_ChangeReturnbyProxy,
        uintAdvancedV2p_ChangeReturnbyProxy,
        uintAdvancedV2q_ChangeReturnbyProxy,
        uintAdvancedV2r_ChangeReturnbyProxy,
        uintAdvancedV2s_ChangeReturnbyProxy,
        uintAdvancedV2t_ChangeReturnbyProxy;

    const inputValue = 10, inputValue2 = 21, inputValue3 = 32;

    beforeEach(async function() {
        uintAdvancedV1 = await UintAdvancedV1.new();
        uintAdvancedV2a_NewFunction = await UintAdvancedV2a_NewFunction.new();
        uintAdvancedV2b_NewStorage = await UintAdvancedV2b_NewStorage.new();
        uintAdvancedV2c_NewEvent = await UintAdvancedV2c_NewEvent.new();
        uintAdvancedV2d_ReverseFunctionOrder = await UintAdvancedV2d_ReverseFunctionOrder.new();
        uintAdvancedV2e_NewStorage = await UintAdvancedV2e_NewStorage.new();
        uintAdvancedV2f_NewStorage = await UintAdvancedV2f_NewStorage.new();
        uintAdvancedV2g_OverrideFunctionGetter = await UintAdvancedV2g_OverrideFunctionGetter.new();
        uintAdvancedV2h_OverrideFunctionSetter = await UintAdvancedV2h_OverrideFunctionSetter.new();
        uintAdvancedV2i_NewFunction = await UintAdvancedV2i_NewFunction.new();
        uintAdvancedV2j_ChangeVisibility = await UintAdvancedV2j_ChangeVisibility.new();
        uintAdvancedV2k_ChangeVisibility = await UintAdvancedV2k_ChangeVisibility.new();
        uintAdvancedV2i_ChangeKeyword = await UintAdvancedV2i_ChangeKeyword.new();
        uintAdvancedV2j_NewStorage = await UintAdvancedV2j_NewStorage.new();
        uintAdvancedV2k_ChangeReturn = await UintAdvancedV2k_ChangeReturn.new();
        uintAdvancedV2l_ChangeReturn = await UintAdvancedV2l_ChangeReturn.new();
        uintAdvancedV2m_ChangeReturn = await UintAdvancedV2m_ChangeReturn.new();
        uintAdvancedV2n_ChangeReturn = await UintAdvancedV2n_ChangeReturn.new();
        uintAdvancedV2o_ChangeReturn = await UintAdvancedV2o_ChangeReturn.new();
        uintAdvancedV2p_ChangeReturn = await UintAdvancedV2p_ChangeReturn.new();
        uintAdvancedV2q_ChangeReturn = await UintAdvancedV2q_ChangeReturn.new();
        uintAdvancedV2r_ChangeReturn = await UintAdvancedV2r_ChangeReturn.new();
        uintAdvancedV2s_ChangeReturn = await UintAdvancedV2s_ChangeReturn.new();
        uintAdvancedV2t_ChangeReturn = await UintAdvancedV2t_ChangeReturn.new();

        proxy = await Proxy.new(uintAdvancedV1.address);

        uintAdvancedV1byProxy = UintAdvancedV1.at(proxy.address);
        uintAdvancedV2a_NewFunctionbyProxy = UintAdvancedV2a_NewFunction.at(proxy.address);
        uintAdvancedV2c_NewEventbyProxy = UintAdvancedV2c_NewEvent.at(proxy.address);
        uintAdvancedV2i_NewFunctionbyProxy = UintAdvancedV2i_NewFunction.at(proxy.address);
        uintAdvancedV2j_NewStoragebyProxy = UintAdvancedV2j_NewStorage.at(proxy.address);
        uintAdvancedV2k_ChangeReturnbyProxy = UintAdvancedV2k_ChangeReturn.at(proxy.address);
        uintAdvancedV2l_ChangeReturnbyProxy = UintAdvancedV2l_ChangeReturn.at(proxy.address);
        uintAdvancedV2m_ChangeReturnbyProxy = UintAdvancedV2m_ChangeReturn.at(proxy.address);
        uintAdvancedV2n_ChangeReturnbyProxy = UintAdvancedV2n_ChangeReturn.at(proxy.address);
        uintAdvancedV2o_ChangeReturnbyProxy = UintAdvancedV2o_ChangeReturn.at(proxy.address);
        uintAdvancedV2p_ChangeReturnbyProxy = UintAdvancedV2p_ChangeReturn.at(proxy.address);
        uintAdvancedV2q_ChangeReturnbyProxy = UintAdvancedV2q_ChangeReturn.at(proxy.address);
        uintAdvancedV2r_ChangeReturnbyProxy = UintAdvancedV2r_ChangeReturn.at(proxy.address);
        uintAdvancedV2s_ChangeReturnbyProxy = UintAdvancedV2s_ChangeReturn.at(proxy.address);
        uintAdvancedV2t_ChangeReturnbyProxy = UintAdvancedV2t_ChangeReturn.at(proxy.address);
    })

    describe('test adding new functions to the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2a with a new function', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2a_NewFunction.address)
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            await uintAdvancedV1byProxy.setValue(inputValue2);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")

            await uintAdvancedV2a_NewFunctionbyProxy.setDoubleValue(inputValue3);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue3*2, value, "The value in the contract should be twice the input value")
        })

        it('should upgrade the contract UintAdvanced to version 2i with a new function in a different order', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2i_NewFunction.address)
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            await uintAdvancedV1byProxy.setValue(inputValue2);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")

            await uintAdvancedV2i_NewFunctionbyProxy.setDoubleValue(inputValue3);
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue3*2, value, "The value in the contract should be twice the input value")
        })
    })

    describe('test adding new storage variables to the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2b with new storage BUT THEN FAIL at changing behaviour of setter due to new storage', async function () {
            console.log(INDENT, 'Note that smart contract upgrade 2b fails!!!')
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2b_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.notEqual(inputValue+100, value, "The smart contract value should NOT be 100 more than the inputValue")
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
        })

        it('should upgrade the contract UintAdvanced to version 2e with new storage BUT THEN FAIL at changing behaviour of getter due to new storage', async function () {
            console.log(INDENT, 'Note that smart contract upgrade 2e fails!!!')
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2e_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.notEqual(inputValue+100, value, "The smart contract value should NOT be 100 more than the inputValue")
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
        })

        it('should upgrade the contract UintAdvanced to version 2f with new storage that is not used in any old or new functions', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2f_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
        })

        it('should upgrade the contract UintAdvanced to version 2j with new storage that is only used in any new functions', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2j_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")

            await uintAdvancedV2j_NewStoragebyProxy.setValue2(inputValue2);
            bigNumValue = await uintAdvancedV2j_NewStoragebyProxy.getValue2.call()
            value = bigNumValue.toNumber()
            assert.equal(inputValue2, value, "The smart contract value2 should be equal to the inputValue2")
        })

    })

    describe('test adding new events to the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2c with new event', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2c_NewEvent.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            let tx = await uintAdvancedV2c_NewEventbyProxy.setValue(inputValue2)
            let setValueLog = tx.logs[0]
            assert.equal(setValueLog.event, "EventSetValue", "First log should be EventSetValue")
            assert.equal(setValueLog.args.oldValue.toNumber(), inputValue, "The old value should be inputValue")
            assert.equal(setValueLog.args.newValue.toNumber(), inputValue2, "The new value should be inputValue2")

            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")
        })
    })

    describe('test changing the return value(s) of a function', () => {
        it('should upgrade the contract UintAdvanced to version 2k with return value of address', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2k_ChangeReturn.address)

            let returnVal = await uintAdvancedV2k_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, "0xffbf5ce297a5456a2f8fec4f5961dd0d898b29a7", "Should return the address string")
            assert.equal(typeof(returnVal), 'string', "Should be a string")
        })

        it('should upgrade the contract UintAdvanced to version 2l with return string', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2l_ChangeReturn.address)

            let returnVal = await uintAdvancedV2l_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, "I am a happy string", "Should return the string")
            assert.equal(typeof(returnVal), 'string', "Should be a string")
        })

        it('should upgrade the contract UintAdvanced to version 2m with return boolean', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2m_ChangeReturn.address)

            let returnVal = await uintAdvancedV2m_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, true, "Should return the boolean")
            assert.equal(typeof(returnVal), 'boolean', "Should be a boolean")
        })

        it('should upgrade the contract UintAdvanced to version 2n with return bytes32', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2n_ChangeReturn.address)

            let returnVal = await uintAdvancedV2n_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, '0x30ed9383ab64b27cb4b70035e743294fe1a1c83eaf57eca05033b523d1fa4261', "Should return the bytes32")
            assert.equal(typeof(returnVal), 'string', "Should be a boolean")
        })

        it('should upgrade the contract UintAdvanced to version 2o with return int', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2o_ChangeReturn.address)

            let returnVal = await uintAdvancedV2o_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal.toNumber(), -3, "Should return the integer -3")
            assert.equal(typeof(returnVal), 'object', "Should be an object")
        })

        it('should upgrade the contract UintAdvanced to version 2p with return uint8', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2p_ChangeReturn.address)

            let returnVal = await uintAdvancedV2p_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal.toNumber(), 255, "Should return the last uint: 255")
            assert.equal(typeof(returnVal), 'object', "Should be an object")
        })

        it('should upgrade the contract UintAdvanced to version 2q with return (uint, string)', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2q_ChangeReturn.address)

            let [uintValue, stringValue] = await uintAdvancedV2q_ChangeReturnbyProxy.getValue.call()
            assert.equal(uintValue.toNumber(), inputValue, "Should return the inputValue")
            assert.equal(stringValue, 'I am a happy string', "Should also return a string")
        })

        it('should upgrade the contract UintAdvanced to version 2r with return dynamic array', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2r_ChangeReturn.address)

            let returnArray = await uintAdvancedV2r_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnArray[0].toNumber(), inputValue, "Should return the inputValue in the first array slot")
            assert.equal(returnArray[1].toNumber(), 2*inputValue, "Should return the 2*inputValue in the second array slot")
        })

        it('should upgrade the contract UintAdvanced to version 2s with return fixed size array', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2s_ChangeReturn.address)

            let returnArray = await uintAdvancedV2s_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnArray[0].toNumber(), inputValue, "Should return the inputValue in the first array slot")
            assert.equal(returnArray[1].toNumber(), 2*inputValue, "Should return the 2*inputValue in the second array slot")
        })

        it('should upgrade the contract UintAdvanced to version 2t with return struct', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2t_ChangeReturn.address)

            // let returnStruct = await uintAdvancedV2t_ChangeReturnbyProxy.getValue.call()
            // console.log(returnStruct)
            // assert.equal(returnArray[0].toNumber(), inputValue, "Should return the inputValue in the first array slot")
            // assert.equal(returnArray[1].toNumber(), 2*inputValue, "Should return the 2*inputValue in the second array slot")
        })
    })

    describe('test changing the order of functions in the contract', () => {
        it('should upgrade the contract UintAdvanced to version 2d with a the order of functions reversed', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2d_ReverseFunctionOrder.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The two values should be the same")

            await uintAdvancedV1byProxy.setValue(inputValue2)
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The two values should be the same")


        })
    })

    describe('test overwride the contract functions with new logic', () => {
        it('should upgrade the contract UintAdvanced to version 2g with a function call logic updated', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2g_OverrideFunctionGetter.address)

            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue+2, value, "The values should be equal to inputValue+2")
        })

        it('should upgrade the contract UintAdvanced to version 2h with a function tx logic updated', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2h_OverrideFunctionSetter.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The values should be equal to inputValue")

            await uintAdvancedV1byProxy.setValue(inputValue2)

            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2+2, value, "The values should be equal to inputValue2+2")
        })

        it('should upgrade the contract UintAdvanced to version 2j with a public function visibility changed to external', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2j_ChangeVisibility.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The values should be equal to inputValue")

            await uintAdvancedV1byProxy.setValue(inputValue2)

            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2, value, "The values should be equal to inputValue2")
        })

        it('should upgrade the contract UintAdvanced to version 2k with a public function visibility changed to internal', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2k_ChangeVisibility.address)

            try {
                await uintAdvancedV1byProxy.setValue(inputValue2)
                throw new Error("This error should not happen")
            } catch (error) {
                assert.equal(error.message, "VM Exception while processing transaction: revert", "setValue() was able to execute")
            }

            try {
                await uintAdvancedV1byProxy.getValue.call()
                throw new Error("This error should not happen")
            } catch (error) {
                assert.equal(error.message, "VM Exception while processing transaction: revert", "getValue() was able to be called")
            }
        })

        it('should upgrade the contract UintAdvanced to version 2i with a function keyword view changed to pure', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2i_ChangeKeyword.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(666, value, "The values should be equal to 666")
        })
    })
})
