import React from 'react';
import { View, Text } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import ArchitectBottomTab from './ArchitectBottomTab';
import CMSPages from '../screens/CMSPages/CMSPages';
import ArchitectDrawerContent from './ArchitectDrawerContent';
import ContactUs from '../screens/ContactUs/ContactUs';
import Scan from '../screens/Carpenter/Scan/Scan';

const Drawer = createDrawerNavigator();

export default ArchitectDrawer = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown:false, drawerType:'slide'}} drawerContent={(props)=><ArchitectDrawerContent {...props} />} >
            <Drawer.Screen name="Dashboard" component={ArchitectBottomTab} />
            <Drawer.Screen name="CMSPages" component={CMSPages} />
            <Drawer.Screen name="ContactUs" component={ContactUs} />
        </Drawer.Navigator>
    );
}
