import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import Styles from './Styles';
import { WebView } from 'react-native-webview';

export default CMSPages = ({ navigation, route }) => {
    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={route.params.title}
                leftButtonPress={() => {
                    navigation.goBack();
                }}
            />
            <WebView
                source={{ uri: route.params.url }}
                style={{ flex: 1 }}
            />
        </View>
    );
}
