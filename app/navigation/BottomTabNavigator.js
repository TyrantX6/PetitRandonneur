import React, {useContext} from "react";
import {
  MainStackNavigator,
  NotLoggedInNavigator,
  LoggedInNavigator,
  WritingNavigator,
  NotLoggedInWritingNavigator,
} from './StackNavigator';

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { UserDataContext } from '../context/AppContexts';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

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

      {
      userData.user == null ?
        <Tab.Screen
          name="NotLoggedInWriteScreen"
          component={NotLoggedInWritingNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <IconMaterial name="pencil-circle-outline" color={color} size={50} />
            ),
          }}
        />:
        <Tab.Screen
          name="WriteStoryScreen"
          component={WritingNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <IconMaterial name="pencil-circle-outline" color={color} size={50} />
            ),
          }}
        />
    }


      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
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
              tabBarIcon: ({ color }) => (
                <Icon name="person-circle-outline" color={color} size={50} />
              ),
            }}
          /> :
          <Tab.Screen
            name="LoginScreen"
            component={LoggedInNavigator}
            options={{
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
