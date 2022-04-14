import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import Styles from './Styles';
import { CommonActions } from '@react-navigation/native';

import Component from '../../component';
import Config from '../../config';
import Utils from '../../utils';
import CustomLoader from '../../module/CustomLoader';
import Toast from 'react-native-toast-message';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../store/actionTypes';

export default Signup = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const [fullname, setFullname] = useState('');
    const [city, setCity] = useState('initial');
    const [cityID, setCityID] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [showCityModal, setShowCityModal] = useState(false)
    const userRole = useSelector(state => state.reducer.userRole)

    const validations = () => {
        if (fullname.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_FULLNAME, 2);
            return false;
        }
        if (city == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_CITY, 2);
            return false;
        }
        if (mobile.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_MOBILE_NO, 2);
            return false;
        }
        if (mobile.trim().length < 10) {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_VALID_MOBILE_NO, 2);
            return false;
        }
        if (userRole == Config.Constants.ARCHITECT) {
            if (email.trim() == '') {
                Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_EMAIL, 2);
                return false;
            }
        }
        if (email != '') {
            if (!Utils.Method.emailValidation(email.trim())) {
                Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_VALID_EMAIL, 2);
                return false;
            }
        }

        if (password == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_PASSWORD, 2);
            return false;
        }
        if (confirmPassword == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_CONFIRM_PASSWORD, 2);
            return false;
        }
        if (password !== confirmPassword) {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.PASSWORD_NOT_SAME, 2);
            return false;
        }
        if (!terms) {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ACCEPT_TERMS, 2);
            return false;
        }
        return true;
    }

    const onSignupPress = async () => {
        if (validations()) {
            var payload = {
                password: password,
                // device_type: Platform.OS == 'android' ? '2' : '1',
                // device_id: '41654654',
                // device_token: 'lkahdlkajdkljad1a3ds21a32',
                phone: mobile.trim(),
                name: fullname.trim(),
                // term: '1',
                // password_confirmation: confirmPassword,
                city_id: cityID,
                type: userRole,
                // email: email.trim()
            }
            if (email != '') {
                payload.email = email.trim();
            }

            const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.SIGNUP, JSON.stringify(payload), {});
            if (data.data) {
                console.log(JSON.stringify(data));
                dispatch({ type: types.USER_DATA, payload: data.data });
                dispatch({ type: types.USER_TOKEN, payload: data.data.token });
                // Utils.UserSession.USER_DATA = data.data;
                // Utils.UserSession.USER_TOKEN = data.data.token;
                Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_USER_TOKEN, data.data.token)
                Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_ROLE, userRole)
                Utils.Method.AsyncStore.setData(Config.Constants.ASYNC_KEY_USER_DATA, JSON.stringify(data.data))
                Utils.Method.showToast('Sign-UP', 'Successfully Sign-UP!', 1);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'ArchitectDrawer' }
                        ],
                    })
                )
                // navigation.navigate('ArchitectDrawer')
            }

        }

    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <ScrollView style={Styles.contentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.pop();
                    }}
                    style={Styles.backButtonView}>
                    <Image
                        source={Config.Images.BACK}
                        resizeMode='contain'
                        style={Styles.backButtonImage}
                    />
                </TouchableOpacity>
                <Component.CustomText style={Styles.SignupText}>{Config.Strings.String_en.SIGNUP1}</Component.CustomText>
                <Component.CustomText style={Styles.filldetailsText}>{Config.Strings.String_en.FILL_DETAILS}</Component.CustomText>
                <Component.CustomText style={Styles.signingusAs}>You are signing up as {userRole == Config.Constants.ARCHITECT ? 'an' : 'a'} <Component.CustomText style={Styles.signingusAsRole}>{userRole == Config.Constants.ARCHITECT ? 'Architect' : 'Carpenter'}</Component.CustomText></Component.CustomText>
                <Component.CustomTextInput
                    image={Config.Images.USER}
                    placeholder={Config.Strings.String_en.FULL_NAME}
                    value={fullname}
                    onChangeText={(text) => {
                        setFullname(text);
                    }}
                    multiline={false}
                    autoCapitalize={'words'}
                    containerStyle={Styles.textInput}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setShowCityModal(true)
                    }}>

                    <Component.CustomTextInputText
                        value={city}
                        image={Config.Images.USER}
                        placeholder={Config.Strings.String_en.CITY}
                    />
                </TouchableOpacity>
                <Component.CustomTextInput
                    image={Config.Images.PHONE}
                    placeholder={Config.Strings.String_en.MOBILE_NO}
                    value={mobile}
                    onChangeText={(text) => {
                        setMobile(text);
                    }}
                    multiline={false}
                    containerStyle={Styles.textInput}
                    maxLength={10}
                    keyboardType={'number-pad'}
                />
                <Component.CustomTextInput
                    image={Config.Images.EMAIL}
                    placeholder={Config.Strings.String_en.EMAIL}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    multiline={false}
                    containerStyle={Styles.textInput}
                    keyboardType={'email-address'}
                />
                <Component.CustomTextInput
                    image={Config.Images.PASSWORD}
                    placeholder={Config.Strings.String_en.PASSWORD}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    multiline={false}
                    password
                    containerStyle={Styles.textInput}
                />
                <Component.CustomTextInput
                    image={Config.Images.PASSWORD}
                    placeholder={Config.Strings.String_en.CONFIRM_PASSWORD}
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text);
                    }}
                    multiline={false}
                    password
                    containerStyle={Styles.textInput}
                />
                <TouchableOpacity
                    onPress={() => {
                        setTerms(!terms);
                    }}
                    activeOpacity={0.9}
                    style={Styles.termsConditionView}>
                    <View style={[Styles.termsConditionCheckbox, { backgroundColor: terms ? Config.Theme.COLOR_PRIMARY : Config.Theme.COLOR_WHITE }]}>
                        {terms &&
                            <Image source={Config.Images.CHECK}
                                resizeMode='contain'
                                style={Styles.checkBoxImage}
                            />
                        }

                    </View>
                    <Component.CustomText style={Styles.TNCMain}>I agree to<Text onPress={() => {
                        navigation.navigate('CMSPages', {
                            title: 'Terms & Conditions',
                            url: 'http://surfica.pmcommu.in/terms-and-conditions'
                        })
                    }} style={Styles.TNC} > {'Terms & Condition'} </Text>of Surfica</Component.CustomText>
                </TouchableOpacity>
                <Component.CustomButton
                    label={Config.Strings.String_en.SIGNUP1}
                    onPress={() => {
                        onSignupPress();
                    }}
                    containerStyle={Styles.signupButton}
                />

            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    console.log('userRole', userRole);
                    navigation.navigate('Login')
                }}
                style={Styles.alreadyHaveAccountButton}>
                <Component.CustomText>{Config.Strings.String_en.ALREADY_HAVE_ACCOUNT} <Component.CustomText style={Styles.signinText}>{Config.Strings.String_en.SIGNIN}</Component.CustomText></Component.CustomText>
            </TouchableOpacity>
            <Component.ListModal
                modalVisible={showCityModal}
                dropDownLabel='City'
                onChangeText={(item) => {
                    console.log(item);
                    setCity(item.value)
                    setCityID(item.data);
                    // setSearch(item.city);
                    // setSearchOption('city')
                }}
                closeModal={() => {
                    setShowCityModal(false)
                }}
            />
        </View>
    );
}
