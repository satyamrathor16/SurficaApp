import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import UserSession from '../../utils/UserSession';
import Styles from './Styles';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../store/actionTypes';

export default SelectRole = ({ navigation }) => {

    const dispatch = useDispatch();


    const signupRole = async (role) => {
        //role 2 == carpenter, 1 == Architecture
        navigation.navigate('Signup', {
            role: role
        })
    }

    return (
        <View style={Styles.mainContainer}>
            <Image
                source={Config.Images.SPLASH_LOGO}
                style={Styles.centerImage}
                resizeMode='contain'
            />
            <Component.CustomText style={Styles.SignupText}>{Config.Strings.String_en.SIGNUP1}</Component.CustomText>
            <Component.CustomText style={Styles.SignupText}>{Config.Strings.String_en.AS}</Component.CustomText>
            <View style={Styles.RoleView}>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            signupRole(2)
                            dispatch({ type: types.USER_ROLE, payload: Config.Constants.CARPANTER })
                            UserSession.IS_ARCHHITECT = false
                        }}
                        style={Styles.roleCarpenterView}>
                        <Image
                            source={Config.Images.CARPENTER}
                            style={Styles.roleImage}
                            resizeMode='contain'
                        />

                    </TouchableOpacity>
                    <Component.CustomText style={Styles.roleText}>{Config.Strings.String_en.CARPENTER}</Component.CustomText>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            signupRole(1)
                            dispatch({ type: types.USER_ROLE, payload: Config.Constants.ARCHITECT })
                            UserSession.IS_ARCHHITECT = true
                        }}
                        style={Styles.roleArchitectView}>
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
