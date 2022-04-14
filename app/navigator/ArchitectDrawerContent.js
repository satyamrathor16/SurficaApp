import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import Component from '../component';
import Config from '../config';
import Utils from '../utils';


export default ArchitectDrawerContent = (props) => {

    const userRole = useSelector(state => state.reducer.userRole)
    const userData = useSelector(state => state.reducer.userData)

    return (
        <View style={styles.mainContainer} >
            <View style={styles.topViewStyle} />
            <TouchableOpacity
                activeOpacity={1}
                style={styles.myAccountView}
                onPress={() => {
                    props.navigation.navigate('EditProfile')
                }}
            >
                <View>
                    <Component.CustomText style={styles.userName}>{userData.name}</Component.CustomText>
                    <Component.CustomText style={styles.userRole}>{userRole == Config.Constants.ARCHITECT ? '(' + Config.Strings.String_en.ARCHITECT + ')' : '(' + Config.Strings.String_en.CARPENTER + ')'}</Component.CustomText>
                    <Component.CustomText style={styles.myAccountText}>My Account</Component.CustomText>
                </View>
                <Image
                    source={Config.Images.ARROW_RIGHT}
                    resizeMode='contain'
                    style={styles.image}
                />
            </TouchableOpacity>
            <ScrollView style={{ marginTop: 10 }}>
                {/* <DrawerItem
                    icon={({ color, size, focused }) => (

                        <Image source={Config.Images.HOME}
                            resizeMode='contain'
                            style={styles.commonIcon}
                        />

                    )}
                    label='Dashboard'
                    labelStyle={styles.commonlabel}
                    onPress={() => { props.navigation.navigate('Dashboard') }}
                /> */}

                <DrawerItem
                    icon={({ color, size, focused }) => (

                        <Image source={Config.Images.PROFILE}
                            resizeMode='contain'
                            style={styles.commonIcon}
                        />

                    )}
                    label='Profile'
                    labelStyle={styles.commonlabel}
                    onPress={() => {
                        // props.navigation.navigate('CMSPages')
                        props.navigation.navigate('PersonalDetails')
                    }}
                />
                {userRole == Config.Constants.ARCHITECT &&
                    <DrawerItem
                        icon={({ color, size, focused }) => (

                            <Image source={Config.Images.REFFERS}
                                resizeMode='contain'
                                style={styles.commonIcon}
                            />

                        )}
                        label={Config.Strings.String_en.RECOMMENDATION}
                        labelStyle={styles.commonlabel}
                        onPress={() => {
                            props.navigation.navigate('Recommendation')
                        }}
                    />
                }
                {userRole == Config.Constants.CARPANTER &&
                    <DrawerItem
                        icon={({ color, size, focused }) => (

                            <Image source={Config.Images.QR_SCANNER}
                                resizeMode='contain'
                                style={styles.commonIcon}
                            />

                        )}
                        label='Scan'
                        labelStyle={styles.commonlabel}
                        onPress={() => {
                            props.navigation.navigate('Scan')
                        }}
                    />
                }
                {userRole == Config.Constants.CARPANTER &&
                    <DrawerItem
                        icon={({ color, size, focused }) => (

                            <Image source={Config.Images.WITHDRAW}
                                resizeMode='contain'
                                style={styles.commonIcon}
                            />

                        )}
                        label='Withdraw'
                        labelStyle={styles.commonlabel}
                        onPress={() => {
                            props.navigation.navigate('Transactions')
                            props.navigation.navigate('withdrawals')
                            // props.navigation.navigate('Recommendation')
                        }}
                    />
                }
                {userRole == Config.Constants.CARPANTER &&
                    <DrawerItem
                        icon={({ color, size, focused }) => (

                            <Image source={Config.Images.RECOMMENDATION}
                                resizeMode='contain'
                                style={styles.commonIcon}
                            />

                        )}
                        label='History'
                        labelStyle={styles.commonlabel}
                        onPress={() => {
                            // if (userRole == Config.Constants.CARPANTER) {
                            props.navigation.navigate('Transactions')
                            props.navigation.navigate('Earned Points')
                            // }
                            //  else {

                            // }
                            // props.navigation.navigate('Recommendation')
                        }}
                    />
                }
                <DrawerItem
                    icon={({ color, size, focused }) => (

                        <Image source={Config.Images.CATALOG}
                            resizeMode='contain'
                            style={styles.commonIcon}
                        />

                    )}
                    label='Catalog'
                    labelStyle={styles.commonlabel}
                    onPress={() => {
                        props.navigation.navigate('Home')
                    }}
                />

                {/* {userRole == Config.Constants.CARPANTER &&
                    <DrawerItem
                        icon={({ color, size, focused }) => (

                            <Image source={Config.Images.RECOMMENDATION}
                                resizeMode='contain'
                                style={styles.commonIcon}
                            />

                        )}
                        label='Transactions'
                        labelStyle={styles.commonlabel}
                        onPress={() => {
                            // props.navigation.navigate('CMSPages')
                        }}
                    />
                } */}
                <DrawerItem
                    icon={({ color, size, focused }) => (

                        <Image source={Config.Images.CONTACT_US}
                            resizeMode='contain'
                            style={styles.commonIcon}
                        />

                    )}
                    label={Config.Strings.String_en.CONTACT_US}
                    labelStyle={styles.commonlabel}
                    onPress={() => { props.navigation.navigate('ContactUs') }}
                />
                <DrawerItem
                    icon={({ color, size, focused }) => (

                        <Image source={Config.Images.ABOUT}
                            resizeMode='contain'
                            style={styles.commonIcon}
                        />

                    )}
                    label='About surfica'
                    labelStyle={styles.commonlabel}
                    onPress={() => {
                        props.navigation.navigate('CMSPages', {
                            title: 'About Surfica',
                            url: 'https://www.surfica.in/about.html'
                        })
                    }}
                />
                <DrawerItem
                    icon={({ color, size, focused }) => (

                        <Image source={Config.Images.PRIVACY}
                            resizeMode='contain'
                            style={styles.commonIcon}
                        />

                    )}
                    label={'T&C and Policies'}
                    labelStyle={styles.commonlabel}
                    onPress={() => {
                        props.navigation.navigate('CMSPages', {
                            title: 'Privacy',
                            url: 'http://surfica.pmcommu.in/privacy-policy'
                        })
                    }}
                />

                <DrawerItem
                    icon={({ color, size, focused }) => (

                        <Image source={Config.Images.LOGOUT}
                            resizeMode='contain'
                            style={styles.commonIcon}
                        />

                    )}
                    label='Logout'
                    labelStyle={styles.commonlabel}
                    onPress={() => {
                        Utils.Method.onLogout();
                        Config.Constants.ROOT_NAVIGATOR.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    { name: 'Login' }
                                ],
                            })
                        );
                        Utils.Method.showToast('Log-Out', 'Successfully Log-Out!', 1);
                    }}
                />
            </ScrollView>
            <View style={styles.secondSocialContainer}>
                <Component.CustomText>Stay Connected</Component.CustomText>
                <View style={styles.socialIconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('https://www.facebook.com/SURFICA-467123550329514');
                        }}>
                        <Image
                            source={Config.Images.FB}
                            resizeMode='contain'
                            style={styles.imageSocial}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(
                                'https://www.instagram.com/surficaindialimited/?utm_medium=copy_link',
                            );
                        }}>
                        <Image
                            source={Config.Images.INSTA}
                            resizeMode='contain'
                            style={styles.imageSocial}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(
                                'https://in.linkedin.com/company/surfica-india-limited',
                            );
                        }}>
                        <Image
                            source={Config.Images.LINKEDIN}
                            resizeMode='contain'
                            style={styles.imageSocial}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL('https://twitter.com/surficaindialtd?s=09');
                        }}>
                        <Image
                            source={Config.Images.TWITTER}
                            resizeMode='contain'
                            style={styles.imageSocial}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    topViewStyle: {
        height: getStatusBarHeight(),
        width: '100%',
        backgroundColor: Config.Theme.COLOR_PRIMARY
    },
    myAccountView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Config.Theme.COLOR_PRIMARY
    },
    image: {
        height: 20,
        width: 20,
        tintColor: Config.Theme.COLOR_WHITE
    },
    userName: {
        fontSize: wp(3.8),
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        color: Config.Theme.COLOR_WHITE
    },
    userRole: {
        fontSize: wp(3),
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        color: Config.Theme.COLOR_WHITE
    },
    myAccountText: {
        fontSize: wp(3.3),
        fontFamily: Config.Theme.FONT_REGULAR,
        color: Config.Theme.COLOR_WHITE
    },
    commonIcon: {
        height: 25,
        width: 25,
        tintColor: Config.Theme.COLOR_PRIMARY
    },
    commonIcon1: {
        height: 21,
        width: 21,
    },
    commonlabel: {
        color: Config.Theme.COLOR_GRAY
    },
    secondSocialContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 20
    },
    imageSocial: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    socialIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    }
})