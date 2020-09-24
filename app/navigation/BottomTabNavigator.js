import React from "react";
import {TouchableOpacity, View, Text} from "react-native";
import { MainStackNavigator } from "./StackNavigator";

import LoginScreen from "../screens/LoginScreen";
import WriteStoryScreen from "../screens/WriteStoryScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions = {{
        showLabel : false,
        activeBackgroundColor : '#43820D',
        inactiveBackgroundColor : '#43820D',
        activeTintColor : '#fff',
        inactiveTintColor : '#E6E1C5',
        style: {
          height: 60
        },
      }}

    >
      <Tab.Screen
        name="WriteStoryScreen"
        component={WriteStoryScreen}
        options={{
          tabBarLabel: 'Suggérer',
          tabBarIcon: ({ color }) => (
            <Icon2 name="pencil-circle-outline" color={color} size={54} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Icon name="earth-sharp" color={color} size={90}
                  style={{ width: 100, height : 134, backgroundColor: '#43820D', borderRadius: 130, textAlign: 'center'
                  }}/>
          )
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Identification',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={54} />
          ),
        }}
      />


    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
