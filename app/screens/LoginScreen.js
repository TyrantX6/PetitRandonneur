import React, {useState, useEffect, useContext} from 'react';
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
import { UserDataContext } from '../context/AppContexts';
import axios from 'axios';
import myConfig from '../myConfig';
import {showMessage} from 'react-native-flash-message';
import {NetworkConsumer} from 'react-native-offline';



export default LoginScreen = ({navigation}) => {

  const userData = React.useContext(UserDataContext);

  // states used for authentication
  const [inputUsernameConnect, setInputUsernameConnect] = useState('Merlin');
  const [inputPasswordConnect, setInputPasswordConnect] = useState('enchanteur');

  // states used for registration
  const [inputUsername, setInputUsername] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');

  const connectUser = async () => {
    const userInfo = await axios.get(myConfig.API_REQUEST+'appusers/'+ inputUsernameConnect )
      .then(function (response) {
        console.log('USER INFO:' , response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response);
      });

    axios.post(myConfig.API_REQUEST+'api/token/', {
      username: inputUsernameConnect,
      password: inputPasswordConnect
    })
      .then(function (response) {
        //console.log('THE TOKEN:', response.data);
        let tokens = response.data
        //console.log('TOKENSSSS:', tokens);
        userData.setUser({ ...userInfo, ...userData.user, tokens });
      })
      .catch(function (error) {
        console.log(error.response);
        showMessage({
          message: "Attention",
          description: "Vos identifiants ne sont pas corrects.",
          type: "warning",
        });
      });
  };

  const sendUserToDatabase = async () => {
    if ((inputPassword) && (inputPasswordCheck) && (inputEmail) && (inputUsername)) {
      if (inputPassword === inputPasswordCheck){
        axios.post(myConfig.API_REQUEST+'appusers/', {
          username: inputUsername,
          email: inputEmail,
          password: inputPassword
        })
          .then(function (response) {
            console.log(response);
            showMessage({
              message: "Succès",
              description: "Votre compte à bien été créé, vous pouvez vous connecter plus haut.",
              type: "success",
            });
            setInputUsernameConnect(inputUsername)
            setInputPasswordConnect(inputPassword)
          })
          .catch(function (error) {
            console.log(error.response.data);
            if  ('username' in error.response.data) {
              showMessage({
                message: "Attention",
                description: "Un compte existe déjà ce pseudo.",
                type: "danger",
              });
            } else if('email' in error.response.data) {
              showMessage({
                message: "Attention",
                description: "L'adresse mail n'est pas au bon format ou un compte existe déjà avec cette adresse mail.",
                type: "danger",
              });
            } else if('password' in error.response.data) {
              showMessage({
                message: "Attention",
                description: "Le mot de passe ne remplit pas tous les critères.",
                type: "danger",
              });
            }
          });
      } else {
        showMessage({
          message: "Attention",
          description: "Les mots de passe ne correspondent pas",
          type: "warning",
        });
      }
    }
    else {
      showMessage({
        message: "Problème",
        description: "Tous les champs de la section 'Création de compte' sont requis. Merci de les compléter.",
        type: "danger",
      });
    }

  };

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* top section, authentification */}
        <View style={styles.topSection}>
          <Text style={styles.topTitle}>Se connecter</Text>
          <View style={styles.labelsContainer}>
            <Text style={styles.labels}>Pseudo:</Text>
          </View>
          <TextInput style={styles.topFields}
                     multiline={true}
                     onChangeText={setInputUsernameConnect}
                     placeholder = {'pseudo'}
                     placeholderTextColor="#E6E1C5"
                     value={inputUsernameConnect}
          />
          <View style={styles.labelsContainer}>
            <Text style={styles.labels}>Mot de passe:</Text>
          </View>
          <TextInput style={styles.topFields}
                     onChangeText={setInputPasswordConnect}
                     placeholder = {'mot de passe'}
                     placeholderTextColor="#E6E1C5"
                     secureTextEntry={true}
                     value={inputPasswordConnect}
          />

          <NetworkConsumer>
            {({isConnected}) => (
              isConnected ? (
                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={connectUser}
                >
                  <Text style={styles.connectButtonText}>Connexion</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{...styles.connectButton, backgroundColor:'#A0A0A0'}}
                  onPress={() => showMessage({
                    message: "Attention",
                    description: "Merci de vous reconnecter à Internet avant d'essayer de vous connecter",
                    type: "warning",
                  })}
                >
                  <Text style={styles.connectButtonText}>Connexion</Text>
                </TouchableOpacity>
              )
            )}
          </NetworkConsumer>

        </View>

        {/* bottom section, registration */}
        <View style={styles.bottomSection} >
          <Text style={styles.bottomTitle}>Création de compte</Text>

          <View style={styles.labelsContainer}>
            <Text style={styles.labelsLight}>Pseudo:</Text>
          </View>
          <TextInput style={styles.bottomFields}
                     multiline={true}
                     numberOfLines={1}
                     onChangeText={setInputUsername}
                     placeholder = {'pseudo'}
                     placeholderTextColor="#0C2E06"
                     value={inputUsername}
          /><View style={styles.fieldsLimitsContainer}>
          <Text style={styles.fieldsLimits}>Ne doit pas déjà être utilisé{"\n"}25 caractères max.</Text>
        </View>
          <View style={styles.labelsContainer}>
            <Text style={styles.labelsLight}>E-mail:</Text>
          </View>
          <TextInput style={styles.bottomFields}
                     multiline={true}
                     onChangeText={setInputEmail}
                     placeholder = {'e-mail'}
                     placeholderTextColor="#0C2E06"
                     value={inputEmail}
          />
          <View style={styles.fieldsLimitsContainer}>
            <Text style={styles.fieldsLimits}>Ne doit pas déjà être utilisé{"\n"}255 caractères max.</Text>
          </View>

          <View style={styles.labelsContainer}>
            <Text style={styles.labelsLight}>Mot de passe:</Text>
          </View>
          <TextInput style={styles.bottomFields}
                     onChangeText={setInputPassword}
                     placeholder = {'mot de passe'}
                     placeholderTextColor="#0C2E06"
                     secureTextEntry={true}
                     value={inputPassword}
          />
          <View style={styles.fieldsLimitsContainer}>
            <Text style={styles.fieldsLimits}>8 caractères minimum{"\n"}Au moins une lettre{"\n"} Pas trop commun</Text>
          </View>

          <View style={styles.labelsContainer}>
            <Text style={styles.labelsLight}>Confirmation:</Text>
          </View>
          <TextInput style={styles.bottomFields}
                     onChangeText={setInputPasswordCheck}
                     placeholder = {'vérification mot de passe'}
                     placeholderTextColor="#0C2E06"
                     secureTextEntry={true}
                     value={inputPasswordCheck}
          />

          <NetworkConsumer>
            {({isConnected}) => (
              isConnected ? (
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={sendUserToDatabase}
                >
                  <Text style={styles.sendButtonText}>Soumettre</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ ...styles.sendButton, backgroundColor:'#A0A0A0'}}
                  onPress={() => showMessage({
                    message: "Attention",
                    description: "Merci de vous reconnecter à Internet avant d'essayer de créer votre compte.",
                    type: "warning",
                  })}
                >
                  <Text style={styles.sendButtonText}>Soumettre</Text>
                </TouchableOpacity>
              )
            )}
          </NetworkConsumer>


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
    borderRadius: 30,
    marginVertical : 16,
    width: '40%',
  },
  connectButtonText : {
    fontSize: 18,
    fontFamily: "JosefinSans-Regular",
    paddingVertical : 15,
    paddingHorizontal: 2,
    color : '#E6E1C5',
    textAlign: 'center',
  },
  container: {
    alignItems: "center",
    backgroundColor : "#E6E1C5",
    flex: 1,
    justifyContent: "center",
  },
  fieldsLimits: {
    alignSelf: 'flex-end',
    color: '#E6E1C5',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 12,
    marginTop: -8,
    textAlign : 'right'
  },
  fieldsLimitsContainer: {
    width: '76%',
  },
  labels: {
    alignSelf: 'flex-start',
    color: '#495057',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    marginBottom: -6,
  },
  labelsContainer: {
    marginTop: 8,
    width: '76%',
  },
  labelsLight: {
    alignSelf: 'flex-start',
    color: '#E6E1C5',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    marginBottom: -6,
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
    fontSize : 18,
    paddingVertical : 15,
    paddingHorizontal: 2,
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
