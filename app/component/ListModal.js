import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Image, FlatList, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Config from '../config';
// import Utils from '../utils';
// import Module from '../module';
import Component from '../component';

export default CityListModal = (props) => {

    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [selectedData, setSelectedData] = useState([])
    const [dropDownData, setDropDownData] = useState([])
    const [dataPaging, setDataPaging] = useState(1)
    const [moreDataLoader, setMoreDataLoader] = useState(false)
    const [searchingData, setSearchingData] = useState(false);
    const [showSearchData, setShowSearchData] = useState(false);
    const [searchNoMoreData, setSearchNoMoreData] = useState(false);
    const [searchMoreDataLoader, setSearchMoreDataLoader] = useState(false)
    const [noSearchDataFound, setNoSearchDataFound] = useState(false)
    const [paging, setPaging] = useState(2)
    const timerRef = useRef(null);
    const {
        onChangeText,
        dropDownLabel,
        showSavedData = false,
        modalVisible,
        closeModal,
        isCity = true
    } = props;

    useEffect(() => {
        // console.log('Called Hospital');
        // getData();
    }, [])

    // const getData = async () => {
    //     setMoreDataLoader(true)
    //     const data = await Config.ServerCalls.GetApiCall(Config.ServerCallUrls.GET_CITY_LIST + `?page=${dataPaging}`, {}, false);
    //     setMoreDataLoader(false)
    //     if (data) {
    //         // console.log('Page Data:',dataPaging);
    //         // console.log(data.data.all);
    //         setDropDownData([...dropDownData, ...data.data.all])
    //         setDataPaging(dataPaging + 1)
    //     }
    // }

    const _renderItem = ({ item, index }) => {
        // console.log(item);
        return (
            <TouchableOpacity
                style={styles.dropDownItemStyle}
                onPress={() => {
                    onChangeText(item)
                    closeModal();
                    onClosePopup()
                }}
            >
                <Component.CustomText style={styles.dropDownItemTextStyle}>{item.value}</Component.CustomText>
            </TouchableOpacity>
        )

    }

    // const _onEndReached = () => {
    //     if (!moreDataLoader) {
    //         getData()
    //     }

    // }

    // const _onEndReachedSearch = () => {
    //     if (!searchNoMoreData && !searchMoreDataLoader) {
    //         getMoreSearchData()
    //     }

    // }

    const listFooterComponent = () => {
        return (
            <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', }}>
                {(moreDataLoader || searchMoreDataLoader) &&
                    <ActivityIndicator size='small' color={Config.Theme.COLOR_PRIMARY} />
                }
            </View>
        )
    }

    const onSearchTyped = async (text) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setSearch(text)
        if (text.trim() != '') {
            timerRef.current = setTimeout(() => {
                getSearchData(text.trim());
            }, 1000)
        } else {
            setPaging(2)
            setShowSearchData(false)
        }
    }

    const getSearchData = async (text) => {
        // var url = `${Config.ServerCallUrls.GET_CITY_LIST}?page=1&keyword=${text}`
        // let formData = new FormData();
        // formData.append('keyword',text);
        var payload = {
            keyword: text
        }
        console.log(JSON.stringify(payload));
        setSearchingData(true)
        const data = await Config.ServerCalls.PostApiCall(isCity ? Config.ServerCallUrls.GET_CITY_LIST : Config.ServerCallUrls.GET_STATE_LIST, JSON.stringify(payload), {}, false)
        setSearchingData(false)
        console.log('Search Data', JSON.stringify(data));

        if (data.data.suggestions.length > 0) {
            setSearchData(data.data.suggestions)
            setShowSearchData(true)
            setNoSearchDataFound(false)
            setPaging(2)
        } else {
            setSearchData([])
            setShowSearchData(true)
            setNoSearchDataFound(true)
        }

        // const data = await Config.ServerCalls.GetApiCall('https://reqres.in/api/users?page=2',{});
        // console.log(JSON.stringify(data));


    }

    // const getMoreSearchData = async () => {
    //     setSearchMoreDataLoader(true)
    //     var url = `${Config.ApiEndpoint.CITY_LIST}?page=${paging}&search=${search}`
    //     const data = await Config.ApiServices.GetApiCall(url, {}, false)
    //     setSearchMoreDataLoader(false)
    //     if (data.data.all.length > 0) {
    //         setSearchData([...searchData, ...data.data.all])
    //         setShowSearchData(true)
    //         setPaging(paging + 1)
    //     } else {
    //         setSearchNoMoreData(true)
    //     }
    // }

    const onClosePopup = () => {
        setShowSearchData(false)
        setNoSearchDataFound(false)
        setPaging(2)
        setSearchNoMoreData(false)
        setSearch('')
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {Platform.OS == 'ios' &&
                        <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
                    }

                    <Component.CustomHeader
                        title={dropDownLabel}
                        leftButtonPress={() => {
                            closeModal()
                            onClosePopup()
                        }}
                        leftImageStyle={styles.navBarLeftImageStyle}
                        imageStyle={styles.navBarImageStyle}
                        titleStyles={styles.navBarTextStyle}
                        mainContainer={styles.navBarMainContainer}
                    // statusBarContainerStyle={styles.statusBarHeight}
                    />
                    <View style={styles.searchTextInputView}>
                        <TextInput
                            value={search}
                            placeholder='Type here...'
                            placeholderTextColor={Config.Theme.COLOR_BLACK}
                            onChangeText={(text) => {
                                onSearchTyped(text)
                            }}
                            style={styles.searchTextInputStyle}
                            returnKeyType='search'
                        />
                        {searchingData &&
                            <ActivityIndicator size='small' color={Config.Theme.COLOR_PRIMARY} />
                        }
                    </View>
                    {/* <FlatList
                        data={dropDownData}
                        renderItem={_renderItem}
                        onEndReached={_onEndReached}
                        onEndReachedThreshold={0.5}
                        keyExtractor={item => { (item.id).toString() }}
                        contentContainerStyle={{ width: Config.Constant.SCREEN_WIDTH }}
                        ListFooterComponent={listFooterComponent}
                    /> */}
                    {!showSearchData ?
                        <FlatList
                            data={dropDownData}
                            renderItem={_renderItem}
                            // onEndReached={_onEndReached}
                            onEndReachedThreshold={0.5}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={{ width: Config.Constants.SCREEN_WIDTH }}
                            ListFooterComponent={listFooterComponent}
                        />
                        :
                        <>
                            {!noSearchDataFound ?
                                <FlatList
                                    data={searchData}
                                    renderItem={_renderItem}
                                    // onEndReached={_onEndReachedSearch}
                                    onEndReachedThreshold={0.5}
                                    keyExtractor={item => item.data.toString()}
                                    contentContainerStyle={{ width: Config.Constants.SCREEN_WIDTH }}
                                    ListFooterComponent={listFooterComponent}
                                />

                                :
                                <View style={styles.noDataContainer}>
                                    <>
                                        {/* <View style={styles.noDataImage}>
                                            <Image source={require('../assets/images/splash_image.png')}
                                                style={styles.noDataImageStyle}
                                                resizeMode='contain'
                                            />
                                        </View> */}

                                        <Component.CustomText textStyle={styles.noDataText}>No City Found</Component.CustomText>
                                    </>
                                </View>
                            }

                        </>
                    }
                    {/* <ScrollView
                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    console.log('Close to bottom');
                                    addNewData()
                                }
                            }}>
                            <View >
                                {dropDownData.map(item =>
                                    
                                )}
                            </View>
                        </ScrollView> */}
                </View>
                <SafeAreaView></SafeAreaView>
            </View>
        </Modal>
    )

}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_WHITE
    },
    modalView: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    navBarImageStyle: {
        tintColor: Config.Theme.COLOR_BLACK
    },
    navBarLeftImageStyle: {
        tintColor: Config.Theme.COLOR_PRIMARY
    },
    navBarTextStyle: {
        color: Config.Theme.COLOR_BLACK
    },
    navBarMainContainer: {
        backgroundColor: Config.Theme.COLOR_WHITE,
        elevation: 7,
        shadowColor: Config.Theme.COLOR_BLACK,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
    },
    statusBarHeight: {
        height: Platform.OS == 'android' ? 0 : getStatusBarHeight()
    },
    searchTextInputStyle: {
        borderWidth: 1,
        borderColor: Config.Theme.COLOR_BLACK,
        borderRadius: 15,
        width: '100%',
        paddingLeft: 20,
        height: 50,
        marginBottom: 10,
        color: Config.Theme.COLOR_BLACK
    },
    searchTextInputView: {
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 20
    },
    dropDownItemStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Config.Theme.COLOR_GRAY_LIGHT,
        marginHorizontal: 20
    },
    dropDownItemTextStyle: {
        fontSize: 14,
        fontFamily: Platform.OS == 'android' ? Config.Theme.FONT_BOLD : Config.Theme.FONT_SEMIBOLD
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataImage: {
        padding: 20,
        borderRadius: 62.5,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 13,
    },
    noDataImageStyle: {
        height: 100,
        width: 100,
    },
})