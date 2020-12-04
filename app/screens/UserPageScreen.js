import React, {useState, useContext} from 'react';
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
import { UserDataContext } from '../context/AppContexts';
import axios from 'axios';
import myConfig from '../myConfig';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {showMessage} from 'react-native-flash-message';


export default UserPageScreen = ({navigation}) => {


  const userData = useContext(UserDataContext);

  const [oldPassword, setOldPassword] = useState(null);
  const [inputPassword, setInputPassword] = useState(null);
  const [inputPasswordCheck, setInputPasswordCheck] = useState(null);

  ///console.log('user DATA:', userData);

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

  //asking for user's confirmation before sending the request
  const deleteConfirm = () => {
    Alert.alert(
      'Confirmez-vous la demande de suppression de votre compte?',
      'Êtes-vous sûr et certain de vouloir supprimer votre compte, vous perdrez la possibilité de vous connecter et vos favoris. Les histoires que vous avez écrites resteront en ligne mais votre nom sera remplacé par "Auteur Anonyme".',
      [
        {
          text: 'Annulation',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Confirmation',
          //only this will trigger the deletion
          onPress: () => deleteAccount()
        }
      ]
    );
  };

  // delete query on the connected AppUser
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
        showMessage({
          message: "Problème",
          description: "La procédure de suppression du compte ne s'est pas bien déroulée, merci de retenter plus tard.",
          type: "danger",
        });
      });

  }

  const secondStepChangePassword = async  () =>  {
    //first, we need to check equality between the 2 new password fields.
    if (inputPassword === inputPasswordCheck) {
    //if it's ok, we can PATCH the user with the new password, django on back-end will encrypt it.
    await axios.patch(myConfig.API_REQUEST+'appusers/'+ userData.user.username + '/'
      , {password : inputPassword}, {
        headers: headers
      })
      .then(function (response) {
        showMessage({
          message: "Succès",
          description: "La procédure s'est bien déroulée.",
          type: "success",
        });
      })
      .catch(function (error) {
        console.log(error.response);
        showMessage({
          message: "Problème",
          description: "Nous avons rencontré un problème au cours de la procédure, merci de retenter plus tard.",
          type: "danger",
        });
      });
  } else {
      showMessage({
        message: "Attention",
        description: "Les deux nouveaux mots de passe ne correspondent pas. Merci de les corriger avant de retenter.",
        type: "warning",
      });
  }
}


  const changePassword = async () => {
    //first, we check if we obtain a valid token by sending current username and value of old password field to the API token route.
    await axios.post(myConfig.API_REQUEST+'api/token/', {
      username: userData.user.username,
      password: oldPassword
    })
      .then(function (response) {
        console.log('THE TOKENS:', response.data);
        if(response.data.hasOwnProperty('access')) {
          let tokens = response.data;
          userData.setUser({...userData.user, tokens });
          //if token is obtained and valid we store them and then we can move to the second part of the procedure.
          secondStepChangePassword();
        }
      })
      .catch(function (error) {
        console.log(error.response);
        showMessage({
          message: "Attention",
          description: "L'ancien mot de passe n'est pas correct. Vérifiez votre saisie.",
          type: "warning",
        });
      });
  };

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.accountSection}>
          <Text style={styles.accountTitle}>Mon compte</Text>
          <Text style={styles.accountData}>Mon pseudo : {userData.user.username}</Text>


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
            <View style={styles.fieldsLimitsContainer}>
              <Text style={styles.fieldsLimits}>8 caractères minimum, au moins une lettre, pas trop commun</Text>
            </View>

            <Text style={styles.changePasswordSectionSubhead}> Envoyer : </Text>
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={changePassword}
            >
              <IconFA style={styles.changePasswordButtonIcon} name="send-o" size={24}/>
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
    borderColor: '#E6E1C5',
    borderRadius : 5,
    borderBottomWidth: 4,
    marginVertical : 8,
  },
  changePasswordButtonIcon : {
    color : '#E6E1C5',
    padding: 6,
    paddingHorizontal: 20,
    textAlign : 'center',
  },
  changePasswordSection : {
    backgroundColor : '#43820D',
    borderBottomWidth : 2,
    borderColor : '#FF8811',
    borderTopWidth : 2,
    elevation : 15,
    marginVertical: 16,
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
  fieldsLimits: {
    alignSelf: 'center',
    color: '#E6E1C5',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 12,
    marginTop: -8,
    textAlign : 'center'
  },
  fieldsLimitsContainer: {
    alignSelf: 'center',
    width: '76%',
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
