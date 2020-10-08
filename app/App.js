import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export const UserDataContext = React.createContext();

export default App = () => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [favorites, setFavorites] = useState(null);


  console.log('USER DATA FROM APP:', user)


  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </UserDataContext.Provider>
  )
};

const styles = StyleSheet.create({});
