import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../store/actionTypes';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Component from '../../component';
import Config from '../../config';
import Utils from '../../utils';

export default PersonalDetails = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState('');
    const [imagePickerPopup, setImagePickerPopup] = useState(false)
    const [dob, setDob] = useState('initial');
    const [originalDob, setOriginalDob] = useState('');
    const [city, setCity] = useState('initial');
    const [cityID, setCityID] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('initial');
    const [stateID, setStateID] = useState('');
    const [showCityModal, setShowCityModal] = useState(false)
    const [showStateyModal, setShowStateModal] = useState(false)
    const [date, setDate] = useState();
    const [maximumDate, setMaximumDate] = useState(null);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const userData = useSelector(state => state.reducer.userProfile);
    const userData1 = useSelector(state => state.reducer.userData)
    const userToken = useSelector(state => state.reducer.userToken)
    const userRole = useSelector(state => state.reducer.userRole)
    useEffect(() => {
        var newDate = new Date();
        newDate.setFullYear(newDate.getFullYear() - 18)
        setMaximumDate(newDate);
        console.log('personalProfile', JSON.stringify(userData));

        if (!!userData.photo) {
            setProfileImage(userData.photo)
        }
        if (!!userData.email) {
            setEmail(userData.email)
        }
        if (!!userData.phone) {
            setMobile(userData.phone)
        }
        if (!!userData.dob) {
            setDob(moment(userData.dob, 'YYYY-MM-DD').format('DD-MM-YYYY'))
            setOriginalDob(userData.dob)
            setDate(new Date(moment(userData.dob, 'YYYY-MM-DD').format()))
        }
        if (!!userData.state) {
            setState(userData.state)
            setStateID(userData.state_id)
        }
        if (!!userData.city) {
            setCity(userData.city)
            setCityID(userData.city_id)
        }
    }, [])

    const handleConfirm = (date) => {
        var newDate = new Date();
        newDate.setFullYear(newDate.getFullYear() - 18);

        setIsDatePickerVisible(Platform.OS === 'ios')
        if (newDate > date) {
            setOriginalDob(moment(date).format('YYYY-MM-DD'));
            setDob(moment(date).format('DD-MM-YYYY'))
            setDate(date)
        } else {
            setOriginalDob(moment(newDate).format('YYYY-MM-DD'));
            setDob(moment(newDate).format('MM-DD-YYYY'))
            setDate(newDate)
        }

        setIsDatePickerVisible(false)
    };

    const validations = () => {

        if (dob == 'initial') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_DOB, 2);
            return false;
        }
        if (city == 'initial') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_CITY, 2);
            return false;
        }
        if (state == 'initial') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_STATE, 2);
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
        return true;
    }

    const onSubmitPress = async () => {
        if (validations()) {
            // let payload = {
            //     token: userToken,
            //     user_id: userData1.user_id,
            //     dob: originalDob,
            //     state_id: stateID,
            //     city_id: cityID,
            //     phone: mobile.trim(),
            //     // email: email.trim(),
            // }
            // if (email != '') {
            //     payload.email = email.trim();
            // }
            // if (profileImage != '') {
            //     payload.photo = { uri: profileImage, name: `user_${userData1.user_id}_profile_image.jpg`, type: 'image/jpeg' };
            // }
            let formData = new FormData()
            let formData1 = new FormData()
            formData.append('token', userToken)
            formData.append('user_id', userData1.user_id)

            formData.append('dob', originalDob,)
            formData.append('state_id', stateID)
            formData.append('city_id', cityID)
            formData.append('phone', mobile.trim())
            if (email != '') {
                formData.append('email', email.trim())
            }
            if (profileImage != '') {
                if (profileImage.substr(0, 4) != 'http') {
                    formData1.append('token', userToken)
                    formData1.append('user_id', userData1.user_id)
                    formData1.append('photo', { uri: profileImage, name: `user_${userData1.user_id}_profile_image.jpg`, type: 'image/jpeg' })
                }
            }
            const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.UPDATE_PROFILE, formData, { 'Content-Type': 'multipart/form-data' })
            if (data) {
                const data1 = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.UPDATE_PROFILE_PICTURE, formData1, { 'Content-Type': 'multipart/form-data' })
                if (data1) {
                    // dispatch({ type: types.USER_PROFILE, payload: data.data });
                    await updateProfileData()
                    Utils.Method.showToast('Personal Details', 'Updated or Save Successfully!', 1);
                    navigation.pop()
                }

            }
        }
    }

    const updateProfileData = async () => {
        const payload = {
            token: userToken,
            user_id: userData1.user_id,
        }
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_PROFILE, JSON.stringify(payload), {});
        console.log(JSON.stringify(data));
        if (data.data) {
            dispatch({ type: types.USER_PROFILE, payload: data.data });

        }
    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.PERSONAL_DETAILS}
                leftButtonPress={() => {
                    navigation.pop();
                }}
            />
            <ScrollView style={Styles.contentContainer}>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setImagePickerPopup(true);
                    }}
                    style={Styles.profilePicMainView}>
                    <View style={Styles.profilePicView}>
                        <Image
                            source={profileImage ? { uri: profileImage } : Config.Images.USER}
                            style={Styles.profilePic}
                            resizeMode='cover'
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setIsDatePickerVisible(true)
                    }}
                >
                    <Component.CustomTextInputHintText
                        value={dob}
                        placeholder={Config.Strings.String_en.DOB}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setShowStateModal(true)
                    }}
                >
                    <Component.CustomTextInputHintText
                        value={state}
                        placeholder={Config.Strings.String_en.STATE}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        setShowCityModal(true)
                    }}
                >
                    <Component.CustomTextInputHintText
                        value={city}
                        placeholder={Config.Strings.String_en.CITY}
                    />
                </TouchableOpacity>
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.PHONE}
                    value={mobile}
                    onChangeText={value => setMobile(value)}
                    keyboardType={'number-pad'}
                    maxLength={10}
                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.EMAIL}
                    value={email}
                    onChangeText={value => setEmail(value)}
                    keyboardType={'email-address'}
                />
                <Component.CustomButton
                    label={Config.Strings.String_en.SAVE}
                    onPress={() => {
                        onSubmitPress();
                    }}
                    containerStyle={Styles.signupButton}
                />
            </ScrollView>
            <Component.ListModal
                modalVisible={showCityModal}
                dropDownLabel={Config.Strings.String_en.CITY}
                onChangeText={(item) => {
                    console.log(item);
                    setCity(item.value)
                    setCityID(item.data);
                }}
                closeModal={() => {
                    setShowCityModal(false)
                }}
            />
            <Component.ListModal
                modalVisible={showStateyModal}
                dropDownLabel={Config.Strings.String_en.STATE}
                onChangeText={(item) => {
                    console.log(item);
                    setState(item.value)
                    setStateID(item.data);
                }}
                closeModal={() => {
                    setShowStateModal(false)
                }}
                isCity={false}
            />
            <DateTimePickerModal
                date={date}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => { setIsDatePickerVisible(false) }}
                maximumDate={maximumDate}
            />
            <Component.ImagePickerPopup
                showOption={imagePickerPopup}
                cropping={true}
                onGetImage={(image) => {
                    setImagePickerPopup(false);
                    // setImageURI(image.path)
                    setProfileImage(image.path);
                }}
                closePopup={() => {
                    setImagePickerPopup(false);
                }}
            />
        </View>
    );
}
