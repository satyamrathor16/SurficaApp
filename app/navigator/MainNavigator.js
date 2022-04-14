import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/Splash/Splash';
import SelectRole from '../screens/SelectRole/SelectRole';
import Signup from '../screens/Signup/Signup';
import Login from '../screens/Login/Login';
import ArchitectDrawer from './ArchitectDrawer';
import PersonalDetails from '../screens/PersonalDetails.js/PersonalDetails';
import BankDetails from '../screens/BankDetails/BankDetails';
import CustomerDetails from '../screens/CustomerDetails/CustomerDetails';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import LaminateList from '../screens/LaminateList/LaminateList';
import CMSPages from '../screens/CMSPages/CMSPages';
import LaminateDetails from '../screens/LaminateDetails/LaminateDetails';
import ClientDirectory from '../screens/ClientDirectory/ClientDirectory';

const Stack = createStackNavigator();

export default MainNavigtor = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='SplashScreen'
      >
        <Stack.Screen name='SplashScreen' component={Splash} />
        <Stack.Screen name='SelectRole' component={SelectRole} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='ArchitectDrawer' component={ArchitectDrawer} />
        <Stack.Screen name='PersonalDetails' component={PersonalDetails} />
        <Stack.Screen name='BankDetails' component={BankDetails} />
        <Stack.Screen name='CustomerDetails' component={CustomerDetails} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='LaminateList' component={LaminateList} />
        <Stack.Screen name='LaminateDetails' component={LaminateDetails} />
        <Stack.Screen name='ClientDirectory' component={ClientDirectory} />
        <Stack.Screen name='CMSPages' component={CMSPages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
