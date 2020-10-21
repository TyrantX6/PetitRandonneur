import 'react-native-gesture-handler';
import AppContexts from './context/AppContexts';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default App = () => {

  return (
    <AppContexts>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </AppContexts>
  )
};
