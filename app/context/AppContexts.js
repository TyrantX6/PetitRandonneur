import 'react-native-gesture-handler';
import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { NetworkProvider } from 'react-native-offline';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import myConfig from '../myConfig';

export const UserDataContext = createContext();


export default AppContexts = ({children}) => {

  const [user, setUser] = useState(null);
  const [restoredUser, setRestoredUser] = useState(false)

  console.log('USER DATA FROM APP:', user)

  const restoreUserDataFromAsyncStorage = () =>  {
    AsyncStorage.getItem('user')
      .then(res => JSON.parse(res))
      .then(data => {
          //console.log(data)
          setUser(data)
          setRestoredUser(true)
          console.log(user)
        }
      )
      .catch(err => console.log(err))
  }

  const refreshUser = async () => {
    if (user) {
      //console.log('REFRESHHHH', user.tokens.refresh)
      axios.post(myConfig.API_REQUEST+'api/token/refresh/', {
        refresh: user.tokens.refresh
      })
        .then(function (response) {
          console.log('REFRESHED ACCESS TOKEN:', response);
          let newToken = response.data.access;
          setUser({ ...user, tokens : {...user.tokens, access: newToken} });
        })
        .catch(function (error) {
          console.log(error.response);
          setUser(null);
          showMessage({
            message: "Attention",
            description: "Votre session a expiré, par mesure de sécurité merci de vous reconnecter.",
            type: "warning",
          });

        });
    }

   };

  useEffect( () => {
    restoreUserDataFromAsyncStorage();
  }, [])

  useEffect( () => {
    AsyncStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect( () => {
    if (user) {
      refreshUser();
    }
  }, [restoredUser])


  console.log('REFRESHED USER', user);
  //externalization of some components wrapping the app, to break the require cycles in the react native warnings
  return (
    <NetworkProvider>
        <UserDataContext.Provider value={{ user, setUser }}>
          {children}
          <FlashMessage position="top" />
        </UserDataContext.Provider>
    </NetworkProvider>
  )
};
