import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import Config from '../../../config';
import Component from '../../../component';
import Styles from './Styles';
import UserSession from '../../../utils/UserSession';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../store/actionTypes';

export default Recommendation = ({ navigation }) => {
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.reducer.userToken)
    const userRole = useSelector(state => state.reducer.userRole)
    const userData = useSelector(state => state.reducer.userData)
    const [listData, setListData] = useState([]);
    const [paging, setPaging] = useState(2);
    const [NoData, setNoData] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [moreDataLoader, setMoreDataLoader] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            pageApiCall()
        })
        pageApiCall()
    }, [])

    const pageApiCall = async () => {
        let payload = {
            page: '1',
            token: userToken,
            user_id: userData.user_id,
        }
        setLoadingData(true)
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_RECOMMENDATION, JSON.stringify(payload), {})
        setLoadingData(false)
        if (data.data.recommendations.length > 0) {
            setListData(data.data.recommendations)
            setNoData(false)
            setNoMoreData(false)
            setPaging(2)
        } else {
            setNoData(true)
        }
        setRefreshing(false)
    }

    const getListNextPage = async () => {
        let payload = {
            page: paging,
            token: userToken,
            user_id: userData.user_id,
        }
        setLoadingData(true)
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_RECOMMENDATION, JSON.stringify(payload), {})
        setLoadingData(false)
        if (data) {
            setListData([...listData, ...data.data.recommendations])
            setPaging(paging + 1)
        } else {
            setNoMoreData(true)
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        pageApiCall();
    }

    const _onEndReached = () => {
        if (!noMoreData) {
            getListNextPage()
        }
    }

    const listFooterComponent = () => {
        return (
            <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', }}>
                {(moreDataLoader) &&
                    <ActivityIndicator size='small' color={Config.Theme.COLOR_PRIMARY} />
                }
            </View>
        )
    }

    const getStringPaymentStatus = (status) => {
        if (status == 0) {
            return 'Pending'
        } else if (status == 1) {
            return 'Approved'
        } else {
            return 'Rejected'
        }

    }
    const getColorPaymentStatus = (status) => {
        if (status == 0) {
            return 'orange'
        } else if (status == 1) {
            return 'green'
        } else {
            return 'red'
        }

    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={Styles.listItemView}>
                <View style={{ flex: 1 }}>
                    <Component.CustomText>Name: {item.name}</Component.CustomText>
                    <Component.CustomText>Email: {item.email}</Component.CustomText>
                    <Component.CustomText>Phone: {item.phone}</Component.CustomText>
                    <Component.CustomText>Property Type: {item.property_type}</Component.CustomText>
                    <Component.CustomText>Proposed QTY: {item.proposed_qty}</Component.CustomText>

                    <Component.CustomText style={{ color: getColorPaymentStatus(item.payment_status) }}>Status: {getStringPaymentStatus(item.payment_status)}</Component.CustomText>
                    {item.payment_status == 1 &&
                        <Component.CustomText>Amount: {item.amount}</Component.CustomText>
                    }


                </View>
            </View>
        )
    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            <Component.CustomHeader
                title={userRole == Config.Constants.ARCHITECT ? Config.Strings.String_en.RECOMMENDATION : Config.Strings.String_en.TRANSACTION}
                leftImage={Config.Images.DRAWER}
                leftButtonPress={() => {
                    navigation.openDrawer();
                }}
            />
            {listData.length > 0 ?
                <FlatList
                    data={listData}
                    renderItem={_renderItem}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => { onRefresh() }}
                    />}
                    onEndReached={_onEndReached}
                    onEndReachedThreshold={0.5}
                    keyExtractor={item => item.id.toString()}
                    ListFooterComponent={listFooterComponent}
                    contentContainerStyle={{ width: Config.Constants.SCREEN_WIDTH, paddingHorizontal: 20 }}
                />
                :
                <Component.NoDataView noData={NoData} />
            }
        </View>
    );
}
