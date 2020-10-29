import 'react-native-gesture-handler';
import AppContexts from './context/AppContexts';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default App = () => {
//very simple App.js file, included in the {children} in AppContext.js
  return (
    <AppContexts>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </AppContexts>
  )
};
