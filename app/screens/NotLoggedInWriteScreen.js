import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserDataContext } from '../App';

import LottieView from 'lottie-react-native';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import WriteModal from '../components/WriteModal';




export default NotLoggedInWriteScreen = ({navigation}) => {

  const userData = React.useContext(UserDataContext);



  //general states
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <WriteModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        <TouchableOpacity style = {styles.modalButton} onPress = {() => {
          setModalVisible(true);
        }}>
          <IconIonic style={{ textAlign: 'center'}} name="information-circle-outline" color={'black'} size={40}/>
        </TouchableOpacity>
        <View style={styles.section}>
          <LottieView style={styles.worldAnimation} source={require('../assets/animations/29582-looping-idle-location-animation.json')} autoPlay loop />

          <Text style={styles.notConnectedText}>
          Merci de vous connecter avant de pouvoir accéder à la section d'écriture et d'envoi d'histoires.{"\n"}{"\n"} Vous verrez, c'est facile et c'est sympa!
          </Text>
          <Image
          style={styles.logo}
          source={require('../assets/appPictures/logo_petit_randonneurWithoutBG.png')}
          />


        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({


  container: {
    backgroundColor : "#E6E1C5",
    height: (Dimensions.get('window').height),
    width: (Dimensions.get('window').width),
  },
  logo : {
    height : 140,
    marginBottom : 26,
    resizeMode : 'contain',
    width : 140,
  },
  modalButton : {
    position: 'absolute',
    right : 16,
    top: 16,
  },
  notConnectedText : {
    backgroundColor: 'white',
    borderRadius : 10,
    color : 'black',
    elevation : 6,
    fontFamily: 'JosefinSans-Regular',
    fontSize : 18,
    padding : 10,
    textAlign: 'center',
    width: '86%',
  },
  section : {
    alignItems: 'center',
    flexDirection : 'column',
    height: (Dimensions.get('window').height)*0.82,
    justifyContent: 'space-around',
  },
  worldAnimation: {
    alignSelf: 'center',
    height : 150,
    justifyContent: 'center',
  }

});
