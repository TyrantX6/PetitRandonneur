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


export default UserPageScreen = ({navigation}) => {


  const userData = React.useContext(UserDataContext);

  console.log('user DATA:', userData);

  const logout = () => {
    userData.setUser(null);

  };

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* top section, authentification */}
        <View style={styles.topSection}>
          <Text style={styles.sendButtonText}>{userData.username}</Text>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={logout}
          >
            <Text style={styles.connectButtonText}>Déconnexion</Text>
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
    paddingHorizontal: 70
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
    color : '#E6E1C5'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#E6E1C5"
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: 'black',
    borderRadius:30,
    marginVertical : 16,
    width: '40%',
  },
  sendButtonText : {
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    padding : 15,
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

});
