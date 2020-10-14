import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
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

import IconIonic from 'react-native-vector-icons/Ionicons';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFA from 'react-native-vector-icons/FontAwesome5';


export default UserPageScreen = ({navigation}) => {


  const userData = useContext(UserDataContext);

  const [oldPassword, setOldPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');

  console.log('user DATA:', userData);

  const data = {
    "user": userData.user
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + userData.user.tokens.access
  }


  const logout = () => {
    userData.setUser(null);
  };

  const deleteConfirm = () => {
    Alert.alert(
      'Confirmez-vous la demande de suppression de votre compte?',
      'Êtes-vous sûr et certain de vouloir supprimer votre compte, vous perdrez la possibilité de vous connecter et vos favoris. Les histoires que vous avez écrites resteront mais votre nom sera remplacé par "Auteur Anonyme".',
      [
        {
          text: 'Annulation',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Confirmation',
          onPress: () => deleteAccount()
        }
      ]
    );
  };

  const deleteAccount = async () => {
    await axios.delete(myConfig.API_REQUEST+'appusers/'+ userData.user.username +'/'
      , data, {
        headers: headers
      })
      .then(function (response) {
        logout();
        navigation.navigate('HomeScreen');
      })
      .catch(function (error) {
        console.log(error.response);
        alert('La suppression ne s\'est pas bien déroulée. Ré-essayez plus tard.')
      });

  }

  const changePassword = async () => {
    if (inputPassword === inputPasswordCheck) {
      await axios.patch(myConfig.API_REQUEST+'appusers/'+ userData.user.username + '/'
        , {password : inputPassword}, {
          headers: headers
        })
        .then(function (response) {
          alert('Correctement effectué.')
        })
        .catch(function (error) {
          console.log(error.response);
          alert('Problème avec la procédure')
        });
    } else {
      alert('Les deux mots de passe ne correspondent pas entre eux. Merci de les corriger avant de ré-essayer.')
    }

  };

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.accountSection}>
          <Text style={styles.accountTitle}>Mon compte</Text>
          <Text style={styles.accountData}>Mon pseudo : {userData.user.username}</Text>
          <Text style={styles.accountData}>Mon email : {userData.user.email}</Text>


          <View style={styles.changePasswordSection}>
            <Text style={styles.changePasswordSectionTitle}>Changement mot de passe</Text>

            <TextInput style={styles.oldPasswordField}
                       onChangeText={setOldPassword}
                       placeholder = {'✍️ ancien mot de passe'}
                       placeholderTextColor="#E6E1C5"
                       secureTextEntry={true}
                       value={oldPassword}
            />


            <View style={styles.changePasswordWrapper}>
              <TextInput style={styles.newPasswordFields}
                         onChangeText={setInputPassword}
                         placeholder = {'✍️ nouveau'}
                         placeholderTextColor="#0C2E06"
                         secureTextEntry={true}
                         value={inputPassword}
              />
              <TextInput style={styles.newPasswordFields}
                         onChangeText={setInputPasswordCheck}
                         placeholder = {'✍️ confirmez-le'}
                         placeholderTextColor="#0C2E06"
                         secureTextEntry={true}
                         value={inputPasswordCheck}
              />

          </View>
            <Text style={styles.changePasswordSectionSubhead}> Envoyer :</Text>
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={changePassword}
            >
              <IconIonic style={styles.changePasswordButtonIcon} name="push-outline" color={'#0C2E06'} size={40}/>
            </TouchableOpacity>

          </View>
          <View style={styles.accountManagement}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteConfirm}
            >
              <Text style={styles.buttonText}>Suppression</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.buttonText}>Déconnexion</Text>
          </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  accountData: {
    color: '#0C2E06',
    fontFamily: "JosefinSans-Regular",
    fontSize : 16,
    padding : 15
  },
  accountManagement: {
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  accountSection : {
    width: (Dimensions.get('window').width),
  },
  accountSectionSubhead : {
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  accountTitle : {
    color: '#0C2E06',
    fontFamily: "JosefinSans-Regular",
    fontSize : 22,
    padding: 8,
    textAlign: 'center',
    marginBottom : 4,
  },
  buttonText : {
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    padding : 15,
    textAlign: 'center',
  },
  changePasswordButton: {
    alignSelf: "center",
    backgroundColor : '#005554',
    borderRadius : 25,
    marginVertical : 8,
    width : '22%'
  },
  changePasswordButtonIcon : {
    color : '#2CA6A4',
    paddingTop: 6,
    textAlign : 'center',
    paddingVertical: 2
  },
  changePasswordSection : {
    backgroundColor : '#43820D',
    borderBottomWidth : 2,
    borderBottomColor : '#FF8811',
    borderTopColor: '#FF8811',
    borderTopWidth : 2,
    elevation : 15,
    paddingVertical : 12,
  },
  changePasswordSectionSubhead : {
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    textAlign: 'center',
  },
  changePasswordSectionTitle : {
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 22,
    padding: 8,
    marginBottom : 8,
    textAlign: 'center',
  },
  changePasswordWrapper : {
    flexDirection : 'row',
    justifyContent: 'space-evenly'
  },
  collectionLink: {
    alignSelf: "center",
    backgroundColor : "#43820D",
    borderRadius : 25,
    marginBottom : 12,
    marginTop : 8,
    width : '22%',
  },
  collectionLinkButtonIcon: {
    color : '#E6E1C5',
    paddingTop: 4,
    paddingVertical: 2,
    textAlign : 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#E6E1C5"
  },
  deleteButton: {
    alignSelf: "center",
    backgroundColor: "red",
    borderRadius:30,
    marginVertical : 16,
    width: '40%',
  },
  fieldContainer :{
    flexDirection: 'row'
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: "#FF8811",
    borderRadius:30,
    marginVertical : 16,
    width: '40%',
  },
  newPasswordFields: {
    backgroundColor:'#2CA6A4',
    borderRadius:30,
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 15,
    marginVertical: 6,
    textAlign : 'center',
    width: '36%',
  },
  oldPasswordField: {
    alignSelf: 'center',
    backgroundColor:'#005554',
    borderRadius:30,
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 18,
    marginVertical: 6,
    textAlign : 'center',
    width: '80%',
  },

});
