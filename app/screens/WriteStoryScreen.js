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
import {UserDataContext} from '../context/AppContexts';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker';
import myConfig from '../myConfig';
import IconIonic from 'react-native-vector-icons/Ionicons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import WriteModal from '../components/WriteModal';
import AsyncStorage from '@react-native-community/async-storage';
import {NetworkConsumer} from 'react-native-offline';
import {showMessage} from 'react-native-flash-message';


export default WriteStoryScreen = ({navigation}) => {

  const userData = useContext(UserDataContext);


  // states used for form
  const [inputTitle, setInputTitle] = useState(null);
  const [inputExcerpt, setInputExcerpt] = useState(null);
  const [inputLong, setInputLong] = useState(null);
  const [inputLat, setInputLat] = useState(null);
  const [inputTale, setInputTale] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageOrigin, setImageOrigin] = useState(null);

  //general states
  const [modalVisible, setModalVisible] = useState(false);

  const saveToLocalStorage = async () => {
    let fullStory = {
      title: inputTitle,
      excerpt: inputExcerpt,
      latitude: inputLat,
      longitude: inputLong,
      tale: inputTale,
    };
    try {
      const jsonValue = JSON.stringify(fullStory);
      console.log('JSON VALUE', jsonValue);
      await AsyncStorage.setItem('story', jsonValue);
      console.log('SUCCESS');
      showMessage({
        message: 'Succès',
        description: 'L\'enregistrement à bien été effecté, tous vos textes ont été sauvegardés.',
        type: 'success',
      });
    } catch (e) {
      console.log(e);
      showMessage({
        message: 'Problème',
        description: 'L\'enregistrement ne s\'est pas bien déroulé. Merci de retenter plus tard.',
        type: 'danger',
      });
      // saving error
    }
  };

  //direct return
  const restoreStoryDataFromAsyncStorage = () =>
    AsyncStorage.getItem('story')
      .then(res => JSON.parse(res))
      .then(data => {
        console.log(data);
        setInputTitle(data.title);
        setInputExcerpt(data.excerpt);
        setInputLong(data.longitude);
        setInputLat(data.latitude);
        setInputTale(data.tale);
      })
      .catch(err => console.log(err));

  useEffect(() => {
    restoreStoryDataFromAsyncStorage();
  }, []);


  useEffect(() => {
    refreshBasedOnImageDataChanges();
  }, [imageData]);

  const refreshBasedOnImageDataChanges = () => {
    if (imageData) {
      if ((imageData.hasOwnProperty('longitude')) && (imageData.hasOwnProperty('latitude'))) {
        setInputLong(imageData.longitude.toFixed(6).toString());
        setInputLat(imageData.latitude.toFixed(6).toString());
      } else {
        if (imageOrigin === 'camera') {
          Geolocation.getCurrentPosition(
            (position) => {
              console.log('getting position with geolocation');
              setInputLat(position.coords.latitude.toFixed(6).toString());
              setInputLong(position.coords.longitude.toFixed(6).toString());
              console.log('position set with geolocation');
            },
            (error) => {
              console.log(error.code, error.message);
            },
            {timeout: 15000, maximumAge: 10000},
          );
        } else {
          setInputLat(null);
          setInputLong(null);
          console.log('nulling latlon because no data into this file');
        }
      }
    }
  };

  const sendStoryToDatabase = () => {
    if ((inputExcerpt) && (inputLat) && (inputLong) && (imageData.data) && (inputTale) && (inputTitle)) {
      axios.post(myConfig.API_REQUEST + 'stories/', {
        author: userData.user.username,
        cover: imageData.data,
        excerpt: inputExcerpt,
        latitude: inputLat,
        longitude: inputLong,
        tale: inputTale,
        title: inputTitle,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userData.user.tokens.access,
        },
      })
        .then(function (response) {
          console.log(response.status);
          AsyncStorage.removeItem('story');
          showMessage({
            message: 'Succès',
            description: 'Votre histoire à bien été envoyée à l\'équipe, si elle est validée, vous la retrouverez bientôt sur la carte!',
            type: 'success',
          });
        })
        .catch(function (error) {
          console.log(error.response.data);
          if (error.response.data.hasOwnProperty('title')) {
            showMessage({
              message: 'Attention',
              description: 'Une histoire existe déjà avec ce titre ou le titre est trop long, merci de le modifier.'+ error.response.data.title.toString(),
              type: 'warning',
            });
          } else if (error.response.data.hasOwnProperty('cover')) {
            showMessage({
              message: 'Attention',
              description: 'La photo choisie n\'est pas du bon type, ou est trop lourde.',
              type: 'warning',
            });
          } else if (error.response.data.hasOwnProperty('excerpt')) {
            showMessage({
              message: 'Attention',
              description: 'La phrase d\'accroche est trop longue.' + error.response.data.excerpt.toString(),
              type: 'warning',
            });
          } else if (error.response.data.hasOwnProperty('latitude')) {
            showMessage({
              message: 'Attention',
              description: 'La donnée de latitude n\'est pas au bon format.',
              type: 'warning',
            });
          } else if (error.response.data.hasOwnProperty('longitude')) {
            showMessage({
              message: 'Attention',
              description: 'La donnée de longitude n\'est pas au bon format.',
              type: 'warning',
            });
          } else if (error.response.data.hasOwnProperty('tale')) {
            showMessage({
              message: 'Attention',
              description: error.response.data.tale.toString(),
              type: 'warning',
            });
          } else {
            showMessage({
              message: 'Problème',
              description: 'Il y au un problème au moment de l\'envoi, n\'hésitez pas à sauvergarder votre histoire pour retenter plus tard.',
              type: 'danger',
            });
          }
        });
    } else {
      showMessage({
        message: 'Problème',
        description: 'Tous les champs n\'ont pas été remplis. Merci de les compléter.',
        type: 'danger',
      });
    }
  };

  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  //Functions associated to the 2 select image buttons.
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

        <WriteModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <View style={styles.section}>

          <TouchableOpacity style={styles.modalButton} onPress={() => {
            setModalVisible(true);
          }}>
            <IconIonic style={{textAlign: 'center'}} name="information-circle-outline" color={'black'} size={40}/>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Suggestion d'histoires</Text>

          {/* FIELDS */}

          <View style={styles.labelsContainer}>
            <Text style={styles.labels}>Titre:</Text>
          </View>
          <TextInput style={styles.topFields}
                     multiline={true}
                     onChangeText={setInputTitle}
                     placeholder={'Titre de votre histoire'}
                     placeholderTextColor="#E6E1C5"
                     value={inputTitle}
          />
          <View style={styles.fieldsLimitsContainer}>
            <Text style={styles.fieldsLimits}>80 caractères max.</Text>
          </View>
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
              <Image source={{uri: imageData.uri}} style={styles.fileCoverRender}/>
          }

          <View style={styles.labelsContainer}>
            <Text style={styles.labels}>Phrase d'accroche:</Text>
          </View>
          <TextInput style={styles.topFields}
                     multiline={true}
                     onChangeText={setInputExcerpt}
                     placeholder={'Votre phrase d\'accroche'}
                     placeholderTextColor="#E6E1C5"
                     value={inputExcerpt}
          />
          <View style={styles.fieldsLimitsContainer}>
            <Text style={styles.fieldsLimits}>160 caractères max.</Text>
          </View>

          <Text style={styles.fieldTipsText}>Si votre photo le permet nous essaierons de remplir les champs latitude
            et longitude pour vous, choisissez-la avant s'il vous plaît.</Text>
          <View style={styles.labelsContainer}>
            <Text style={styles.labels}>Localisation: </Text>
          </View>
          <View style={styles.rowWrapper}>
            <TextInput style={styles.smallFields}
                       multiline={true}
                       onChangeText={setInputLat}
                       placeholder={'Latitude'}
                       placeholderTextColor="#E6E1C5"
                       value={inputLat}
            />
            <TextInput style={styles.smallFields}
                       multiline={true}
                       onChangeText={setInputLong}
                       placeholder={'Longitude'}
                       placeholderTextColor="#E6E1C5"
                       value={inputLong}
            />
          </View>
          <View style={styles.fieldsLimitsContainer}>
            <Text style={styles.fieldsLimits}>6 chiffres après la virgule max.</Text>
          </View>
          <View style={styles.labelsContainer}>
            <Text style={styles.labels}>Récit complet:</Text>
          </View>
          <TextInput style={styles.taleField}
                     multiline={true}
                     numberOfLines={8}
                     onChangeText={setInputTale}
                     placeholder={'Votre récit : Soyez créatifs et surtout faites vous plaisir!'}
                     placeholderTextColor="black"
                     value={inputTale}
          />
          <View style={styles.fieldsLimitsContainer}>
            <Text style={styles.fieldsLimits}>6000 caractères max.</Text>
          </View>


          {/* SEND BUTTON */}
          <NetworkConsumer>
            {({isConnected}) => (
              isConnected ? (
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={sendStoryToDatabase}
                >
                  <Text style={styles.sendButtonText}>Envoyer</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.sendButtonOffline}
                  onPress={() => showMessage({
                    message: 'Attention',
                    description: 'Merci de vous reconnecter à Internet avant d\'essayer d\'envoyer une histoire.',
                    type: 'warning',
                  })}
                >
                  <Text style={styles.sendButtonText}>Envoyer</Text>
                </TouchableOpacity>
              )
            )}
          </NetworkConsumer>


          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveToLocalStorage}
          >
            <IconFontisto
              style={styles.photoIcons} name="save" color={'#FF8811'} size={38}/>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );


};

