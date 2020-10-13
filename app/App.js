import 'react-native-gesture-handler';
import React, {useState, createContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export const UserDataContext = createContext();

export default App = () => {

  const [user, setUser] = useState(null);

  console.log('USER DATA FROM APP:', user)


  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </UserDataContext.Provider>
  )
};

