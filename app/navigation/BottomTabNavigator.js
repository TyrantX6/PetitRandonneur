import React, {useContext} from "react";

import {MainStackNavigator, NotLoggedInNavigator, LoggedInNavigator, WritingNavigator} from './StackNavigator';


import WriteStoryScreen from "../screens/WriteStoryScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { UserDataContext } from '../App';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';




const BottomTabNavigator = () => {

  const userData = useContext(UserDataContext);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions = {{
        showLabel : false,
        activeBackgroundColor : '#43820D',
        inactiveBackgroundColor : '#43820D',
        activeTintColor : '#fff',
        inactiveTintColor : '#E6E1C5',
        keyboardHidesTabBar: true,
        style: {
          height: 60
        },
      }}

    >
      <Tab.Screen
        name="WriteStoryScreen"
        component={WritingNavigator}
        options={{
          tabBarLabel: 'Suggérer',
          tabBarIcon: ({ color }) => (
            <IconMaterial name="pencil-circle-outline" color={color} size={50} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Icon name="earth-sharp" color={color} size={86}
                  style={{ width: 100, height : 124, backgroundColor: '#43820D', borderRadius: 130, textAlign: 'center'
                  }}/>
          )
        }}
      />

      {
        userData.user == null ?
          <Tab.Screen
            name="LoginScreen"
            component={NotLoggedInNavigator}
            options={{
              tabBarLabel: 'Identification',
              tabBarIcon: ({ color }) => (
                <Icon name="person-circle-outline" color={color} size={50} />
              ),
            }}
          /> :
          <Tab.Screen
            name="LoginScreen"
            component={LoggedInNavigator}
            options={{
              tabBarLabel: 'Identification',
              tabBarIcon: ({ color }) => (
                <Icon name="person-circle-outline" color={color} size={50} />
              ),
            }}
          />
      }

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
