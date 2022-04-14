import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import Config from '../../../config';
import Component from '../../../component';
import Styles from './Styles';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../store/actionTypes';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Utils from '../../../utils';

export default Scan = ({ navigation }) => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.reducer.userData)
    const userProfile = useSelector(state => state.reducer.userProfile)
    const userToken = useSelector(state => state.reducer.userToken)
    let ScannerRef = useRef(null);
    const [viewFocused, setViewFocused] = useState(false);
    const [menualCode, setMenualCode] = useState('');
    // const [scannable, setScanneble] = useState(false);
    useEffect(() => {
        pageStartApi();
        const onFocus = navigation.addListener('focus', () => {
            setMenualCode('')
            setViewFocused(true);
        })
        const onBlur = navigation.addListener('blur', () => {
            setViewFocused(false);
        });
        return { onFocus, onBlur };
    }, [navigation])

    const pageStartApi = async () => {
        const payload = {
            token: userToken,
            user_id: userData.user_id,
        }
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_PROFILE, JSON.stringify(payload), {});
        console.log(JSON.stringify(data));
        if (data.data) {
            dispatch({ type: types.USER_PROFILE, payload: data.data });
        }
    }

    const onSuccess = async (e) => {
        console.log(e.data)
        let payload = {
            user_id: userData.user_id,
            code: e.data,
            token: userToken,
            availableamount: userProfile.total_rewards,
        }
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.SCAN_QR_CODE, JSON.stringify(payload), {});
        if (!!data) {
            const payload1 = {
                token: userToken,
                user_id: userData.user_id,
            }
            const data1 = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_PROFILE, JSON.stringify(payload1), {});
            dispatch({ type: types.USER_PROFILE, payload: data1.data });
            Utils.Method.showToast('Reward Success', 'Reward added successfully.', 1);
            navigation.navigate('Home')
        }
        // console.log(ScannerRef);
        setTimeout(() => {
            if (!!ScannerRef) {
                ScannerRef.reactivate();
            }
        }, 1500)

    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={'Scan Barcode'}
                leftButtonPress={() => {
                    navigation.openDrawer();
                }}
                leftImage={Config.Images.DRAWER}
            />
            <View style={Styles.contentContainer}>
                {viewFocused &&
                    <QRCodeScanner
                        ref={(ref) => { ScannerRef = ref }}
                        onRead={onSuccess}
                        containerStyle={{ flex: 1 }}
                        cameraStyle={{
                            width: '100%',
                            height: '100%',
                        }}
                        showMarker={true}
                        markerStyle={{
                            marginTop:-150
                        }}
                    />
                }
                <View style={Styles.codeInputView}>
                    <Component.CustomFloatingHintTextInput
                        label={'Enter the code manually'}
                        value={menualCode}
                        onChangeText={value => {
                            setMenualCode(value)
                        }}
                    // keyboardType={'number-pad'}
                    />
                    <Component.CustomButton
                        label={Config.Strings.String_en.SUBMIT}
                        onPress={() => {
                            if (menualCode != '') {
                                onSuccess({ data: menualCode })
                            } else {
                                Utils.Method.showToast('Menual Code', 'Please enter the menual code.', 2);
                            }
                            // withdrawRequest();
                            // setOtpModalVisible(true)
                        }}
                        containerStyle={[Styles.signupButton, { marginTop: 20, alignSelf: 'center', }]}
                    />
                </View>
            </View>
        </View>
    );
}
