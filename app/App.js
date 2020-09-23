import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from "./navigation/BottomTabNavigator";


const Stack = createStackNavigator();


export default App = () => {


  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({});
