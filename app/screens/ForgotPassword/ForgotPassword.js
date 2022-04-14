import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import Styles from './Styles';

export default ForgotPassword = ({ navigation }) => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.FORGOT_PASSWORD1}
                leftButtonPress={() => {
                    navigation.goBack();
                }}
            />
            <View style={Styles.contentContainer}>
                {/* <View style={Styles.flexRow}>
                    <View style={{ width: '45%', }}>
                        <Component.CustomFloatingHintTextInput
                            label={Config.Strings.String_en.FIRST_NAME}
                            value={mobile}
                            onChangeText={value => setMobile(value)}
                        />
                    </View>
                    <View style={{ width: '45%', }}>
                        <Component.CustomFloatingHintTextInput
                            label={Config.Strings.String_en.LAST_NAME}
                            value={mobile}
                            onChangeText={value => setMobile(value)}
                        />
                    </View>
                </View> */}
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
                {/* <Component.CustomText style={Styles.messageText}>{Config.Strings.String_en.MESSAGE}</Component.CustomText>
                <TextInput
                    value={mobile}
                    onChangeText={(value) => {
                        setMobile(value)
                    }}
                    placeholder={Config.Strings.String_en.WRITE_MESSAGE}
                    placeholderTextColor={Config.Theme.COLOR_GRAY}
                    multiline
                    numberOfLines={5}
                    style={Styles.messageStyle}
                /> */}
                <Component.CustomButton
                    label={Config.Strings.String_en.SUBMIT}
                    onPress={() => {

                    }}
                    containerStyle={Styles.signupButton}
                />
            </View>
        </View>
    );
}
