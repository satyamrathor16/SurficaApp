import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Config from '../config';

export default CustomStatusBar = (props) => {

    const { backgroundColor } = props;

    return (
        <View style={[styles.barStyle, { backgroundColor: backgroundColor }]} />
    );
}

const styles = StyleSheet.create({
    barStyle: {
        height: getStatusBarHeight(),
        backgroundColor: Config.Theme.COLOR_PRIMARY,
        width: Config.Constants.SCREEN_WIDTH,
    }
})