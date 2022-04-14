import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import Config from '../../../config';
import Component from '../../../component';
import Styles from './Styles';
import UserSession from '../../../utils/UserSession';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../store/actionTypes';
import moment from 'moment';

export default RewardList = ({ navigation }) => {
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
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_REWARD_LIST, JSON.stringify(payload), {})
        setLoadingData(false)
        if (data.data.rewards.length > 0) {
            setListData(data.data.rewards)
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
        setMoreDataLoader(true)
        const data = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_REWARD_LIST, JSON.stringify(payload), {}, false)
        setMoreDataLoader(false)
        if (data && data.data.rewards.length > 0) {
            setListData([...listData, ...data.data.rewards])
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

    const _renderItem = ({ item, index }) => {
        return (
            <View style={Styles.listItemView}>
                <View style={{ flex: 1 }}>
                    <View style={Styles.listItemFlexRow}>
                        <Component.CustomText>Points: {item.points}</Component.CustomText>
                        <Component.CustomText>Balance: {item.availableamount}</Component.CustomText>
                    </View>
                    <Component.CustomText>Date: {moment(item.created_at).format(Config.Constants.DATE_FORMAT.DD_MMMM_YYYY)}</Component.CustomText>
                    <Component.CustomText>Time: {moment(item.created_at).format(Config.Constants.DATE_FORMAT.HH_MM)}</Component.CustomText>
                </View>
            </View>
        )
    }

    return (
        <View style={Styles.mainContainer}>
            {listData.length > 0
                ?
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
