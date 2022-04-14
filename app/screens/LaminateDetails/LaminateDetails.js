import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Platform, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import Styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../store/actionTypes';

export default LaminateDetails = ({ navigation, route }) => {

    const data = route.params.data;

    useEffect(() => {
        console.log(data);
    }, [])

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.PRODUCT}
                leftButtonPress={() => {
                    navigation.goBack();
                }}
            />
            <ScrollView>
                <Image
                    source={{ uri: data.picture }}
                    style={Styles.imageStyle}
                    resizeMode='cover'
                />
                <View style={Styles.contentContainer}>
                    <Component.CustomText style={Styles.title}>{data.title}</Component.CustomText>
                    <View style={[Styles.flexRow,{marginTop:20}]}>
                        <View style={Styles.flex1}>
                            <Component.CustomText style={Styles.subTitle}>Pattern</Component.CustomText>
                        </View>
                        <View style={Styles.flex1}>
                            <Component.CustomText style={Styles.subTitle}>Finish</Component.CustomText>
                        </View>
                        <View style={Styles.flex1}>
                            <Component.CustomText style={Styles.subTitle}>Thickness</Component.CustomText>
                        </View>
                    </View>
                    <View style={Styles.flexRow}>
                        <View style={Styles.flex1}>
                            <Component.CustomText>{data.pattern}</Component.CustomText>
                        </View>
                        <View style={Styles.flex1}>
                            <Component.CustomText>{data.finish}</Component.CustomText>
                        </View>
                        <View style={Styles.flex1}>
                            <Component.CustomText>{data.thickness}</Component.CustomText>
                        </View>
                    </View>
                    <Component.CustomText style={[Styles.subTitle,{marginTop: 20,}]}>Description</Component.CustomText>
                    <Component.CustomText>{data.description}</Component.CustomText>
                </View>
            </ScrollView>
        </View>
    );
}
