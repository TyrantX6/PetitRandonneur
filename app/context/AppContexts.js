import 'react-native-gesture-handler';
import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { NetworkProvider } from 'react-native-offline';
import FlashMessage from 'react-native-flash-message';

export const UserDataContext = createContext();
export const NetworkContext = createContext();

export default AppContexts = ({children}) => {

  const [user, setUser] = useState(null);

  //console.log('USER DATA FROM APP:', user)

  const restoreUserDataFromAsyncStorage = () =>  {
    AsyncStorage.getItem('user')
      .then(res => JSON.parse(res))
      .then(data => {
          //console.log(data)
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
    <NetworkProvider>
        <UserDataContext.Provider value={{ user, setUser }}>
          {children}
          <FlashMessage position="top" />
        </UserDataContext.Provider>
    </NetworkProvider>
  )
};
