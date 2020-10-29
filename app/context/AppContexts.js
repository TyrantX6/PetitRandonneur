import 'react-native-gesture-handler';
import React, {useState, useEffect, createContext} from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { NetworkProvider } from 'react-native-offline';
import FlashMessage from 'react-native-flash-message';
import axios from 'axios';
import myConfig from '../myConfig';

export const UserDataContext = createContext();


export default AppContexts = ({children}) => {

  const [user, setUser] = useState(null);

  //console.log('USER DATA FROM APP:', user)

  const restoreUserDataFromAsyncStorage = () =>  {
    AsyncStorage.getItem('user')
      .then(res => JSON.parse(res))
      .then(data => {
          //console.log(data)
          setUser(data)
          console.log(user)
        }
      )
      .catch(err => console.log(err))
  }

  // const refreshUser = async () => {
  //   console.log('REFRESHHHH', user.tokens.refresh)
  //   axios.post(myConfig.API_REQUEST+'api/token/refresh/', {
  //     refresh: user.tokens.refresh
  //   })
  //     .then(function (response) {
  //       console.log('THE TOKEN:', response.data);
  //       let newToken = response.data;
  //       setUser({ ...user, Token });
  //     })
  //     .catch(function (error) {
  //       console.log(error.response);
  //       showMessage({
  //         message: "Attention",
  //         description: "Vos identifiants ont expiré, par mesure de sécurité merci de vous reconnecter.",
  //         type: "warning",
  //       });
  //     });
  // };

  useEffect( () => {
    // restoreUserDataFromAsyncStorage();
    // if (user) {
    //   refreshUser();
    //   console.log('NEW USER', user);
    // }
  }, [])

  useEffect( () => {
    AsyncStorage.setItem('user', JSON.stringify(user));
  }, [user]);



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
