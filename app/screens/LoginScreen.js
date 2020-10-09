import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserDataContext } from '../App';
import axios from 'axios';
import myConfig from '../myConfig';


export default LoginScreen = ({navigation}) => {
  // states used for authentification
  const [inputUsernameConnect, setInputUsernameConnect] = useState('Arandeira');
  const [inputPasswordConnect, setInputPasswordConnect] = useState('grenouille');
  const [connectToken, setConnectToken] = useState('');

  // states used for registration
  const [inputUsername, setInputUsername] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');

  //general states
  const [loading, setLoading] = useState(true)

  const userData = React.useContext(UserDataContext);

  useEffect(() => {
    console.log(inputEmail);
  }, [inputPasswordCheck]);

  //console.log('user DATA:', userData)

  const connectUser = async () => {
    const userInfo = await axios.get(myConfig.API_REQUEST+'appusers/'+ inputUsernameConnect )
      .then(function (response) {
        //console.log('USER INFO:' , response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response);
        alert('Identifiant inconnu.')
      });

    axios.post(myConfig.API_REQUEST+'api/token/', {
      username: inputUsernameConnect,
      password: inputPasswordConnect
    })
      .then(function (response) {
        //console.log('THE TOKEN:', response.data);
        let tokens = response.data;
        userData.setUser({ ...userInfo, ...userData.user, tokens });
      })
      .catch(function (error) {
        console.log(error.response);
        alert('Mauvais pseudo ou mot de passe.')
      });
  };

  const sendUserToDatabase = async () => {
    if (inputPassword === inputPasswordCheck){
      axios.post(myConfig.API_REQUEST+'appusers/', {
        username: inputUsername,
        email: inputEmail,
        password: inputPassword
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response);
          alert("Un compte existe déjà avec les informations fournies.")
        });
    } else {
      alert('Les mots de passe ne correspondent pas.')
    }
  };






  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* top section, authentification */}
        <View style={styles.topSection}>
          <Text style={styles.topTitle}>Se connecter</Text>
          <TextInput style={styles.topFields}
                     multiline={true}
                     onChangeText={setInputUsernameConnect}
                     placeholder = {'pseudo'}
                     placeholderTextColor="#E6E1C5"
                     value={inputUsernameConnect}
          />

          <TextInput style={styles.topFields}
                     onChangeText={setInputPasswordConnect}
                     placeholder = {'mot de passe'}
                     placeholderTextColor="#E6E1C5"
                     secureTextEntry={true}
                     value={inputPasswordConnect}
          />
          <TouchableOpacity
            style={styles.connectButton}
            onPress={connectUser}
          >
            <Text style={styles.connectButtonText}>Connexion</Text>
          </TouchableOpacity>
        </View>

        {/* bottom section, registration */}
        <View style={styles.bottomSection} >
          <Text style={styles.bottomTitle}>Création de compte</Text>

          <TextInput style={styles.bottomFields}
                     multiline={true}
                     numberOfLines={1}
                     onChangeText={setInputUsername}
                     placeholder = {'pseudo'}
                     placeholderTextColor="#0C2E06"
                     value={inputUsername}
          />

          <TextInput style={styles.bottomFields}
                     multiline={true}
                     onChangeText={setInputEmail}
                     placeholder = {'e-mail'}
                     placeholderTextColor="#0C2E06"
                     value={inputEmail}
          />

          <TextInput style={styles.bottomFields}
                     onChangeText={setInputPassword}
                     placeholder = {'mot de passe'}
                     placeholderTextColor="#0C2E06"
                     secureTextEntry={true}
                     value={inputPassword}
          />
          <TextInput style={styles.bottomFields}
                     onChangeText={setInputPasswordCheck}
                     placeholder = {'vérification mot de passe'}
                     placeholderTextColor="#0C2E06"
                     secureTextEntry={true}
                     value={inputPasswordCheck}
          />


          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendUserToDatabase}
          >
            <Text style={styles.sendButtonText}>Soumettre</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  bottomFields: {
    backgroundColor:'#E6E1C5',
    borderRadius:30,
    width: '80%',
    textAlign : 'center',
    fontSize : 18,
    fontFamily: "JosefinSans-Regular",
    marginVertical: 6,
    color: '#0C2E06'
  },
  bottomSection : {
    alignItems: "center",
    backgroundColor : '#713309',
    borderTopColor: "#FF8811",
    borderTopWidth : 5,
    paddingBottom : 30,
    width: (Dimensions.get('window').width),
  },
  bottomTitle: {
    alignItems: "center",
    color : "#E6E1C5",
    fontFamily: "JosefinSans-Regular",
    fontSize : 24,
    marginVertical: 20,
    textAlign: "center",
  },
  connectButton: {
    alignItems: "center",
    backgroundColor: "#005554",
    borderRadius:30,
    marginVertical : 16,
    width: '40%',
  },
  connectButtonText : {
    fontSize : 20,
    fontFamily: "JosefinSans-Regular",
    padding : 15,
    color : '#E6E1C5',
    textAlign: 'center',
  },
  container: {
    alignItems: "center",
    backgroundColor : "#E6E1C5",
    flex: 1,
    justifyContent: "center",

  },
  sendButton: {
    alignItems: "center",
    backgroundColor: "#FF8811",
    borderRadius:30,
    marginVertical : 16,
    width: '40%',
  },
  sendButtonText : {
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    padding : 15,
    textAlign: 'center',
  },
  topFields: {
    backgroundColor:'#2CA6A4',
    borderRadius:30,
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 18,
    marginVertical: 6,
    textAlign : 'center',
    width: '80%',
  },
  topSection : {
    alignItems: "center",
    marginVertical : 16,
    width: (Dimensions.get('window').width),
  },
  topTitle: {
    alignItems: "center",
    color : "#005554",
    fontFamily: "JosefinSans-Regular",
    fontSize : 24,
    marginBottom: 20,
    marginTop: 6,
    textAlign: "center",
  },

});
