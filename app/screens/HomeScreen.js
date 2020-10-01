import React, {useEffect, useState} from 'react';
import MapView, { Callout, Marker } from 'react-native-maps'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';



export default HomeScreen = ({story, navigation}) => {

  const getStories = async () => {
    try {
      let responseResults = await fetch('http://192.168.1.23:8000/stories/', {
          method : 'GET'
        }
      )

      let jsonResponseResults = await responseResults.json();
      setMarkers(jsonResponseResults);
      console.log('response results:', markers)
    } catch (e) {
      console.log('response results:', markers)
      alert('Problème de connexion au serveur.')
    }

  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setUserLocation(position);
        setRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
      }
      );
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );


  }

  useEffect(() => {
    getLocation();
    getStories();
  }, []);

  const [userLocation, setUserLocation] = useState('')

  const [region, setRegion] = useState({
      latitude: 48.857094,
      longitude: 2.336322,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    });

  const [markers, setMarkers] = useState([]);


  let mapMarkers;
  mapMarkers = markers.map((story) =>
    <Marker style={styles.callout}
    key={story.id}
    coordinate={{ latitude: parseFloat(story.latitude), longitude: parseFloat(story.longitude) }}
    image={require('../assets/appPictures/orangePin3.png')}
    title={story.title}
    excerpt={story.excerpt}
    onCalloutPress={() => navigation.navigate('StoryScreen', {
      id : story.id,
      title : story.title,
      excerpt : story.excerpt,
      tale : story.tale,
      cover : story.cover,
      author : story.author,
    })}
    >
      <Callout tooltip >
        <View style={styles.callout}>
          <Text style={styles.text}>
            {story.excerpt}
            {"\n"}
          </Text>

          <IconFA style={{ textAlign: 'center'}} name="hand-pointer-o" color={'#0C2E06'} size={22}/>
          <Text style={styles.text}>
            Cliquez pour découvrir l'histoire!{' '}
          </Text>

        </View>
      </Callout>

    </Marker >);

  console.log('userLocation:', userLocation)
  return (
    <SafeAreaView>
      <MapView
        onMapReady={() => {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          )}}
        style={styles.map}
        region={region}
        onRegionChangeComplete={region =>setRegion(region)}
        showsUserLocation = {true}
        followsUserLocation={true}
        showsMyLocationButton={true}
      >
        {mapMarkers}

      </MapView>
    </SafeAreaView>




  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  text : {
    fontFamily:"Kalam-Regular",
    fontSize : 16,
    color :'#0C2E06',
    textAlign: 'center'
  },
  callout : {
    height: 'auto',
    width: 260,
    backgroundColor: '#E6E1C5',
    borderColor: '#0C2E06',
    borderWidth: 3,
    borderRadius: 15,
    padding: 12
  },
});
