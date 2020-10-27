import React, {useEffect, useState, useContext} from 'react';
import myConfig from '../myConfig';
import {UserDataContext} from '../context/AppContexts';
//map related imports
import {Callout, Marker} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import Geolocation from 'react-native-geolocation-service';
//react imports
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
//assets imports
import LottieView from 'lottie-react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import OfflineWindow from '../components/OfflineWindow';
import { NetworkConsumer } from 'react-native-offline';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';


export default HomeScreen = ({story, navigation}) => {

  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  const [permissionGranted, setPermissionGranted] = useState('');

  const [userLocation, setUserLocation] = useState('');

  const [region, setRegion] = useState({
    latitude: 48.857094,
    longitude: 2.336322,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [markers, setMarkers] = useState([]);


  const getStories = async () => {
    await axios.get(myConfig.API_REQUEST + 'stories/?validated=true')
      .then(function (response) {
        setMarkers(response.data);
        //console.log('response results:', markers);
      })
      .catch(function (error) {
        showMessage({
          message: "Problème",
          description: "Nous n'avons pas réussi à récupérer les histoires, elles n'apparaîtront pas sur la carte.",
          type: "warning",
        });
      });
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        });
        setLoading(false);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 100},
    );

  };

  const permissionCheck = async () => {
    await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(res => {
      if (res == 'granted') {
        setPermissionGranted(true);
        getUserLocation();
      } else {
        requestGPSPermission();
      }
    });
  };

  const requestGPSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Nous avons besoin de votre approbation.',
          message:
            'Notre application a besoin de votre autorisation pour pouvoir vous localiser. ' +
            'Vous bénéficierez ainsi de fontionnalités supplémentaires comme le bouton de recentrage sur votre position, ou le remplissage automatique des valeurs de longitude et latitude.' +
            'Donnez (ou non) votre accord au prochain écran.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        console.log('You can use the GPS');
      } else {
        setPermissionGranted(false);
        console.log('GPS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const netStatus = useNetInfo();
    if ((netStatus.isInternetReachable === true) && (markers.length < 1)) {
      getStories();
    }

  useEffect(() => {
    permissionCheck();
    getUserLocation();
  }, []);

  const mapView = React.createRef();

  const goToUserLocation = () => {
    getUserLocation();
    mapView.current.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    }, {duration: 100});
  };


  let mapMarkers;
  mapMarkers = markers.map((story) =>
    <Marker style={styles.callout}
            key={story.id}
            coordinate={{latitude: parseFloat(story.latitude), longitude: parseFloat(story.longitude)}}
            image={require('../assets/appPictures/orangePin3.png')}
            title={story.title}
            excerpt={story.excerpt}
            onCalloutPress={() => navigation.navigate('StoryScreen', {
              id: story.id,
              title: story.title,
              excerpt: story.excerpt,
              tale: story.tale,
              cover: story.cover,
              author: story.author,
            })}
    >
      <Callout tooltip>
        <View style={styles.callout}>
          <Text style={styles.text}>
            {story.excerpt}
            {'\n'}
          </Text>

          <IconFA style={{textAlign: 'center'}} name="hand-pointer-o" color={'#0C2E06'} size={22}/>
          <Text style={styles.text}>
            Cliquez pour découvrir l'histoire!{' '}
          </Text>
        </View>
      </Callout>
    </Marker>);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <LottieView style={styles.bigLoader} source={require('../assets/animations/34279-simple-loader.json')} autoPlay
                    loop/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >


        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Bienvenue parmi nous randonneur!</Text>
            <Text style={styles.modalText}>
              A vous de découvrir nos histoires en cliquant sur les têtes d'épingles oranges. Un second clic sur le
              résumé vous emmènera sur l'histoire.{'\n'}{'\n'}
              Vous pouvez recentrer la vue sur votre position avec l'icone de cible en bas à droite (seulement si vous
              avez autorisé la localisation).{'\n'}{'\n'}
              Merci de créer un compte et/ou de vous connecter avant de pouvoir envoyer des histoires ou les ajouter
              en favoris.{'\n'}{'\n'}
              Bonne route!
            </Text>

            <TouchableHighlight
              style={{...styles.okButton}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <OfflineWindow/>



      <MapView
        style={styles.map}
        clusterColor='#FF8811'
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
        showsUserLocation={true}
        showsBuildings={true}
        showsMyLocationButton={false}
        ref={mapView}
      >
        {mapMarkers}
      </MapView>

      <TouchableOpacity style={styles.modalButton} onPress={() => {
        setModalVisible(true);
      }}>
        <IconIonic style={{textAlign: 'center'}} name="information-circle-outline" color={'black'} size={40}/>
      </TouchableOpacity>

      {permissionGranted === true ?

        <TouchableOpacity style={styles.goToButton} onPress={goToUserLocation}>
          <IconFA style={{textAlign: 'center'}} name="crosshairs" color={'#FF8811'} size={40}/>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.permissionButton} onPress={requestGPSPermission}>
          <IconFA style={{textAlign: 'center'}} name="map-signs" color={'#FF8811'} size={40}/>
        </TouchableOpacity>
      }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bigLoader: {
    width: 200,
    height: 200,
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  callout: {
    height: 'auto',
    width: 260,
    backgroundColor: '#E6E1C5',
    borderColor: '#0C2E06',
    borderWidth: 3,
    borderRadius: 15,
    padding: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  goToButton: {
    position: 'absolute',
    bottom: 16,
    right: 18,
  },
  permissionButton: {
    position: 'absolute',
    bottom: 60,
    right: 18,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#E6E1C5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#0C2E06',
    shadowOffset: {
      width: 15,
      height: 10,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 16,
  },
  modalText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#43820D',
    borderRadius: 20,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  okText: {
    color: 'white',
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#0C2E06',
    fontFamily: 'Kalam-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
