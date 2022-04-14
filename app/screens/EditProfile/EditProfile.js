import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Styles from './Styles';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import Component from '../../component';
import Config from '../../config';

export default EditProfile = ({ navigation, route }) => {

    const [fullname, setFullname] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.EDIT_PROFILE}
                leftImage={Config.Images.DRAWER}
                leftButtonPress={() => {
                    navigation.openDrawer();
                }}
            />
            <ScrollView style={Styles.contentContainer}>
                <Component.CustomButton
                    label={Config.Strings.String_en.PERSONAL_DETAILS}
                    onPress={() => {
                        navigation.navigate('PersonalDetails')

                    }}
                    containerStyle={Styles.selectionButton}
                />
                <Component.CustomButton
                    label={Config.Strings.String_en.BANK_DETAILS}
                    onPress={() => {
                        navigation.navigate('BankDetails')
                    }}
                    containerStyle={Styles.selectionButton}
                />
                {/* <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.NAME}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.DOB}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.STATE}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.CITY}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.PHONE}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.EMAIL}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.BANK_NAME}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.ACCOUNT_HOLDER_NAME}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.IFSC_CODE}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.ACCOUNT_NUMBER}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomFloatingHintTextInput
                    label={Config.Strings.String_en.ACCOUNT_TYPE}
                    value={fullname}
                    onChangeText={value => setFullname(value)}

                />
                <Component.CustomButton
                    label={Config.Strings.String_en.UPDATE}
                    onPress={() => {

                    }}
                    containerStyle={Styles.signupButton}
                /> */}
            </ScrollView>

        </View>
    );
}
