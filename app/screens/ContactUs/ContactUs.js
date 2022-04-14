import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Linking, Platform } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import Utils from '../../utils';
import Styles from './Styles';

export default ContactUs = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const validations = () => {
        if (firstName.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_FIRST_NAME, 2);
            return false;
        }
        if (lastName.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_LAST_NAME, 2);
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
        if (message.trim() == '') {
            Utils.Method.showToast(Config.Strings.String_en.FORM_ERROR, Config.Strings.String_en.ENTER_MESSAGE, 2);
            return false;
        }
        return true;
    }

    const onSubmitPress = async () => {
        if (validations()) {
            var payload = {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                email: email.trim(),
                message: message.trim(),
            }
            const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.SEND_CONTACT, JSON.stringify(payload), {})
            if (data) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setMessage('');
                Utils.Method.showToast('Feedback', 'Your feedback added successfully.', 1);
                navigation.navigate('Home')
            }
        }
    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.CONTACT_US}
                leftButtonPress={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView bounces={false}>
                <View style={Styles.contentContainer}>
                    <Image
                        source={Config.Images.LOGO_DARK}
                        resizeMode='contain'
                        style={Styles.logoImage}
                    />
                    <View style={Styles.flexRow}>
                        <Component.CustomText style={Styles.InformationTitle}>Address:</Component.CustomText>
                        <Component.CustomText style={Styles.Information}>Plot No. 706/2, 706/3, Village: Amodra, Nr. Rampur Cross Road, Sabar Dairy, Rampur, Gujarat 383210</Component.CustomText>
                    </View>
                    <View style={Styles.flexRow}>
                        <Component.CustomText style={Styles.InformationTitle}>Toll Free:</Component.CustomText>
                        <Text style={Styles.linkText} onPress={() => {
                            let number = '';
                            if (Platform.OS === 'ios') {
                                number = 'telprompt:18001238991';
                            }
                            else {
                                number = 'tel:18001238991';
                            }
                            Linking.openURL(number);
                        }}>18001238991</Text>
                    </View>
                    <View style={Styles.flexRow}>
                        <Component.CustomText style={Styles.InformationTitle}>Email:</Component.CustomText>
                        <Text style={Styles.linkText} onPress={() => {
                            Linking.openURL('mailto:info@surfica.in')
                        }}>info@surfica.in</Text>
                    </View>
                    <View style={Styles.flexRow}>
                        <Component.CustomText style={Styles.InformationTitle}>Website:</Component.CustomText>
                        <Text style={Styles.linkText} onPress={() => {
                            Linking.openURL('https://www.surfica.in')
                        }}>https://www.surfica.in</Text>
                    </View>

                    {/* <Component.CustomText style={Styles.kindlyText}>Kindly contact us on toll free <Text style={Styles.linkText} onPress={() => {
                    let number = '';
                    if (Platform.OS === 'ios') {
                        number = 'telprompt:18001238991';
                    }
                    else {
                        number = 'tel:18001238991';
                    }
                    Linking.openURL(number);
                }}>18001238991</Text> or email at <Text style={Styles.linkText} onPress={() => {
                    Linking.openURL('mailto:info@surfica.in')
                }}>info@surfica.in</Text></Component.CustomText> */}
                    {/* <View style={Styles.flexRow}>
                    <View style={{ width: '45%', }}>
                        <Component.CustomFloatingHintTextInput
                            label={Config.Strings.String_en.FIRST_NAME}
                            value={firstName}
                            onChangeText={value => setFirstName(value)}
                        />
                    </View>
                    <View style={{ width: '45%', }}>
                        <Component.CustomFloatingHintTextInput
                            label={Config.Strings.String_en.LAST_NAME}
                            value={lastName}
                            onChangeText={value => setLastName(value)}
                        />
                    </View>
                </View>
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.EMAIL}
                    value={email}
                    onChangeText={value => setEmail(value)}
                />
                <Component.CustomText style={Styles.messageText}>{Config.Strings.String_en.MESSAGE}</Component.CustomText>
                <TextInput
                    value={message}
                    onChangeText={(value) => {
                        setMessage(value)
                    }}
                    placeholder={Config.Strings.String_en.WRITE_MESSAGE}
                    placeholderTextColor={Config.Theme.COLOR_GRAY}
                    multiline
                    numberOfLines={5}
                    style={Styles.messageStyle}
                />
                <Component.CustomButton
                    label={Config.Strings.String_en.SEND}
                    onPress={() => {
                        onSubmitPress()
                    }}
                    containerStyle={Styles.signupButton}
                /> */}
                </View>
            </ScrollView>
        </View>
    );
}
