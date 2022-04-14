import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import Styles from './Styles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Component from '../../component';
import Config from '../../config';
import Utils from '../../utils';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../store/actionTypes';

export default CustomerDetails = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [customerName, setCustomerName] = useState('');
    const [city, setCity] = useState('initial');
    const [cityID, setCityID] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('initial');
    const [stateID, setStateID] = useState('');
    const [propertyType, setPropertyType] = useState('initial');
    const [proposedQTY, setProposedQTY] = useState('');
    const [selectedProducts, setSelectedProducts] = useState('')
    const [showCityModal, setShowCityModal] = useState(false)
    const [showStateyModal, setShowStateModal] = useState(false)
    const userData = useSelector(state => state.reducer.userProfile);
    const userData1 = useSelector(state => state.reducer.userData)
    const userToken = useSelector(state => state.reducer.userToken)
    const userRole = useSelector(state => state.reducer.userRole)
    const pickerRef = useRef();

    const openPicker = () => {
        if (Platform.OS == 'ios') {
            pickerRef.current.togglePicker()
        } else {
            pickerRef.current.focus();
        }
    }

    useEffect(() => {
        if (!!route.params && !!route.params.data) {
            console.log('Client Directory');
            setCustomerName(route.params.data.CustomerDetails.name)
            setCity(route.params.data.CustomerDetails.city_name)
            setCityID(route.params.data.CustomerDetails.city_id)
            setState(route.params.data.CustomerDetails.state_name)
            setStateID(route.params.data.CustomerDetails.state_id)
            setMobile(route.params.data.CustomerDetails.phone)
            setEmail(route.params.data.CustomerDetails.email)
            setPropertyType(route.params.data.CustomerDetails.property_type)
            setProposedQTY(route.params.data.CustomerDetails.proposed_qty)
            setSelectedProducts(route.params.data.selectedProducts)
        }
        if (!!route.params && !!route.params.selectedProducts) {
            // console.log('Product List', route.params.selectedProducts);
            setSelectedProducts(route.params.selectedProducts)
        }

    }, [route.params])

    const validations = () => {
        if (customerName.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_CUSTOMER_NAME, 2);
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
        if (email.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_EMAIL, 2);
            return false;
        }
        if (!Utils.Method.emailValidation(email.trim())) {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_VALID_EMAIL, 2);
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
        if (propertyType == 'initial') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_PROPERTY_TYPE, 2);
            return false;
        }
        if (proposedQTY.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_PROPOSED_QTY, 2);
            return false;
        }
        return true;
    }

    const onSubmitPress = async () => {
        if (validations()) {
            let payload = {
                name: customerName.trim(),
                email: email.trim(),
                phone: mobile.trim(),
                state_id: stateID,
                city_id: cityID,
                property_type: propertyType,
                proposed_qty: proposedQTY.trim(),
                product_id: selectedProducts,
                token: userToken,
                user_id: userData1.user_id,

            }
            const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.POST_RECOMMENDATION, JSON.stringify(payload), {})
            if (data) {
                Utils.Method.showToast('Post Recommendation', 'Recommendation Posted Successfully.', 1);
                navigation.pop()
                navigation.pop()
                // navigation.navigate('LaminateList', {
                //     sucess: true
                // })
            }
        }
    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.CUSTOMER_DETAILS}
                leftButtonPress={() => {
                    navigation.pop();
                }}
            />
            <ScrollView style={Styles.contentContainer}>
                {userRole == Config.Constants.ARCHITECT &&
                    <Component.CustomButton
                        label={Config.Strings.String_en.CLIENT_DIRECTORY}
                        onPress={() => {
                            navigation.navigate('ClientDirectory', {
                                selectedProducts: selectedProducts
                            })
                        }}
                        containerStyle={Styles.DirectoryButton}
                    />
                }

                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.CUSTOMER_NAME}
                    value={customerName}
                    onChangeText={value => setCustomerName(value)}
                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.MOBILE_NO}
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
                {/* <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.CITY}
                    value={city}
                    onChangeText={value => setCity(value)}
                /> */}
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
                        openPicker()
                    }}
                >
                    <Component.CustomTextInputHintText
                        value={propertyType}
                        placeholder={Config.Strings.String_en.PROPERTY_TYPE}
                    />
                </TouchableOpacity>
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.PROPOSED_QTY}
                    value={proposedQTY}
                    onChangeText={value => setProposedQTY(value)}
                    keyboardType={'number-pad'}
                />
                <Component.CustomButton
                    label={Config.Strings.String_en.SUBMIT}
                    onPress={() => {
                        onSubmitPress();
                    }}
                    containerStyle={Styles.signupButton}
                />
            </ScrollView>
            <View style={{ height: 0, width: 0, alignSelf: 'flex-end', }}>
                {Platform.OS == 'ios' ?
                    <RNPickerSelect
                        ref={pickerRef}
                        value={propertyType}
                        onValueChange={(value) => {
                            if (value) {
                                setPropertyType(value)
                            } else {
                                setPropertyType('initial')
                            }
                        }}
                        items={[
                            { label: 'Bungalow', value: 'Bungalow' },
                            { label: 'Apartment Shop', value: 'Apartment Shop' },
                            { label: 'Hotel', value: 'Hotel' },
                            { label: 'Framhouse & Others', value: 'Framhouse & Others' },
                        ]}
                    />
                    :
                    <Picker
                        ref={pickerRef}
                        mode='dialog'
                        selectedValue={propertyType}
                        style={{ height: 0, width: 0, alignSelf: 'flex-end', }}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue) {
                                setPropertyType(itemValue)
                            } else {
                                setPropertyType('initial')
                            }
                        }}>
                        <Picker.Item label="Select an item..." value="" />
                        <Picker.Item label="Bungalow" value="Bungalow" />
                        <Picker.Item label="Apartment Shop" value="Apartment Shop" />
                        <Picker.Item label="Hotel" value="Hotel" />
                        <Picker.Item label={'Framhouse & Others'} value={"Framhouse & Others"} />
                    </Picker>
                }
            </View>
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
        </View>
    );
}
