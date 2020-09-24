import React, {useState} from 'react';
import MapView, { Callout, Marker } from 'react-native-maps'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';




import LoginScreen from  './LoginScreen'
import WriteStoryScreen from "./WriteStoryScreen";




function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Identification',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="log-in" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="WriteStoryScreen"
        component={WriteStoryScreen}
        options={{
          tabBarLabel: 'Proposer une histoire',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="pencil" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}





export default HomeScreen = ({story, navigation}) => {

  const [region, setRegion] = useState({
      latitude: 48.132491,
      longitude: -1.698612,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    });

  const [markers, setMarkers] = useState( { stories: [
    {id: 1, latitude: 48.130500, longitude : -1.696231, title: 'Colonnes de Beauregard', description: 'Des colonnes grises et mystérieuses qui changent de place quand tu dors!'},
    {id: 2, latitude: 48.129054, longitude : -1.698880, title: 'Boite a livres Cucillé', description: 'Une boite qui mange les livres'}]
  });


  let mapMarkers;
  mapMarkers = markers.stories.map((story) =>
    <Marker style={styles.callout}
    key={story.id}
    coordinate={{ latitude: story.latitude, longitude: story.longitude }}
    title={story.title}
    description={story.description}
    pinColor="green"
    onCalloutPress={() => navigation.navigate('StoryScreen', {
      title : story.title,
      description : story.description
    })}
    >
      <Callout>
        <View>
          <Text style={styles.text}>
            {story.title}
          </Text>
          <Text style={styles.text}>
            {story.description}
          </Text>
        </View>
      </Callout>

    </Marker >);

  return (
    <SafeAreaView>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={region =>setRegion(region)}
        showsUserLocation = {true}
      >
        {mapMarkers}

        {/*test data to delete later*/}
        {/*<Marker
          coordinate={{ latitude: 33.7872131, longitude: -84.381931 }}
          title='Flatiron School Atlanta'
          description='This is where the magic happens!'
        >
        </Marker>*/}
      </MapView>
    </SafeAreaView>




  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  goToPage: {
    height: 30,
    color :'pink'
  },
  text : {
    height: 'auto',
    color :'pink'
  },
  callout : {
    height: '20%',
    width:'80%',
  }
});
