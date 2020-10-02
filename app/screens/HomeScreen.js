import React, {useEffect, useState} from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
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

  const [ loading, setLoading ] = useState(true)

  const [userLocation, setUserLocation] = useState('');

  const [region, setRegion] = useState({
    latitude: 48.857094,
    longitude: 2.336322,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  });

  const [markers, setMarkers] = useState([]);

  const getStories = async () => {
    try {
      let responseResults = await fetch('http://10.27.162.13:8000/stories/', {
          method : 'GET'
        }
      )

      let jsonResponseResults = await responseResults.json();
      setMarkers(jsonResponseResults);
      console.log('response results:', markers)
    } catch (e) {
      console.log('response results:', markers)
      alert('Problème de connexion au serveur. Les histoires n\'apparaitront pas.')
    }

  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
        });
        setUserLocation(position);
        setLoading(false);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter : 500 }
    );

  }


  useEffect(() => {
    getStories();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const mapView = React.createRef();
  const goToUserLocation = () => {
    mapView.current.animateToRegion({ // Takes a region object as parameter
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08
    },1000);
  }

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

  console.log('region:', region)

  if (loading) {
    return <Text>Currently loading!</Text>
  }
  return (
    <SafeAreaView style={styles.container}>

      <MapView
        onMapReady={() => {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          )}}
        style={styles.map}
        region={region}
        onRegionChangeComplete={region =>setRegion(region)}
        showsUserLocation = {true}
        ref={mapView}
      >
        {mapMarkers}
      </MapView>
      <TouchableOpacity style = {styles.goToButton}
                        onPress = {goToUserLocation}>
        <IconFA style={{ textAlign: 'center'}} name="crosshairs" color={'#FF8811'} size={40}/>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    width: '100%',
    height : '100%',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  goToButton : {
    position: 'absolute',
    bottom: 16,
    right : 18
  }
});
