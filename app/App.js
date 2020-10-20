import 'react-native-gesture-handler';
import React, {useState, useEffect, createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import AsyncStorage from "@react-native-community/async-storage";


export const UserDataContext = createContext();

export default App = () => {

  const [user, setUser] = useState(null);

  //console.log('USER DATA FROM APP:', user)


  const restoreUserDataFromAsyncStorage = () =>  {
    AsyncStorage.getItem('user')
      .then(res => JSON.parse(res))
      .then(data => {
        console.log(data)
        setUser(data)
        }
      )
      .catch(err => console.log(err))
  }

  useEffect( () => {
    restoreUserDataFromAsyncStorage();
  }, [])

  useEffect( () => {
    AsyncStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <BottomTabNavigator/>
      </NavigationContainer>
    </UserDataContext.Provider>
  )
};

