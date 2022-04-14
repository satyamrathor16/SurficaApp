import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import Styles from './Styles';

export default PrivacyPolicy = ({ navigation }) => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            
            
        </View>
    );
}
