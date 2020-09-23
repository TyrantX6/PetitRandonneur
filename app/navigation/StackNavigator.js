import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import StoryScreen from "../screens/StoryScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen"
                    component={HomeScreen}
                    options={{
                      title: 'Petit Randonneur',
                      headerStyle: {
                        backgroundColor: '#56AD00',
                      },
                      headerTintColor: 'white',
                    }}
      />
      <Stack.Screen name="StoryScreen"
                    component={StoryScreen}
                    options={{
                      title: 'Histoire du lieu',
                      headerStyle: {
                        backgroundColor: '#56AD00',
                      },
                      headerTintColor: 'white',
                    }}
      />

    </Stack.Navigator>
  );
}

export { MainStackNavigator };
