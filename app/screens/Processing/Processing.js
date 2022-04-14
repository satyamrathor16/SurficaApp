import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import Styles from './Styles';

export default SelectRole = ({ navigation }) => {
    return (
        <View style={Styles.mainContainer}>
            <Image
                source={Config.Images.SPLASH_LOGO}
                style={Styles.centerImage}
                resizeMode='contain'
            />
            <Component.CustomText style={Styles.SignupText}>{Config.Strings.String_en.SIGNUP}</Component.CustomText>
            <Component.CustomText style={Styles.SignupText}>{Config.Strings.String_en.AS}</Component.CustomText>
            <View style={Styles.RoleView}>
                <View>
                    <TouchableOpacity style={Styles.roleCarpenterView}>
                        <Image
                            source={Config.Images.CARPENTER}
                            style={Styles.roleImage}
                            resizeMode='contain'
                        />

                    </TouchableOpacity>
                    <Component.CustomText style={Styles.roleText}>{Config.Strings.String_en.CARPENTER}</Component.CustomText>
                </View>
                <View>
                    <TouchableOpacity style={Styles.roleArchitectView}>
                        <Image
                            source={Config.Images.ARCHITECT}
                            style={Styles.roleImage}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Component.CustomText style={Styles.roleText}>{Config.Strings.String_en.ARCHITECT}</Component.CustomText>
                </View>
            </View>
        </View>
    );
}
