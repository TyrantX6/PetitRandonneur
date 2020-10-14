import React, {useState, useEffect, useContext} from 'react';
import {
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserDataContext } from '../App';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import myConfig from '../myConfig';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import WriteModal from '../components/WriteModal';




export default WriteStoryScreen = ({navigation}) => {

  const userData = React.useContext(UserDataContext);

  // states used for authentification
  const [inputUsernameConnect, setInputUsernameConnect] = useState('Arandeira');
  const [inputPasswordConnect, setInputPasswordConnect] = useState('grenouille');
  const [connectToken, setConnectToken] = useState('');

  // states used for form
  const [inputTitle, setInputTitle] = useState(null);
  const [inputExcerpt, setInputExcerpt] = useState(null);
  const [inputLong, setInputLong] = useState(null);
  const [inputLat, setInputLat] = useState(null);
  const [inputTale, setInputTale] = useState(null);
  const [fileCover, setFileCover] = useState(null);



  //general states
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {

  }, []);

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

  const sendStoryToDatabase = async () => {
    if (inputPassword === inputPasswordCheck){
      axios.post(myConfig.API_REQUEST+'appusers/', {
        username: inputUsername,
        email: inputEmail,
        password: inputPassword
      })
        .then(function (response) {
          console.log(response);
          alert("Votre compte a bien été créé, connectez-vous en remplissant les champs plus haut dans la page.")
        })
        .catch(function (error) {
          console.log(error.response);
          alert("Un compte existe déjà avec les informations fournies.")
        });
    } else {
      alert('Les mots de passe ne correspondent pas.')
    }
  };

  const options = {
    title: 'Sélectionnez une belle photo qui illustrera votre récit.',
    noData : true,
    storageOptions: {
      skipBackup: true,
      path: 'images',

    },
  };



  const openGallery = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setFileCover(source)
      }
    });
  };

  console.log('XXXXXXX FILE COVER XXXXXXXXX:', fileCover)
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>

        <WriteModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

        <View style={styles.section}>

          <TouchableOpacity style = {styles.modalButton} onPress = {() => {
            setModalVisible(true);
          }}>
            <IconIonic style={{ textAlign: 'center'}} name="information-circle-outline" color={'black'} size={40}/>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Suggestion d'histoires</Text>



          {/* FIELDS */}

          <TextInput style={styles.topFields}
                     multiline={true}
                     onChangeText={setInputTitle}
                     placeholder = {'Titre de votre histoire'}
                     placeholderTextColor="#E6E1C5"
                     value={inputTitle}
          />

          <TouchableOpacity
            style={styles.pictureField}
            onPress={openGallery}
          >
            <View style={styles.rowWrapper}>
              <Text style={styles.pictureFieldText}>Choisissez votre photo d'illustration</Text>
              <IconMaterial style={{ textAlign: 'center'}} name="add-photo-alternate" color={'black'} size={42}/>
            </View>
            {
              !fileCover ?
                null
                :
                <Image source={{uri: fileCover.uri}} style={styles.fileCoverRender} />
            }


          </TouchableOpacity>

          <TextInput style={styles.topFields}
                     onChangeText={setInputExcerpt}
                     placeholder = {'Votre phrase d\'accroche'}
                     placeholderTextColor="#E6E1C5"
                     secureTextEntry={true}
                     value={inputExcerpt}
          />
          <View style={styles.rowWrapper}>
            <TextInput style={styles.smallFields}
                       multiline={true}
                       onChangeText={setInputLong}
                       placeholder = {'Longitude'}
                       placeholderTextColor="#E6E1C5"
                       value={inputLong}
            />
            <TextInput style={styles.smallFields}
                       multiline={true}
                       onChangeText={setInputLat}
                       placeholder = {'Latitude'}
                       placeholderTextColor="#E6E1C5"
                       value={inputLat}
            />
          </View>
          <TextInput style={styles.taleField}
                     multiline={true}
                     numberOfLines={8}
                     onChangeText={setInputTale}
                     placeholder = {'Votre récit'}
                     placeholderTextColor="black"
                     value={inputTale}
          />


          {/* SEND BUTTON */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendStoryToDatabase}
          >
            <Text style={styles.sendButtonText}>Soumettre</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({

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
  fileCoverRender : {
    height : 150,
    width : 150,
  },
  modalButton : {
    position: 'absolute',
    top: 16,
    right : 16
  },
  pictureField : {
    alignItems : 'center',
    paddingVertical : 18,
  },
  pictureFieldText: {
    color : 'black',
    fontSize : 16,
    fontFamily: "JosefinSans-Regular",
    textAlign: 'center',
    alignSelf: 'center',
  },
  rowWrapper: {
    flexDirection : 'row',
    justifyContent: 'space-between',
    width:'86%'
  },
  section : {
    alignItems: "center",
    marginVertical : 0,
    width: (Dimensions.get('window').width),
  },
  sendButton: {
    alignItems: "center",
    backgroundColor: "#FF8811",
    borderRadius:30,
    marginBottom: 40,
    marginTop: 16,
    width: '40%',
  },
  sendButtonText : {
    fontFamily: "JosefinSans-Regular",
    fontSize : 18,
    padding : 15,
    textAlign: 'center',
  },
  screenTitle: {
    alignSelf : 'center',
    backgroundColor: "#FF8811",
    borderRadius:30,
    color :'black',
    marginVertical : 16,
    maxWidth : '70%',
    padding : 12,
    fontFamily: "JosefinSans-Regular",
    fontSize : 20,
    textAlign: 'center',
  },
  smallFields: {
    backgroundColor:'#005554',
    borderRadius:30,
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 18,
    marginVertical: 6,
    textAlign : 'center',
    width: '48%',
  },
  taleField: {
    backgroundColor:'#2CA6A4',
    borderRadius:30,
    color: 'black',
    fontFamily: "JosefinSans-Regular",
    fontSize : 18,
    marginVertical: 6,
    textAlign : 'center',
    width: '86%',
  },
  topFields: {
    backgroundColor:'#005554',
    borderRadius:30,
    color: '#E6E1C5',
    fontFamily: "JosefinSans-Regular",
    fontSize : 18,
    marginVertical: 6,
    textAlign : 'center',
    width: '86%',
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
