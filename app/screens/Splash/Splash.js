import React from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './Styles';
import Config from '../../config';
import Utils from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../store/actionTypes';

export default Splash = ({ navigation }) => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        Config.Constants.ROOT_NAVIGATOR = navigation;
        startupData();
    }, [])

    const startupData = async () => {
        const token = await Utils.Method.AsyncStore.getData(Config.Constants.ASYNC_KEY_USER_TOKEN);
        const role = await Utils.Method.AsyncStore.getData(Config.Constants.ASYNC_KEY_ROLE);
        const user_data = await Utils.Method.AsyncStore.getData(Config.Constants.ASYNC_KEY_USER_DATA);
        console.log();
        if (!!token) {
            dispatch({ type: types.USER_TOKEN, payload: token })
            dispatch({ type: types.USER_ROLE, payload: role })
            dispatch({ type: types.USER_DATA, payload: JSON.parse(user_data) })
            setTimeout(() => {
                navigation.replace('ArchitectDrawer')
            }, 2000);
        } else {
            setTimeout(() => {
                navigation.replace('Login')
            }, 2000);
        }
    }

    return (
        <View style={Styles.mainContainer}>
            <Image
                source={Config.Images.SPLASH_LOGO}
                style={Styles.centerImage}
                resizeMode='contain'
            />
        </View>
    );
}
