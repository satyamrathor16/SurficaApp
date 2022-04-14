import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RewardList from '../screens/Carpenter/RewardList/RewardList';
import Withdrawals from '../screens/Carpenter/Withdrawals/Withdrawals';
import Config from '../config';

const Tab = createMaterialTopTabNavigator();
export default TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: Config.Theme.COLOR_PRIMARY,
                }
            }}>
            <Tab.Screen name="Earned Points" component={RewardList} />
            <Tab.Screen name="withdrawals" component={Withdrawals} />
        </Tab.Navigator>
    );
}
