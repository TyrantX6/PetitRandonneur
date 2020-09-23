import React from "react";

import { MainStackNavigator } from "./StackNavigator";

import LoginScreen from "../screens/LoginScreen";
import WriteStoryScreen from "../screens/WriteStoryScreen";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      shifting={true}
    >
      <Tab.Screen
        name="WriteStoryScreen"
        component={WriteStoryScreen}
        options={{
          tabBarLabel: 'Proposer',
          tabBarColor: '#c9009e',
          tabBarIcon: ({ color }) => (
            <Icon name="pencil" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'Accueil',
          tabBarColor: '#56AD00',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Identification',
          tabBarColor: '#00ad8e',
          tabBarIcon: ({ color }) => (
            <Icon name="log-in" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
