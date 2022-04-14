import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import Config from '../../../config';
import Component from '../../../component';
import Utils from '../../../utils';
import Styles from './Styles';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../store/actionTypes';
export default Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.reducer.userData)
    const userProfile = useSelector(state => state.reducer.userProfile)
    const userToken = useSelector(state => state.reducer.userToken)
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [withdrawButton, setWithdrawButton] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    useEffect(() => {
        pageStartApi();
    }, [])

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

    const withdrawRequest = async () => {
        if (withdrawAmount > parseFloat(userProfile.total_rewards)) {
            Utils.Method.showToast('Withdraw Request', `You can withdraw max ${userProfile.total_rewards} points.`, 2);
            setWithdrawButton(false)
            return;
        }
        if (withdrawAmount > 0) {
            let payload = {
                token: userToken,
                user_id: userData.user_id,
                amount: withdrawAmount,
                availableamount: parseFloat(userProfile.total_rewards) - parseFloat(withdrawAmount)
            }
            const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.WITHDRAW_REQUEST, JSON.stringify(payload), {});
            setWithdrawButton(false)
            if (data) {
                const payload1 = {
                    token: userToken,
                    user_id: userData.user_id,
                }
                const data1 = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_PROFILE, JSON.stringify(payload1), {});
                dispatch({ type: types.USER_PROFILE, payload: data1.data })
                Utils.Method.showToast('Withdraw Request', 'Withdraw-request sent.', 1);
                setWithdrawAmount('')
                setOtpModalVisible(false)
            }
        } else {
            setWithdrawButton(false)
            Utils.Method.showToast('Withdraw Request', 'Please earn more points to submit withdraw request.', 2);
        }

    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                centerImage={Config.Images.SURFICA_LOGO}
                leftImage={Config.Images.DRAWER}
                leftButtonPress={() => {
                    navigation.openDrawer();
                    // console.log('Hello');
                }}
                mainContainer={Styles.navbarMainContainer}
                centerStyle={Styles.mavBarHeaderCenter}
                leftImageStyle={Styles.headerLeftImage}
            />
            <ScrollView bounces={false}>
                <View style={Styles.contentContainer}>
                    <Component.CustomText style={Styles.totalText}>{Config.Strings.String_en.LAST7DAY}</Component.CustomText>
                    <Component.CustomText style={Styles.totalValueText}>{!!userProfile ? userProfile.total_rewards : 0}</Component.CustomText>
                    <View style={Styles.flexRowforButton}>
                        {/* <Component.CustomButton
                        label={Config.Strings.String_en.SCAN}
                        onPress={() => {

                            navigation.navigate('ArchitectDrawer')
                        }}
                        containerStyle={Styles.signupButton}
                    />
                    <Component.CustomButton
                        label={Config.Strings.String_en.LAST7DAY}
                        onPress={() => {

                            navigation.navigate('ArchitectDrawer')
                        }}
                        containerStyle={Styles.signupButton}
                    /> */}
                    </View>
                    <View style={Styles.flexRowforButton}>
                        <Component.CustomButton
                            label={Config.Strings.String_en.WITHDRAW}
                            onPress={() => {
                                // withdrawRequest();
                                setOtpModalVisible(true)
                            }}
                            containerStyle={Styles.signupButton}
                        />
                        <Component.CustomButton
                            label={Config.Strings.String_en.HISTORY}
                            onPress={() => {
                                navigation.navigate('Transactions')
                            }}
                            containerStyle={Styles.signupButton}
                        />
                    </View>

                    <View style={Styles.HorizonLine} />
                    <Component.CustomText style={Styles.totalText}>{Config.Strings.String_en.BROWSE_LIMINATE}</Component.CustomText>
                    {/* <Component.CustomButton
                    label={Config.Strings.String_en.SURFICA_CATEGORY}
                    onPress={() => {
                        navigation.navigate('LaminateList')
                    }}
                    containerStyle={[Styles.categoryList,{marginTop: 30}]}
                />
                <Component.CustomButton
                    label={Config.Strings.String_en.LINICA_CATEGORY}
                    onPress={() => {
                        navigation.navigate('LaminateList')
                    }}
                    containerStyle={Styles.categoryList}
                />
                <Component.CustomButton
                    label={Config.Strings.String_en.INNOVICA_CATEGORY}
                    onPress={() => {
                        navigation.navigate('LaminateList')
                    }}
                    containerStyle={Styles.categoryList}
                /> */}
                    <Component.CustomImageButton
                        image={Config.Images.HOME_SURFICA}
                        imageStyle={{ width: '90%', height: '100%', }}
                        onPress={() => {
                            navigation.navigate('LaminateList',
                                {
                                    catelog: 'surfica'
                                })
                        }}
                        containerStyle={[Styles.categoryList, { marginTop: 30 }]}
                    />
                    <Component.CustomImageButton
                        image={Config.Images.HOME_INNOVICA}
                        onPress={() => {
                            navigation.navigate('LaminateList',
                                {
                                    catelog: 'innovica'
                                })
                        }}
                        imageStyle={{ width: '100%', height: '70%', }}
                        containerStyle={[Styles.categoryList, { marginTop: 30 }]}
                    />
                    <Component.CustomImageButton
                        image={Config.Images.HOME_SLIMICA}
                        onPress={() => {
                            navigation.navigate('LaminateList',
                                {
                                    catelog: 'slimica'
                                })
                        }}
                        imageStyle={{ width: '100%', height: '70%', }}
                        containerStyle={[Styles.categoryList, { marginTop: 30 }]}
                    />
                </View>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={otpModalVisible}>
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <View>
                            <Component.CustomText style={Styles.filterMainTitle}>Please enter the amount you want to withdraw</Component.CustomText>
                            {/* <View style={Styles.withdrawInputText}> */}
                            <Component.CustomFloatingHintTextInput
                                label={'Withdraw amount'}
                                value={withdrawAmount}
                                onChangeText={value => {
                                    if (value != '') {
                                        if (Config.Constants.NUMBER_ONLY_REGEX.test(value)) {
                                            setWithdrawAmount(value)
                                        }
                                    } else {
                                        setWithdrawAmount(value)
                                    }

                                }}
                                keyboardType={'number-pad'}
                            />
                            {/* </View> */}
                            <Component.CustomButton
                                disable={withdrawButton}
                                label={Config.Strings.String_en.WITHDRAW}
                                onPress={() => {
                                    setWithdrawButton(true)
                                    withdrawRequest();
                                    // setOtpModalVisible(true)
                                }}
                                containerStyle={[Styles.signupButton, { marginTop: 20, alignSelf: 'center', }]}
                            />
                        </View>
                        <TouchableOpacity
                            style={Styles.cancelSelectedItemButton}
                            onPress={() => {
                                setOtpModalVisible(false)
                                setWithdrawAmount('')
                            }}>
                            <Image
                                source={Config.Images.CANCEL}
                                resizeMode='contain'
                                style={Styles.modalCancelImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
