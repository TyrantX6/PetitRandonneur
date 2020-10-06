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
import axios from 'axios';
import myConfig from '../myConfig';



export default LoginScreen = ({navigation}) => {

  const [inputUsername, setInputUsername] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');
  const [loading, setLoading] = useState(true)


  const userData = {};
  userData.username = {inputUsername}
  userData.email = {inputEmail}
  userData.password = {inputPassword}

  useEffect(() => {
    console.log(inputPassword);
    console.log(inputEmail);
    console.log(inputUsername);
  }, [inputPasswordCheck]);



  const sendUserToDatabase = async () => {

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
      });
  };
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topSection}>

        </View>
        <View style={styles.bottomSection} >
          <Text style={styles.bottomTitle}>Création de compte</Text>
          <TextInput style={styles.fields}
                     onChangeText={setInputUsername}
                     placeholder = {'pseudo'}
                     placeholderTextColor="#0C2E06"
                     value={inputUsername}
          />

          <TextInput style={styles.fields}
                     onChangeText={setInputEmail}
                     placeholder = {'e-mail'}
                     placeholderTextColor="#0C2E06"
                     value={inputEmail}
          />

          <TextInput style={styles.fields}
                     onChangeText={setInputPassword}
                     placeholder = {'mot de passe'}
                     placeholderTextColor="#0C2E06"
                     value={inputPassword}
                     secureTextEntry={true}
          />
          <TextInput style={styles.fields}
                     onChangeText={setInputPasswordCheck}
                     placeholder = {'vérification mot de passe'}
                     placeholderTextColor="#0C2E06"
                     value={inputPasswordCheck}
                     secureTextEntry={true}
          />


          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendUserToDatabase}
          >
            <Text style={styles.buttonText}>Soumettre</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>


    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  bottomSection : {
    alignItems: "center",
    backgroundColor : '#713309',
    borderTopColor: "#FF8811",
    borderTopWidth : 5,
    width: (Dimensions.get('window').width),
  },
  topSection : {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#E6E1C5"
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: "#FF8811",
    borderRadius:30,
    marginVertical : 16,
    width: '40%',
  },
  buttonText : {
    fontSize : 18,
    fontFamily: "JosefinSans-Regular",
    padding : 15,
  },
  bottomTitle: {
    alignItems: "center",
    color : "#E6E1C5",
    fontFamily: "JosefinSans-Regular",
    fontSize : 24,
    marginVertical: 20,
    textAlign: "center",
    paddingHorizontal: 70
  },
  fields: {
    backgroundColor:'#E6E1C5',
    borderRadius:30,
    width: '80%',
    textAlign : 'center',
    fontSize : 20,
    fontFamily: "JosefinSans-Regular",
    marginVertical: 6,
    color: 'black'

  }

});
