import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform, Modal } from 'react-native';
import Styles from './Styles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Component from '../../component';
import Config from '../../config';
import Utils from '../../utils';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../store/actionTypes';
export default BankDetails = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const [bankName, setBankName] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [ifcsCode, setIfcsCode] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountType, setAccountType] = useState('initial');
    const pickerRef = useRef();
    const userProfile = useSelector(state => state.reducer.userProfile);
    const userData = useSelector(state => state.reducer.userData)
    const userToken = useSelector(state => state.reducer.userToken)
    const [isUpdatingData, setIsUpdatingData] = useState(false);
    const [updateConfirmationModalVisible, setUpdateConfirmationModalVisible] = useState(false);

    useEffect(() => {
        if (!!userProfile.bank_name) {
            setIsUpdatingData(true)
            setBankName(userProfile.bank_name)
        }
        if (!!userProfile.account_name) {
            setAccountHolderName(userProfile.account_name)
        }
        if (!!userProfile.ifsc_code) {
            setIfcsCode(userProfile.ifsc_code)
        }
        if (!!userProfile.account_number) {
            setAccountNumber(userProfile.account_number)
        }
        if (!!userProfile.account_type) {
            setAccountType(userProfile.account_type)
        }
    }, [])

    const openPicker = () => {
        if (Platform.OS == 'ios') {
            pickerRef.current.togglePicker()
        } else {
            pickerRef.current.focus();
        }
    }

    const validations = () => {
        if (bankName.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_BANK_NAME, 2);
            return false;
        }
        if (accountHolderName.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_ACCOUNT_HOLDER, 2);
            return false;
        }
        if (ifcsCode.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_IFSC_CODE, 2);
            return false;
        }
        if (accountNumber.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_ACCOUNT_NUMBER, 2);
            return false;
        }
        if (accountType == 'initial') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_ACCOUNT_TYPE, 2);
            return false;
        }

        return true;
    }

    const onVerifyPress = async () => {
        if (validations()) {
            let payload = {
                token: userToken,
                user_id: userData.user_id,
                bank_name: bankName.trim(),
                account_name: accountHolderName.trim(),
                account_number: accountNumber.trim(),
                ifsc_code: ifcsCode.trim(),
                account_type: accountType,
            }

            const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.UPDATE_PROFILE, JSON.stringify(payload), {})
            if (data) {
                let payload1 = {
                    name: userProfile.name,
                    phone: userProfile.phone,
                    account_number: accountNumber.trim(),
                    account_type: accountType,
                    ifsc_code: ifcsCode.trim(),
                    token: userToken,
                    user_id: userData.user_id,
                }
                const data1 = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.VERIFY_BANK_ACCOUNT, JSON.stringify(payload1), {})
                if (data1) {
                    Utils.Method.showToast('Bank Details Verification', 'Bank Details Verification Done!', 1);
                }
                dispatch({ type: types.USER_PROFILE, payload: data.data });
                navigation.pop()
            }
        }
    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.BANK_DETAILS}

                leftButtonPress={() => {
                    navigation.pop();
                }}
            />
            <ScrollView style={Styles.contentContainer}>
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.BANK_NAME}
                    value={bankName}
                    onChangeText={value => setBankName(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.ACCOUNT_HOLDER_NAME}
                    value={accountHolderName}
                    onChangeText={value => setAccountHolderName(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.IFSC_CODE}
                    value={ifcsCode}
                    onChangeText={value => setIfcsCode(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.ACCOUNT_NUMBER}
                    value={accountNumber}
                    onChangeText={value => setAccountNumber(value)}
                    keyboardType={'number-pad'}
                />
                {/* <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.ACCOUNT_TYPE}
                    value={accountType}
                    onChangeText={value => setAccountType(value)}
                /> */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        openPicker()
                    }}
                >
                    <Component.CustomTextInputHintText
                        value={accountType}
                        placeholder={Config.Strings.String_en.ACCOUNT_TYPE}
                    />
                </TouchableOpacity>
                <Component.CustomButton
                    label={Config.Strings.String_en.VERIFY}
                    onPress={() => {
                        if (validations()) {
                            if (isUpdatingData) {
                                setUpdateConfirmationModalVisible(true)
                            } else {
                                onVerifyPress();
                            }
                        }

                    }}
                    containerStyle={Styles.signupButton}
                />
            </ScrollView>
            <View style={{ height: 0, width: 0, alignSelf: 'flex-end', }}>
                {Platform.OS == 'ios' ?
                    <RNPickerSelect
                        ref={pickerRef}
                        value={accountType}
                        onValueChange={(value) => {
                            if (value) {
                                setAccountType(value)
                            } else {
                                setAccountType('initial')
                            }
                        }}
                        items={[
                            { label: 'Saving', value: 'Saving' },
                            { label: 'Current', value: 'Current' },
                        ]}
                    />
                    :
                    <Picker
                        ref={pickerRef}
                        mode='dialog'
                        selectedValue={accountType}
                        style={{ height: 0, width: 0, alignSelf: 'flex-end', }}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log(itemValue);
                            if (itemValue) {
                                setAccountType(itemValue)
                            } else {
                                setAccountType('initial')
                            }
                        }}>
                        <Picker.Item label="Select an item..." value="" />
                        <Picker.Item label="Saving" value="Saving" />
                        <Picker.Item label="Current" value="Current" />
                    </Picker>
                }

            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={updateConfirmationModalVisible}>
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <Component.CustomText style={Styles.dialogTitleText}>Updating Bank Details</Component.CustomText>
                        <Component.CustomText style={Styles.descriptionTextStyle}>Are you sure you want to edit?</Component.CustomText>
                        <View style={Styles.flexRow}>
                            <Component.CustomButton
                                label={Config.Strings.String_en.NO}
                                onPress={() => {
                                    setUpdateConfirmationModalVisible(false)
                                }}
                                containerStyle={Styles.continueButton}
                            />
                            <Component.CustomButton
                                label={Config.Strings.String_en.YES}
                                onPress={() => {
                                    setUpdateConfirmationModalVisible(false)
                                    onVerifyPress();
                                }}
                                containerStyle={Styles.continueButton}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
