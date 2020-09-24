import React from "react";
import { Image, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import StoryScreen from "../screens/StoryScreen";

const Stack = createStackNavigator();


function LogoTitle() {
  return (
    <Image
      style={{ width: 300, height: 54, resizeMode:'contain'}}
      source={require('../assets/appPictures/logoTitle.png')}
    />
  );
}


const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen"
                    component={HomeScreen}
                    options={{
                      headerTitle: props => <LogoTitle {...props} /> ,
                      headerTitleAlign : 'center',
                      headerStyle: {
                        backgroundColor: '#43820D',
                        height: 60
                      },
                      headerTintColor: '#E6E1C5',
                    }}
      />
      <Stack.Screen name="StoryScreen"
                    component={StoryScreen}
                    options={{
                      headerTitle: props => <LogoTitle {...props} /> ,
                      headerTitleAlign : 'center',
                      headerStyle: {
                        backgroundColor: '#43820D',
                      },
                      headerTintColor: '#E6E1C5',
                    }}
      />

    </Stack.Navigator>
  );
}

export { MainStackNavigator };
