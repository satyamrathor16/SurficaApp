import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList, Platform, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import Config from '../../config';
import Component from '../../component';
import Styles from './Styles';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../store/actionTypes';
export default LaminateList = ({ navigation, route }) => {

    const [data, setData] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [paging, setPaging] = useState(2);
    const [NoData, setNoData] = useState(false);
    const [noMoreData, setNoMoreData] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [moreDataLoader, setMoreDataLoader] = useState(false)
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [patternFilter, setPatternFilter] = useState([
        { title: 'Solid Colours', isSelected: false },
        { title: 'Designs', isSelected: false },
    ])
    const [finishFilter, setFinishFilter] = useState([
        { title: 'Matt', isSelected: false },
        { title: 'Glossy', isSelected: false },
    ])
    const [thicknessFilter, setThicknessFilter] = useState([
        { title: '1 mm', isSelected: false },
        { title: '1.11 mm', isSelected: false },
    ])
    const pickerRef = useRef();
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.reducer.userToken)
    const userRole = useSelector(state => state.reducer.userRole)

    useEffect(() => {
        if (!!route.params && !!route.params.sucess) {
            pageStartApi()
        }
    }, [route.params])

    useEffect(() => {
        pageStartApi()
    }, [])

    const pageStartApi = async () => {

        // var selectedPattern = patternFilter.filter(item => {
        //     return item.isSelected
        // })
        // var selectedfinish = finishFilter.filter(item => {
        //     return item.isSelected
        // })
        // var selectedthickness = thicknessFilter.filter(item => {
        //     return item.isSelected
        // })
        var selectedPattern = '';
        var isSelectedPattern = false;
        patternFilter.map(item => {
            if (item.isSelected) {
                selectedPattern += item.title + ','
                isSelectedPattern = true
            }
        })
        var selectedfinish = '';
        var isSelectedfinish = false;
        finishFilter.map(item => {
            if (item.isSelected) {
                selectedfinish += item.title + ','
                isSelectedfinish = true;
            }
        })

        var selectedthickness = '';
        var isSelectedthickness = false;
        thicknessFilter.filter(item => {
            if (item.isSelected) {
                selectedthickness += item.title + ','
                isSelectedthickness = true
            }
        })

        console.log(selectedPattern.slice(0, -1), selectedfinish.slice(0, -1), selectedthickness.slice(0, -1));
        let payload = {
            page: 1,
            token: userToken,
            brand: route.params.catelog
        }

        if (isSelectedPattern) {
            payload.pattern = selectedPattern.slice(0, -1);
        }
        if (isSelectedfinish) {
            payload.finish = selectedfinish.slice(0, -1);
        }
        if (isSelectedthickness) {
            payload.thickness = selectedthickness.slice(0, -1);
        }
        // console.log('payload', JSON.stringify(payload));
        setLoadingData(true)
        const apiData = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_PRODUCTS, JSON.stringify(payload), {});
        setLoadingData(false)
        if (apiData.data.posts.length > 0) {
            setNoMoreData(false)
            setPaging(2)
            setData(apiData.data.posts)
        } else {
            setData([])
            setNoData(true)
        }
    }

    const getMoreProducts = async () => {
        var selectedPattern = '';
        var isSelectedPattern = false;
        patternFilter.map(item => {
            if (item.isSelected) {
                selectedPattern += item.title + ','
                isSelectedPattern = true
            }
        })
        var selectedfinish = '';
        var isSelectedfinish = false;
        finishFilter.map(item => {
            if (item.isSelected) {
                selectedfinish += item.title + ','
                isSelectedfinish = true;
            }
        })

        var selectedthickness = '';
        var isSelectedthickness = false;
        thicknessFilter.filter(item => {
            if (item.isSelected) {
                selectedthickness += item.title + ','
                isSelectedthickness = true
            }
        })
        let payload = {
            page: paging,
            token: userToken,
            brand: route.params.catelog
        }
        if (isSelectedPattern) {
            payload.pattern = selectedPattern.slice(0, -1);
        }
        if (isSelectedfinish) {
            payload.finish = selectedfinish.slice(0, -1);
        }
        if (isSelectedthickness) {
            payload.thickness = selectedthickness.slice(0, -1);
        }
        setMoreDataLoader(true)
        const apiData = await Config.ServerCalls.PostApiCall(Config.ServerCallUrls.GET_PRODUCTS, JSON.stringify(payload), {}, false);
        setMoreDataLoader(false)
        if (apiData.data.posts.length > 0) {
            setPaging(paging + 1)
            setData([...data, ...apiData.data.posts])
        } else {
            setNoMoreData(true)
        }
    }

    function open() {
        setIsPickerOpen(true)
        if (Platform.OS == 'ios') {
            pickerRef.current.togglePicker()
        } else {
            pickerRef.current.focus();
        }
    }

    // function close() {
    //     setIsPickerOpen(false)
    //     pickerRef.current.blur();
    // }

    const onSelectItem = (item) => {
        setData(
            data.map((i) => {
                if (item.id == i.id) {
                    i.isSelected = !i.isSelected
                }
                return i
            })
        )
    }

    const onRightButtonPress = () => {

        var checkChecked = false;
        var selectedItem = '';
        data.map((item) => {
            if (item.isSelected) {
                checkChecked = true;
                selectedItem += item.id + ',';
            }
        })
        if (checkChecked) {
            console.log(selectedItem.slice(0, -1));
            navigation.navigate('CustomerDetails', {
                selectedProducts: selectedItem.slice(0, -1)
            });
        }

    }

    const renderItem = ({ item, index }) => {
        // console.log(item.picture);
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.mainContainer1}
                onPress={() => {
                    navigation.navigate('LaminateDetails', {
                        data: item
                    })
                }}
            >
                <View style={Styles.imageViewStyle}>
                    {/* <Image
                        source={{ uri: item.picture }}
                        resizeMode='cover'
                        style={Styles.imageStyle}
                    /> */}
                    <Component.ImageComponent uri={item.picture} />
                    {userRole == Config.Constants.ARCHITECT &&
                        <TouchableOpacity
                            style={Styles.selectButtonView}
                            onPress={() => { onSelectItem(item) }}>
                            <Image
                                source={Config.Images.CHECKED}
                                style={[Styles.selectionImageStyle, { tintColor: item.isSelected ? Config.Theme.COLOR_PRIMARY : Config.Theme.COLOR_WHITE }]}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    }

                </View>
                <View style={Styles.otherDataView}>
                    <View style={Styles.nameTypeView}>
                        <Component.CustomText style={Styles.textStyle}>{item.title}</Component.CustomText>
                        {/* type */}
                        <Component.CustomText style={Styles.textStyle}>{item.pattern}</Component.CustomText>
                    </View>
                    {/* size */}
                    <Component.CustomText style={Styles.textStyle}>{item.finish}</Component.CustomText>
                    <View style={{ flex: 1 }} />
                    {/* finish */}
                    <Component.CustomText style={[Styles.textStyle]}>{item.thickness}</Component.CustomText>

                </View>
            </TouchableOpacity>
        )
    }

    const onEndReached = () => {
        if (!loadingData && !noMoreData && !moreDataLoader) {
            getMoreProducts();
        }
    }

    const listFooterComponent = () => {
        return (
            <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', }}>
                {moreDataLoader &&
                    <ActivityIndicator size='small' color={Config.Theme.COLOR_PRIMARY} />
                }
            </View>
        )
    }

    const _onPatternTagPress = (item) => {
        setPatternFilter(
            patternFilter.map(i => {
                if (item.title == i.title) {
                    i.isSelected = !i.isSelected
                }
                return i;
            })
        )
        setTimeout(() => {
            pageStartApi()
        }, 1000)
    }

    const _onFinishTagPress = (item) => {
        setFinishFilter(
            finishFilter.map(i => {
                if (item.title == i.title) {
                    i.isSelected = !i.isSelected
                }
                return i;
            })
        )
        setTimeout(() => {
            pageStartApi()
        }, 1000)
    }

    const _onThicknessTagPress = (item) => {
        setThicknessFilter(
            thicknessFilter.map(i => {
                if (item.title == i.title) {
                    i.isSelected = !i.isSelected
                }
                return i;
            })
        )
        setTimeout(() => {
            pageStartApi()
        }, 1000)
    }

    return (
        <View style={Styles.mainContainer}>
            <Component.CustomStatusBar backgroundColor={Config.Theme.COLOR_PRIMARY} />
            {userRole == Config.Constants.ARCHITECT ?
                <Component.CustomHeader
                    centerImage={Config.Images.SURFICA_LOGO}
                    leftButtonPress={() => {
                        navigation.pop()
                    }}
                    rightButtonPress={onRightButtonPress}
                    mainContainer={Styles.navbarMainContainer}
                    centerStyle={Styles.mavBarHeaderCenter}
                    leftImageStyle={Styles.headerLeftImage}
                    showRightButton={true}
                    rightImage={Config.Images.SHARE}
                    rightImageStyle={Styles.headerRightImage}
                />
                :
                <Component.CustomHeader
                    centerImage={Config.Images.SURFICA_LOGO}
                    leftButtonPress={() => {
                        navigation.pop()
                    }}
                    // rightButtonPress={onRightButtonPress}
                    mainContainer={Styles.navbarMainContainer}
                    centerStyle={Styles.mavBarHeaderCenter}
                    leftImageStyle={Styles.headerLeftImage}
                // showRightButton={true}
                // rightImage={Config.Images.SHARE}
                // rightImageStyle={Styles.headerRightImage}
                />
            }
            <TouchableOpacity
                onPress={() => {
                    // open()
                    setOtpModalVisible(true)
                }}
                style={Styles.filterView}>
                <Image
                    source={Config.Images.FILTER}
                    resizeMode='contain'
                    style={Styles.filterImageStyle}
                />
            </TouchableOpacity>

            {/* <View style={{ height: 0, width: 0, alignSelf: 'flex-end', }}>
                {Platform.OS == 'ios' ?
                    <RNPickerSelect
                        ref={pickerRef}
                        onValueChange={(value) => console.log(value)}
                        items={[
                            { label: 'Shade', value: 'shade' },
                            { label: 'Color', value: 'color' },
                            { label: 'Finish', value: 'finish' },
                        ]}
                    />
                    :
                    <Picker
                        ref={pickerRef}
                        mode='dropdown'
                        selectedValue={selectedLanguage}
                        style={{ height: 0, width: 0, alignSelf: 'flex-end', }}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Shade" value="shade" />
                        <Picker.Item label="Color" value="color" />
                        <Picker.Item label="Finish" value="finish" />
                    </Picker>
                }


            </View> */}
            {data.length > 0 ?
                <FlatList
                    data={data}
                    keyExtractor={key => key.id}
                    numColumns={2}
                    renderItem={renderItem}
                    contentContainerStyle={Styles.listContainerStyle}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={listFooterComponent}
                />
                :
                <Component.NoDataView noData={NoData} />
            }

            <SafeAreaView />
            <Modal
                animationType="fade"
                transparent={true}
                visible={otpModalVisible}>
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <View>
                            <Component.CustomText style={Styles.filterMainTitle}>Filters</Component.CustomText>
                            <Component.CustomText style={Styles.filterTitle}>Pattern</Component.CustomText>
                            <View style={Styles.flexRow}>
                                {patternFilter.map((item) =>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            _onPatternTagPress(item)
                                        }}
                                        style={[Styles.multiChoiceButtonStyle, {
                                            backgroundColor: item.isSelected ? Config.Theme.COLOR_PRIMARY : Config.Theme.COLOR_WHITE,
                                            borderWidth: item.isSelected ? 0 : 1,
                                            paddingHorizontal: item.isSelected ? 16 : 15,
                                            paddingVertical: item.isSelected ? 4 : 3

                                        }]}>
                                        <Component.CustomText style={[Styles.multiChoiceTextStyle, { color: item.isSelected ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>{item.title}</Component.CustomText>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Component.CustomText style={Styles.filterTitle}>Finish</Component.CustomText>
                            <View style={Styles.flexRow}>
                                {finishFilter.map((item) =>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            _onFinishTagPress(item)
                                        }}
                                        style={[Styles.multiChoiceButtonStyle, {
                                            backgroundColor: item.isSelected ? Config.Theme.COLOR_PRIMARY : Config.Theme.COLOR_WHITE,
                                            borderWidth: item.isSelected ? 0 : 1,
                                            paddingHorizontal: item.isSelected ? 16 : 15,
                                            paddingVertical: item.isSelected ? 4 : 3

                                        }]}>
                                        <Component.CustomText style={[Styles.multiChoiceTextStyle, { color: item.isSelected ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>{item.title}</Component.CustomText>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Component.CustomText style={Styles.filterTitle}>Thickness</Component.CustomText>
                            <View style={Styles.flexRow}>
                                {thicknessFilter.map((item) =>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() => {
                                            _onThicknessTagPress(item)
                                        }}
                                        style={[Styles.multiChoiceButtonStyle, {
                                            backgroundColor: item.isSelected ? Config.Theme.COLOR_PRIMARY : Config.Theme.COLOR_WHITE,
                                            borderWidth: item.isSelected ? 0 : 1,
                                            paddingHorizontal: item.isSelected ? 16 : 15,
                                            paddingVertical: item.isSelected ? 4 : 3

                                        }]}>
                                        <Component.CustomText style={[Styles.multiChoiceTextStyle, { color: item.isSelected ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>{item.title}</Component.CustomText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <TouchableOpacity
                            style={Styles.cancelSelectedItemButton}
                            onPress={() => {
                                setOtpModalVisible(false)
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