const styles = StyleSheet.create({

  connectButton: {
    alignItems: 'center',
    backgroundColor: '#005554',
    borderRadius: 30,
    marginVertical: 16,
    width: '40%',
  },
  connectButtonText: {
    color: '#E6E1C5',
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
    padding: 15,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#E6E1C5',
    flex: 1,
    justifyContent: 'center',
  },
  fieldsLimits: {
    alignSelf: 'flex-end',
    color: '#495057',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 12,
    marginTop: -8,
  },
  fieldsLimitsContainer: {
    width: '76%',
  },
  fieldTipsText: {
    alignSelf: 'center',
    color: 'black',
    flex: 1,
    fontSize: 17,
    fontFamily: 'JosefinSans-Regular',
    marginVertical: 8,
    textAlign: 'center',
    width: '86%',
  },
  fileCoverRender: {
    borderRadius: 6,
    height: 170,
    marginBottom: 12,
    resizeMode: 'contain',
    width: 170,
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
  logo: {
    resizeMode: 'contain',
    width: '40%',
  },
  modalButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  pictureField: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  photoIcons: {
    backgroundColor: '#F8E8D5',
    borderColor: '#FF8811',
    borderRadius: 5,
    borderWidth: 3,
    flex: 1,
    marginHorizontal: 3,
    padding: 4,
    paddingTop: 8,
    textAlign: 'center',
    zIndex: 1,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '86%',
  },
  saveButton: {
    bottom: 34,
    position: 'absolute',
    right: 16,
  },
  section: {
    alignItems: 'center',
    marginVertical: 0,
    width: (Dimensions.get('window').width),
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: '#FF8811',
    borderRadius: 30,
    marginBottom: 40,
    marginTop: 16,
    width: '40%',
  },
  sendButtonOffline: {
    alignItems: 'center',
    backgroundColor: '#A0A0A0',
    borderRadius: 30,
    marginBottom: 40,
    marginTop: 16,
    width: '40%',
  },
  sendButtonText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
    padding: 15,
    textAlign: 'center',
  },
  screenTitle: {
    alignSelf: 'center',
    backgroundColor: '#FF8811',
    borderRadius: 30,
    color: 'black',
    marginVertical: 16,
    maxWidth: '70%',
    padding: 12,
    fontFamily: 'JosefinSans-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  smallFields: {
    backgroundColor: '#005554',
    borderRadius: 30,
    color: '#E6E1C5',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 14,
    marginVertical: 6,
    textAlign: 'center',
    width: '48%',
  },
  taleField: {
    backgroundColor: '#2CA6A4',
    borderRadius: 30,
    color: 'black',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
    marginVertical: 6,
    textAlign: 'center',
    width: '86%',
  },
  topFields: {
    backgroundColor: '#005554',
    borderRadius: 30,
    color: '#E6E1C5',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
    marginVertical: 6,
    textAlign: 'center',
    width: '86%',
  },
  topTitle: {
    alignItems: 'center',
    color: '#005554',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 6,
    textAlign: 'center',
  },
});
