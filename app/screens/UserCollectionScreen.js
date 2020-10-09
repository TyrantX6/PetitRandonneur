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
import { UserDataContext } from '../App'
import axios from 'axios';
import myConfig from '../myConfig';
import IconIonic from 'react-native-vector-icons/Ionicons';


export default UserCollectionScreen = ({navigation}) => {


  const userData = React.useContext(UserDataContext);
  const [oldPassword, setOldPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');

  console.log('user DATA:', userData);

  const logout = () => {
    userData.setUser(null);
  };

  const getPublishedStories = () => {
    //http://192.168.1.50:8000/stories/?author=Arandeira
  };

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.accountSection}>
          <Text style={styles.accountTitle}>Mes collections</Text>
          <Text style={styles.accountData}>Mes histoires mises en favories:</Text>
          {
            userData.user.favorites.length < 1 ?
              <Text>Vous n'avez pas encore d'histoires favories. Ajoutez-en en cliquant sur le coeur orange quand vous êtes sur la page d'une histoire.</Text>
              :
              <Text>Histoire 1</Text>
          }

          <Text style={styles.accountData}>Mes histoires publiées</Text>

          <View style={styles.passwordSection}>
            <Text style={styles.passwordSectionTitle}>Changement mot de passe</Text>
            <TextInput style={styles.oldPasswordField}
                       onChangeText={setOldPassword}
                       placeholder = {'✍️ ancien mot de passe'}
                       placeholderTextColor="#E6E1C5"
                       secureTextEntry={true}
                       value={oldPassword}
            />
            <View style={styles.passwordWrapper}>
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
            <Text style={styles.passwordSectionSubhead}> Envoyer :</Text>
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={changePassword}
            >
              <IconIonic style={styles.changePasswordButtonText} name="push-outline" color={'#0C2E06'} size={40}/>
            </TouchableOpacity>

          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
          </TouchableOpacity>

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
  accountSection : {
    width: (Dimensions.get('window').width),
  },
  accountTitle : {
    color: '#0C2E06',
    fontFamily: "JosefinSans-Regular",
    fontSize : 22,
    padding: 8,
    textAlign: 'center',
    marginBottom : 8,
  },
  changePasswordButton: {
    alignSelf: "center",
    backgroundColor : '#005554',
    borderRadius : 25,
    marginVertical : 8,
    width : '22%'

  },
  changePasswordButtonText : {
    color : '#2CA6A4',
    paddingTop: 6,
    textAlign : 'center',
    paddingVertical: 2

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#E6E1C5"
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: "#FF8811",
    borderRadius:30,
    marginVertical : 16,
    width: '40%',
  },
  logoutButtonText : {
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    padding : 15,
    textAlign: 'center',
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
    color: '#005554',
    fontFamily: "JosefinSans-Regular",
    fontSize : 18,
    marginVertical: 6,
    textAlign : 'center',
    width: '80%',
  },
  passwordSection : {
    backgroundColor : '#43820D',
    borderBottomWidth : 2,
    borderBottomColor : '#FF8811',
    borderTopColor: '#FF8811',
    borderTopWidth : 2,
    elevation : 15,
    paddingVertical : 12,
  },
  passwordSectionSubhead : {
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    textAlign: 'center',
  },
  passwordSectionTitle : {
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 22,
    padding: 8,
    marginBottom : 8,
    textAlign: 'center',
  },
  passwordWrapper : {
    flexDirection : 'row',
    justifyContent: 'space-evenly'
  },




});
