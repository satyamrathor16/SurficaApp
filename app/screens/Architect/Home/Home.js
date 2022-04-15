import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import Config from '../../../config';
import Component from '../../../component';
import Styles from './Styles';
import Swiper from 'react-native-web-swiper';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../store/actionTypes';

export default Home = ({ navigation }) => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.reducer.userData)
    const userToken = useSelector(state => state.reducer.userToken)
    const userProfile = useSelector(state => state.reducer.userProfile)

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

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                centerImage={Config.Images.SURFICA_LOGO_1}
                leftImage={Config.Images.DRAWER}
                leftButtonPress={() => {
                    navigation.openDrawer();
                    // console.log('Hello');
                }}
                // rightButtonPress={onRightButtonPress}
                mainContainer={Styles.navbarMainContainer}
                centerStyle={Styles.mavBarHeaderCenter}
                leftImageStyle={Styles.headerLeftImage}
            />
            <ScrollView bounces={false}>
                <View style={Styles.contentContainer}>
                    <Component.CustomText style={Styles.totalText}>{Config.Strings.String_en.LAST7DAY}</Component.CustomText>
                    <Component.CustomText style={Styles.totalValueText}>{!!userProfile ? userProfile.architest_amount == 0 ? '0.0' : userProfile.architest_amount : 0.0}</Component.CustomText>
                    <View style={Styles.imageSliderView}>
                        <Swiper
                            loop
                            timeout={2}
                            controlsEnabled={false}
                        >
                            <View style={[Styles.slideContainer, Styles.slide1]}>
                                <Image
                                    source={Config.Images.CAROUSEL_1}
                                    style={Styles.slideImage}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={[Styles.slideContainer, Styles.slide2]}>
                                <Image
                                    source={Config.Images.CAROUSEL_2}
                                    style={Styles.slideImage}
                                    resizeMode='cover'
                                />
                            </View>
                            <View style={[Styles.slideContainer, Styles.slide3]}>
                                <Image
                                    source={Config.Images.CAROUSEL_3}
                                    style={Styles.slideImage}
                                    resizeMode='cover'
                                />
                            </View>
                        </Swiper>

                    </View>

                    <View style={Styles.HorizonLine} />
                    <Component.CustomText style={Styles.totalText}>{Config.Strings.String_en.BROWSE_LIMINATE}</Component.CustomText>
                    {/* <Component.CustomButton
                    label={Config.Strings.String_en.SURFICA_CATEGORY}
                    onPress={() => {
                        navigation.navigate('LaminateList')
                    }}
                    containerStyle={[Styles.categoryList, { marginTop: 30 }]}
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
                    {/* <Component.CustomButton
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

                    {/* <FlatList
                data={data}
                keyExtractor={key => key.id}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={Styles.listContainerStyle}
            /> */}
                </View>
            </ScrollView>
        </View>
    );
}
