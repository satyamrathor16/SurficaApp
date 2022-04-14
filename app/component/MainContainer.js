import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import Config from '../config';
import CustomLoader from '../module/CustomLoader/CustomLoader';
import Module from '../module';

import Toast from 'react-native-toast-message';

export default MainContainer = ({ children }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar translucent barStyle='light-content' backgroundColor={Config.Theme.COLOR_TRASPARENT} />
            {children}
            <CustomLoader ref={ref=> Module.CustomLoader.setLoaderRef(ref)} />
            <Toast />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})