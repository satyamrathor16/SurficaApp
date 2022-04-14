import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { CommonActions } from '@react-navigation/native';
import Config from '../../config';
import Component from '../../component';
import Utils from '../../utils';
import Styles from './Styles';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../store/actionTypes';


export default Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [ResendOptButton, setResendOptButton] = useState(false);
    const [ResendOptLoader, setResendOptLoader] = useState(false);
    const [resendOtpSuccess, setResendOtpSuccess] = useState('');
    const otpRef = useRef();

    const validateFields = (isforOtp = false) => {
        if (mobile.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_MOBILE_NO, 2);
            return false;
        }
        if (mobile.trim().length < 10) {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_VALID_MOBILE_NO, 2);
            return false;
        }
        if (!isforOtp) {
            if (password.trim() == '') {
                Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_PASSWORD, 2);
                return false;
            }
        }
        return true;
    }

    const signinWithOTP = async (is_resend = false) => {
        if (!validateFields(true)) {
            return;
        }
        if (is_resend) {
            setResendOptButton(true)
            setResendOptLoader(true)
        }
        var payload = {
            phone: mobile.trim(),
        }
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.SEND_OTP, JSON.stringify(payload), {});
        setResendOptButton(false)
        setResendOptLoader(false)
        if (data) {
            if (is_resend) {
                Utils.Method.showToast('OTP Resent Success', 'OTP Resent Successfully!', 1);
            } else {
                Utils.Method.showToast('OTP Sent Success', 'OTP Sent Successfully!', 1);
                setOtpModalVisible(true)
            }

        }
    }

    const verifyOtp = async () => {
        if (otp) {
            if (otp.length >= 4 && /^\d*$/.test(otp)) {

            } else {
                setOtpError('Please enter valid OTP')
                return
            }
        } else {
            setOtpError('Please Enter the OTP')
            return;
        }
        setOtpError('')
        var payload = {
            phone: mobile.trim(),
            otp: otp
        }
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.VERIFY_OTP, JSON.stringify(payload), {});
        if (data.data) {
            dispatch({ type: types.USER_DATA, payload: data.data });
            dispatch({ type: types.USER_TOKEN, payload: data.data.token });
            dispatch({ type: types.USER_ROLE, payload: data.data.role });

            Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_USER_TOKEN, data.data.token)
            Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_ROLE, data.data.role)
            Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_USER_DATA, JSON.stringify(data.data))
            Utils.Method.showToast('Login', 'Login Successfully!', 1);
            setOtpModalVisible(false)
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'ArchitectDrawer' }
                    ],
                })
            )
        }
    }

    const signinWithPhone = async () => {
        if (!validateFields()) {
            return;
        }

        var payload = {
            phone: mobile.trim(),
            password: password.trim(),
            // device_type: Platform.OS == 'android' ? '2' : '1',
            // device_id: '246513213',
            // device_token: 'asdf45sf5s4f56s41f65',
        }
        console.log('payload', JSON.stringify(payload));
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.LOGIN_WITH_OTP, JSON.stringify(payload), {});
        if (data.data) {
            // setOtpModalVisible(true)
            dispatch({ type: types.USER_DATA, payload: data.data });
            dispatch({ type: types.USER_TOKEN, payload: data.data.token });
            dispatch({ type: types.USER_ROLE, payload: data.data.role });

            Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_USER_TOKEN, data.data.token)
            Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_ROLE, data.data.role)
            Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_USER_DATA, JSON.stringify(data.data))
            Utils.Method.showToast('Login', 'Login Successfully!', 1);
            // navigation.navigate('ArchitectDrawer')
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'ArchitectDrawer' }
                    ],
                })
            )
        }
    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <ScrollView style={Styles.contentContainer}>
                <Component.CustomText style={Styles.SignupText}>{Config.Strings.String_en.SIGNIN}</Component.CustomText>
                <Component.CustomTextInput
                    image={Config.Images.PHONE}
                    placeholder={Config.Strings.String_en.MOBILE_NO}
                    value={mobile}
                    onChangeText={(text) => {
                        setMobile(text);
                    }}
                    multiline={false}
                    containerStyle={[Styles.textInput, { marginTop: 40, }]}
                    maxLength={10}
                    keyboardType={'number-pad'}
                />
                <Component.CustomTextInput
                    image={Config.Images.PASSWORD}
                    placeholder={Config.Strings.String_en.PASSWORD}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    multiline={false}
                    containerStyle={Styles.textInput}
                    password
                />
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ForgotPassword')
                    }}
                    style={Styles.forgotPassword}>
                    <Component.CustomText>{Config.Strings.String_en.FORGOT_PASSWORD}</Component.CustomText>
                </TouchableOpacity> */}
                <Component.CustomButton
                    label={Config.Strings.String_en.SIGNIN}
                    onPress={() => {
                        // signin();
                        signinWithPhone();
                        // navigation.navigate('ArchitectDrawer')
                    }}
                    containerStyle={Styles.signupButton}
                />
                <Component.CustomButton
                    label={Config.Strings.String_en.LOGIN_WITH_OTP}
                    onPress={() => {
                        signinWithOTP();
                    }}
                    containerStyle={Styles.LoginWithOTPButton}
                />
            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('SelectRole')
                }}
                style={Styles.alreadyHaveAccountButton}>
                <Component.CustomText>{Config.Strings.String_en.DONT_HAVE_ACCOUNT} <Component.CustomText style={Styles.signinText}>{Config.Strings.String_en.SIGNUP1}</Component.CustomText></Component.CustomText>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={otpModalVisible}
                onShow={() => {
                    setTimeout(() => {
                        otpRef.current.focusField(0)
                    }, 300)
                    // setInterval(() => {

                    // }, 1000);
                    // console.log(otpRef);
                }}>
                <View style={Styles.centeredView}>
                    {/* <BlurView
                        style={styles.absolute}
                        blurType="dark"
                        blurAmount={2}
                    /> */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "position" : "height"}>
                        <View style={Styles.modalView}>
                            <Component.CustomText style={Styles.dialogTitleText}>Enter Verification Code</Component.CustomText>
                            <Component.CustomText style={Styles.descriptionTextStyle}>{'Enter 4 digit code sent to your mobile device'}</Component.CustomText>
                            <View style={Styles.otpTextContainer}>

                                <OTPInputView
                                    style={Styles.otpTextContainer}
                                    pinCount={4}
                                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                    onCodeChanged={code => { setOtp(code) }}
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={Styles.optTextInput}
                                    codeInputHighlightStyle={Styles.optTextInputHighlighted}
                                    keyboardType="number-pad"
                                    onCodeFilled={(code) => {
                                        // console.log(`Code is ${code}, you are good to go!`)
                                    }}
                                    ref={otpRef}
                                />

                                {/* <OtpInputs
                                        clearTextOnFocus
                                        handleChange={(code) => setOtp(code)}
                                        keyboardType="number-pad"
                                        numberOfInputs={4}
                                        selectTextOnFocus={false}
                                        inputContainerStyles={Styles.optTextInput}
                                        inputStyles={Styles.otpInputStyle}
                                        ref={otpRef}
                                    /> */}
                            </View>
                            {otpError != '' &&
                                <Component.CustomText style={Styles.NumberError}>{otpError}</Component.CustomText>
                            }

                            <Component.CustomButton
                                label={Config.Strings.String_en.SUBMIT}
                                onPress={() => {
                                    // setOtpError('')
                                    // setMobileNumberError('')
                                    verifyOtp()
                                }}
                                containerStyle={Styles.continueButton}
                            // disable={}
                            />
                            <TouchableOpacity
                                disabled={ResendOptButton}
                                onPress={() => {
                                    signinWithOTP(true);
                                }}
                                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}
                            >
                                <Component.CustomText style={Styles.resendButton}>RESEND</Component.CustomText>
                                {ResendOptLoader &&
                                    <ActivityIndicator color={Config.Theme.COLOR_PRIMARY} size='small' />
                                }

                            </TouchableOpacity>
                            {resendOtpSuccess != '' &&
                                <Component.CustomText textStyle={Styles.otpSuccess}>{resendOtpSuccess}</Component.CustomText>
                            }
                            <TouchableOpacity
                                style={Styles.cancelSelectedItemButton}
                                onPress={() => {
                                    // setMobileNumber('')
                                    setOtp('')
                                    setOtpError('')
                                    // setMobileNumberError('')
                                    // setNumberVerifyDialogVisible(false)
                                    // setSocialSignupProcess(false);
                                    // setResendOtpSuccess('')
                                    setOtpModalVisible(false)
                                }}>
                                <Image
                                    source={Config.Images.CANCEL}
                                    resizeMode='contain'
                                    style={Styles.modalCancelImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </View>
    );
}
