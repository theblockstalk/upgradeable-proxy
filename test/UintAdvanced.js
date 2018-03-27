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
const UintAdvancedV2l_ChangeKeyword = artifacts.require('UintAdvancedV2l_ChangeKeyword')
const UintAdvancedV2m_NewStorage = artifacts.require('UintAdvancedV2m_NewStorage')
const UintAdvancedV2n_ChangeReturn = artifacts.require('UintAdvancedV2n_ChangeReturn')
const UintAdvancedV2o_ChangeReturn = artifacts.require('UintAdvancedV2o_ChangeReturn')
const UintAdvancedV2p_ChangeReturn = artifacts.require('UintAdvancedV2p_ChangeReturn')
const UintAdvancedV2q_ChangeReturn = artifacts.require('UintAdvancedV2q_ChangeReturn')
const UintAdvancedV2r_ChangeReturn = artifacts.require('UintAdvancedV2r_ChangeReturn')
const UintAdvancedV2s_ChangeReturn = artifacts.require('UintAdvancedV2s_ChangeReturn')
const UintAdvancedV2t_ChangeReturn = artifacts.require('UintAdvancedV2t_ChangeReturn')
const UintAdvancedV2u_ChangeReturn = artifacts.require('UintAdvancedV2u_ChangeReturn')
const UintAdvancedV2v_ChangeReturn = artifacts.require('UintAdvancedV2v_ChangeReturn')
const UintAdvancedV2w_ChangeReturn = artifacts.require('UintAdvancedV2w_ChangeReturn')
const UintAdvancedV2x_Overloaded = artifacts.require('UintAdvancedV2x_Overloaded')
const UintAdvancedV2y_Overloaded = artifacts.require('UintAdvancedV2y_Overloaded')

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
        uintAdvancedV2l_ChangeKeyword,
        uintAdvancedV2m_NewStorage,
        uintAdvancedV2n_ChangeReturn,
        uintAdvancedV2o_ChangeReturn,
        uintAdvancedV2p_ChangeReturn,
        uintAdvancedV2q_ChangeReturn,
        uintAdvancedV2r_ChangeReturn,
        uintAdvancedV2s_ChangeReturn,
        uintAdvancedV2t_ChangeReturn,
        uintAdvancedV2u_ChangeReturn,
        uintAdvancedV2v_ChangeReturn,
        uintAdvancedV2w_ChangeReturn,
        uintAdvancedV2x_Overloaded,
        uintAdvancedV2y_Overloaded;

    let uintAdvancedV1byProxy,
        uintAdvancedV2a_NewFunctionbyProxy,
        uintAdvancedV2c_NewEventbyProxy,
        uintAdvancedV2i_NewFunctionbyProxy,
        uintAdvancedV2m_NewStoragebyProxy,
        uintAdvancedV2n_ChangeReturnbyProxy,
        uintAdvancedV2o_ChangeReturnbyProxy,
        uintAdvancedV2p_ChangeReturnbyProxy,
        uintAdvancedV2q_ChangeReturnbyProxy,
        uintAdvancedV2r_ChangeReturnbyProxy,
        uintAdvancedV2s_ChangeReturnbyProxy,
        uintAdvancedV2t_ChangeReturnbyProxy,
        uintAdvancedV2u_ChangeReturnbyProxy,
        uintAdvancedV2v_ChangeReturnbyProxy,
        uintAdvancedV2w_ChangeReturnbyProxy,
        uintAdvancedV2x_OverloadedbyProxy,
        uintAdvancedV2y_OverloadedbyProxy;

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
        uintAdvancedV2l_ChangeKeyword = await UintAdvancedV2l_ChangeKeyword.new();
        uintAdvancedV2m_NewStorage = await UintAdvancedV2m_NewStorage.new();
        uintAdvancedV2n_ChangeReturn = await UintAdvancedV2n_ChangeReturn.new();
        uintAdvancedV2o_ChangeReturn = await UintAdvancedV2o_ChangeReturn.new();
        uintAdvancedV2p_ChangeReturn = await UintAdvancedV2p_ChangeReturn.new();
        uintAdvancedV2q_ChangeReturn = await UintAdvancedV2q_ChangeReturn.new();
        uintAdvancedV2r_ChangeReturn = await UintAdvancedV2r_ChangeReturn.new();
        uintAdvancedV2s_ChangeReturn = await UintAdvancedV2s_ChangeReturn.new();
        uintAdvancedV2t_ChangeReturn = await UintAdvancedV2t_ChangeReturn.new();
        uintAdvancedV2u_ChangeReturn = await UintAdvancedV2u_ChangeReturn.new();
        uintAdvancedV2v_ChangeReturn = await UintAdvancedV2v_ChangeReturn.new();
        uintAdvancedV2w_ChangeReturn = await UintAdvancedV2w_ChangeReturn.new();
        uintAdvancedV2x_Overloaded = await UintAdvancedV2x_Overloaded.new();
        uintAdvancedV2y_Overloaded = await UintAdvancedV2y_Overloaded.new();

        proxy = await Proxy.new(uintAdvancedV1.address);

        uintAdvancedV1byProxy = UintAdvancedV1.at(proxy.address);
        uintAdvancedV2a_NewFunctionbyProxy = UintAdvancedV2a_NewFunction.at(proxy.address);
        uintAdvancedV2c_NewEventbyProxy = UintAdvancedV2c_NewEvent.at(proxy.address);
        uintAdvancedV2i_NewFunctionbyProxy = UintAdvancedV2i_NewFunction.at(proxy.address);
        uintAdvancedV2m_NewStoragebyProxy = UintAdvancedV2m_NewStorage.at(proxy.address);
        uintAdvancedV2n_ChangeReturnbyProxy = UintAdvancedV2n_ChangeReturn.at(proxy.address);
        uintAdvancedV2o_ChangeReturnbyProxy = UintAdvancedV2o_ChangeReturn.at(proxy.address);
        uintAdvancedV2p_ChangeReturnbyProxy = UintAdvancedV2p_ChangeReturn.at(proxy.address);
        uintAdvancedV2q_ChangeReturnbyProxy = UintAdvancedV2q_ChangeReturn.at(proxy.address);
        uintAdvancedV2r_ChangeReturnbyProxy = UintAdvancedV2r_ChangeReturn.at(proxy.address);
        uintAdvancedV2s_ChangeReturnbyProxy = UintAdvancedV2s_ChangeReturn.at(proxy.address);
        uintAdvancedV2t_ChangeReturnbyProxy = UintAdvancedV2t_ChangeReturn.at(proxy.address);
        uintAdvancedV2u_ChangeReturnbyProxy = UintAdvancedV2u_ChangeReturn.at(proxy.address);
        uintAdvancedV2v_ChangeReturnbyProxy = UintAdvancedV2v_ChangeReturn.at(proxy.address);
        uintAdvancedV2w_ChangeReturnbyProxy = UintAdvancedV2w_ChangeReturn.at(proxy.address);
        uintAdvancedV2x_OverloadedbyProxy = UintAdvancedV2x_Overloaded.at(proxy.address);
        uintAdvancedV2y_OverloadedbyProxy = UintAdvancedV2y_Overloaded.at(proxy.address);

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
        it('should upgrade the contract UintAdvanced to version 2b with new storage with changed setter', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2b_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")

            await uintAdvancedV1byProxy.setValue(inputValue2)
            bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            value = bigNumValue.toNumber();
            assert.equal(inputValue2+100, value, "The smart contract value should be equal to the inputValue2+100")


        })

        it('should upgrade the contract UintAdvanced to version 2e with new storage with changed getter', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2e_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.equal(inputValue+100, value, "The smart contract value should be equal to the inputValue+100")
        })

        it('should upgrade the contract UintAdvanced to version 2f with new storage that is not used in any old or new functions', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2f_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")
        })

        it('should upgrade the contract UintAdvanced to version 2m with new storage that is only used in any new functions', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2m_NewStorage.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber()
            assert.equal(inputValue, value, "The smart contract value should be equal to the inputValue")

            await uintAdvancedV2m_NewStoragebyProxy.setValue2(inputValue2);
            bigNumValue = await uintAdvancedV2m_NewStoragebyProxy.getValue2.call()
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
        it('should upgrade the contract UintAdvanced to version 2n with return value of address', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2n_ChangeReturn.address)

            let returnVal = await uintAdvancedV2n_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, "0xffbf5ce297a5456a2f8fec4f5961dd0d898b29a7", "Should return the address string")
            assert.equal(typeof(returnVal), 'string', "Should be a string")
        })

        it('should upgrade the contract UintAdvanced to version 2o with return string', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2o_ChangeReturn.address)

            let returnVal = await uintAdvancedV2o_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, "I am a happy string", "Should return the string")
            assert.equal(typeof(returnVal), 'string', "Should be a string")
        })

        it('should upgrade the contract UintAdvanced to version 2p with return boolean', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2p_ChangeReturn.address)

            let returnVal = await uintAdvancedV2p_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, true, "Should return the boolean")
            assert.equal(typeof(returnVal), 'boolean', "Should be a boolean")
        })

        it('should upgrade the contract UintAdvanced to version 2q with return bytes32', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2q_ChangeReturn.address)

            let returnVal = await uintAdvancedV2q_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal, '0x30ed9383ab64b27cb4b70035e743294fe1a1c83eaf57eca05033b523d1fa4261', "Should return the bytes32")
            assert.equal(typeof(returnVal), 'string', "Should be a boolean")
        })

        it('should upgrade the contract UintAdvanced to version 2r with return int', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2r_ChangeReturn.address)

            let returnVal = await uintAdvancedV2r_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal.toNumber(), -3, "Should return the integer -3")
            assert.equal(typeof(returnVal), 'object', "Should be an object")
        })

        it('should upgrade the contract UintAdvanced to version 2s with return uint8', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2s_ChangeReturn.address)

            let returnVal = await uintAdvancedV2s_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnVal.toNumber(), 255, "Should return the last uint: 255")
            assert.equal(typeof(returnVal), 'object', "Should be an object")
        })

        it('should upgrade the contract UintAdvanced to version 2t with return (uint, string)', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2t_ChangeReturn.address)

            let [uintValue, stringValue] = await uintAdvancedV2t_ChangeReturnbyProxy.getValue.call()
            assert.equal(uintValue.toNumber(), inputValue, "Should return the inputValue")
            assert.equal(stringValue, 'I am a happy string', "Should also return a string")
        })

        it('should upgrade the contract UintAdvanced to version 2u with return dynamic array', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2u_ChangeReturn.address)

            let returnArray = await uintAdvancedV2u_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnArray[0].toNumber(), inputValue, "Should return the inputValue in the first array slot")
            assert.equal(returnArray[1].toNumber(), 2*inputValue, "Should return the 2*inputValue in the second array slot")
        })

        it('should upgrade the contract UintAdvanced to version 2v with return fixed size array', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2v_ChangeReturn.address)

            let returnArray = await uintAdvancedV2v_ChangeReturnbyProxy.getValue.call()
            assert.equal(returnArray[0].toNumber(), inputValue, "Should return the inputValue in the first array slot")
            assert.equal(returnArray[1].toNumber(), 2*inputValue, "Should return the 2*inputValue in the second array slot")
        })

        it('should upgrade the contract UintAdvanced to version 2w with return struct', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2w_ChangeReturn.address)

            // let returnStruct = await uintAdvancedV2w_ChangeReturnbyProxy.getValue.call()
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

    describe('test overwriting the contract functions with new logic', () => {
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

        it('should upgrade the contract UintAdvanced to version 2l with a function keyword view changed to pure', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2l_ChangeKeyword.address)

            let bigNumValue = await uintAdvancedV1byProxy.getValue.call()
            let value = bigNumValue.toNumber();
            assert.equal(666, value, "The values should be equal to 666")
        })

        it('should upgrade the contract UintAdvanced from version 2l with a function keyword pure changed to view', async function () {
            proxy = await Proxy.new(uintAdvancedV2l_ChangeKeyword.address);
            uintAdvancedV1byProxy = UintAdvancedV1.at(proxy.address);
            await uintAdvancedV1byProxy.setValue(inputValue)
            let value = await uintAdvancedV1byProxy.getValue.call()
            assert.equal(666, value.toNumber(), "The values should be equal to 666")

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV1.address)

            value = await uintAdvancedV1byProxy.getValue.call()
            assert.equal(inputValue, value.toNumber(), "The values should be equal to inputValue")
        })
    })

    describe('test overloading the contract functions', () => {
        it('should upgrade the contract UintAdvanced to version 2x with overloaded functions', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2x_Overloaded.address)

            // let value = await uintAdvancedV2x_OverloadedbyProxy.getValue.call()
            // assert.equal(inputValue, value.toNumber(), "The value should be equal to inputValue")

            // value = await uintAdvancedV2x_OverloadedbyProxy.getValue.call(inputValue2)
            // assert.equal(inputValue+inputValue2, value.toNumber(), "The values should be equal to inputValue+inputValue2")
            //
            // await uintAdvancedV2x_OverloadedbyProxy.setValue(inputValue2, inputValue3)
            //
            // value = await uintAdvancedV2x_OverloadedbyProxy.getValue.call()
            // assert.equal(inputValue2+inputValue3, value.toNumber(), "The values should be equal to inputValue2+inputValue3")
        })

        it('should upgrade the contract UintAdvanced to version 2y with only overloaded functions', async function () {
            await uintAdvancedV1byProxy.setValue(inputValue)

            await uintAdvancedV1byProxy.upgradeTo(uintAdvancedV2y_Overloaded.address)

            try {
                await uintAdvancedV1byProxy.getValue.call()
                throw new Error("This error should not happen")
            } catch (error) {
                assert.equal(error.message, "VM Exception while processing transaction: revert", "getValue() is no longer a function")
            }

            try {
                await uintAdvancedV1byProxy.setValue(10)
                throw new Error("This error should not happen")
            } catch (error) {
                assert.equal(error.message, "VM Exception while processing transaction: revert", "setValue() is no longer a function")
            }

            let value = await uintAdvancedV2y_OverloadedbyProxy.getValue.call(inputValue2)
            assert.equal(inputValue+inputValue2, value.toNumber(), "The values should be equal to inputValue+inputValue2")

            await uintAdvancedV2y_OverloadedbyProxy.setValue(inputValue, inputValue2)

            value = await uintAdvancedV2y_OverloadedbyProxy.getValue.call(inputValue3)
            assert.equal(inputValue+inputValue2+inputValue3, value.toNumber(), "The values should be equal to +inputValue+inputValue2+inputValue3")
        })
    })
})
