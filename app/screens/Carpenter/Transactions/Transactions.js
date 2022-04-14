import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import Config from '../../../config';
import Component from '../../../component';
import Styles from './Styles';
import UserSession from '../../../utils/UserSession';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../store/actionTypes';
import moment from 'moment';
import TransactionTabNavigator from '../../../navigator/TransactionTabNavigator';

export default Transactions = ({ navigation }) => {

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={Config.Strings.String_en.TRANSACTION}
                leftImage={Config.Images.DRAWER}
                leftButtonPress={() => {
                    navigation.openDrawer();
                }}
            />
            <TransactionTabNavigator />
        </View>
    );
}
