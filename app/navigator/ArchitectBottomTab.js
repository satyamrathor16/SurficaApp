import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../screens/Architect/Home/Home';
import HomeCarpenter from '../screens/Carpenter/Home/Home';
import Recommendation from '../screens/Architect/Recommendation/Recommendation';
import EditProfile from '../screens/EditProfile/EditProfile';

import Config from '../config';
import UserSession from '../utils/UserSession';
import Scan from '../screens/Carpenter/Scan/Scan';
import RewardList from '../screens/Carpenter/RewardList/RewardList';
import Transactions from '../screens/Carpenter/Transactions/Transactions';


const CustomTabButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={onPress}
        >
            <View style={{ width: 70, height: 70, borderRadius: 40 }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}


const Tab = createBottomTabNavigator();

export default ArchitectBottomTab = () => {

    const userRole = useSelector(state => state.reducer.userRole)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Config.Theme.COLOR_PRIMARY,
                tabBarInactiveTintColor: Config.Theme.COLOR_GRAY
            }}
        >
            <Tab.Screen name="Home" component={userRole == Config.Constants.ARCHITECT ? Home : HomeCarpenter}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (
                        <Image source={Config.Images.HOME} style={[styles.imageIcon, { tintColor: color }]} resizeMode='contain' />
                    )
                }} />
            {userRole == Config.Constants.ARCHITECT &&
                <Tab.Screen name="Recommendation" component={Recommendation}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <Image source={Config.Images.REFFERS} style={[styles.imageIcon, { tintColor: color }]} resizeMode='contain' />
                        )
                    }}
                />
            }
            {userRole == Config.Constants.CARPANTER &&
                <Tab.Screen name="Transactions" component={Transactions}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <Image source={Config.Images.RECOMMENDATION} style={[styles.imageIcon, { tintColor: color }]} resizeMode='contain' />
                        )
                    }}
                />
            }
            {userRole == Config.Constants.CARPANTER &&
                <Tab.Screen name="Scan" component={Scan}
                    options={{
                        tabBarIcon: ({ color, focused, size }) => (
                            <Image source={Config.Images.QR_SCANNER} style={[styles.imageIcon, { tintColor: color }]} resizeMode='contain' />
                        )
                    }} />
            }
            <Tab.Screen name="EditProfile" component={EditProfile}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (
                        <Image source={Config.Images.PROFILE} style={[styles.imageIcon, { tintColor: color }]} resizeMode='contain' />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    imageIcon: {
        height: 25,
        width: 25,
    }
})

