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
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker';
import myConfig from '../myConfig';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import WriteModal from '../components/WriteModal';




export default WriteStoryScreen = ({navigation}) => {

  const userData = React.useContext(UserDataContext);

  // states used for form
  const [inputTitle, setInputTitle] = useState(null);
  const [inputExcerpt, setInputExcerpt] = useState(null);
  const [inputLong, setInputLong] = useState(null);
  const [inputLat, setInputLat] = useState(null);
  const [inputTale, setInputTale] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageOrigin, setImageOrigin] = useState( null);

  //general states
  const [connected, setConnected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
  console.log('IMAGE ORIGIN: ', imageOrigin);
    refreshBasedOnImageDataChanges();
  }, [imageData]);

  const refreshBasedOnImageDataChanges = () => {
    if (imageData !== null) {
      if ((imageData.hasOwnProperty('longitude')) && (imageData.hasOwnProperty('latitude')) ) {
        setInputLong(imageData.longitude.toFixed(6).toString());
        setInputLat(imageData.latitude.toFixed(6).toString());
      } else {
        if (imageOrigin === 'camera'){
          Geolocation.getCurrentPosition(
            (position) => {
              console.log('getting position with geolocation')
              setInputLat(position.coords.latitude.toFixed(6).toString());
              setInputLong(position.coords.longitude.toFixed(6).toString());
              console.log('position set with geolocation')
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {  timeout: 15000, maximumAge: 10000 }
          );
        } else {
          setInputLat(null);
          setInputLong(null);
          console.log('nulling latlon because no data into this file')
        }
      }
    }
  }

  //if (userData.user !== null){
   // const config = {
      //headers: {
       // 'Content-Type': 'application/json',
       /// 'Authorization': 'Bearer ' + userData.user.tokens.access,
     // },
   // };
//  }

  /*const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + userData.user.tokens.access,
  };*/

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

  const sendStoryToDatabase = () => {

    axios.post(myConfig.API_REQUEST+'stories/', {
      author: userData.user.username,
      cover: imageData.data,
      excerpt: inputExcerpt,
      latitude: inputLat,
      longitude: inputLong,
      tale: inputTale,
      title : inputTitle,
    }, {headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData.user.tokens.access,
      }})
      .then(function (response) {
        console.log(response.status)
        alert("Votre histoire à bien été envoyée à l'équipe, si elle est validée, vous la retrouverez bientôt sur la carte!")
      })
      .catch(function (error) {
        console.log(error.response.data);
        if (error.response.data.hasOwnProperty('title')){
          alert('Une histoire existe déjà avec ce titre.')
        } else {
          alert("Il y a eu un souci avec l'envoi.")
        }

      });
  };


  /*const sendStoryToDatabase2 = () => {

    let formData = new FormData();
    formData.append('title', inputTitle);
    formData.append('excerpt', inputExcerpt);
    formData.append('latitude', inputLat);
    formData.append('longitude', inputLong);
    formData.append('author', userData.user.username);
    formData.append('tale', inputTale);
    formData.append('cover', imageData.data);


    fetch(myConfig.API_REQUEST + 'stories/', {method: 'POST', headers : headers, body : formData})
      .then(res => res.json())
      .then(data => console.log('DATA if success:', data.fileName))
      .catch(err => console.log('ERR:' , err))


  };
  */

  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };



  const openGallery = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Chosen image = ', response.fileName);
      setImageOrigin('gallery');
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageData(response);
      }
    });
  };

  const openCamera = () => {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Chosen image = ', response.fileName);
      setImageOrigin('camera');
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageData(response);
      }
    });
  };

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
          <View style={styles.rowWrapper}>
            <Text style={styles.fieldTipsText}>Choisissez votre photo d'illustration:</Text>
            <TouchableOpacity
              style={styles.pictureField}
              onPress={openGallery}
            >
              <IconFontisto style={styles.photoIcons} name="photograph" color={'#FF8811'} size={42}/>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pictureField}
              onPress={openCamera}
            >
              <IconFA5 style={styles.photoIcons} name="camera-retro" color={'#FF8811'} size={42}/>
            </TouchableOpacity>



          </View>
            {
              !imageData ?
                null
                :
                <Image source={{uri: imageData.uri}} style={styles.fileCoverRender} />
            }




          <TextInput style={styles.topFields}
                     multiline={true}
                     onChangeText={setInputExcerpt}
                     placeholder = {'Votre phrase d\'accroche'}
                     placeholderTextColor="#E6E1C5"
                     value={inputExcerpt}
          />

          <Text style={styles.fieldTipsText}>Si votre photo le permet nous essaierons de remplir ces deux champs pour vous, choisissez-la avant s'il vous plaît.</Text>
          <View style={styles.rowWrapper}>
            <TextInput style={styles.smallFields}
                       multiline={true}
                       onChangeText={setInputLat}
                       placeholder = {'Latitude'}
                       placeholderTextColor="#E6E1C5"
                       value={inputLat}
            />
            <TextInput style={styles.smallFields}
                       multiline={true}
                       onChangeText={setInputLong}
                       placeholder = {'Longitude'}
                       placeholderTextColor="#E6E1C5"
                       value={inputLong}
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
  fieldTipsText: {
    alignSelf: 'center',
    color : 'black',
    flex : 1,
    fontSize : 17,
    fontFamily: "JosefinSans-Regular",
    marginVertical : 8,
    textAlign: 'center',
    width :'86%',
  },
  fileCoverRender : {
    borderRadius : 6,
    height : 170,
    marginBottom: 12,
    resizeMode: 'contain',
    width : 170,
  },
  logo : {
    resizeMode : 'contain',
    width : '40%',
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
  photoIcons : {
    backgroundColor: '#F8E8D5',
    borderColor:'#FF8811',
    borderRadius: 5,
    borderWidth:3,
    flex : 1,
    marginHorizontal : 3,
    padding: 4,
    textAlign : 'center',
    zIndex : 1
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
    fontSize : 14,
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
