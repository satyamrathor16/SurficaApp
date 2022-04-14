import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Component from "./app/component";
import MainNavigator from './app/navigator/MainNavigator';
import { Provider } from 'react-redux';
import Store from './app/store';
const App = () => {

  return (
    <Provider store={Store}>
      <Component.MainContainer>
        <MainNavigator />
      </Component.MainContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  }
});

export default App;
