import React, {useState} from 'react';
import MapView, { Callout, Marker } from 'react-native-maps'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import IconFA from 'react-native-vector-icons/FontAwesome';



export default HomeScreen = ({story, navigation}) => {

  const [region, setRegion] = useState({
      latitude: 48.132491,
      longitude: -1.698612,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    });

  const [markers, setMarkers] = useState( { stories: [
    {id: 1, latitude: 48.130500, longitude : -1.696231, title: 'Colonnes de Beauregard', excerpt: 'Des colonnes grises et mystérieuses qui changent de place quand tu dors!'},
    {id: 2, latitude: 48.129054, longitude : -1.698880, title: 'Boite a livres Cucillé', excerpt: 'Une boite qui mange les livres'},
    {id: 3, latitude: 48.133349, longitude : -1.642516, title: 'Petit bateau n\'est plus sur l\'eau...', excerpt: 'Un bateau coincé sur l\'herbe, aidez-le!', tale: "Il était tout heureux petit bateau car tous les jours il tanguait sur l'eau." +
        "\n" +
        "\n" +
        "Mais après la grande marée, plus jamais il n'eut navigué." +
        "\n" +
        "\n" +
        "Pleurant à chaudes larmes, petit bateau finit par rendre les armes." +
        "\n" +
        "\n" +
        "Un jour vint un petit randonneur qui vint lui demander l'heure." +
        "\n" +
        "\n" +
        "\"l'heure je ne puis plus donner ! car sur le sol je ne ressens plus les marées." +
        "\n" +
        "\n" +
        "Il vint alors une idée au petit randonneur bien fatigué." +
        "\n" +
        "\n" +
        "\"Si je te pousse et te remet à l'eau, pourras tu me chuchoter l'heure en quelques mots ?" +
        "\n" +
        "\n" +
        "Petit bateau retrouvant l'espoir acquiesça en chassant ses idées noires !" +
        "\n" +
        "\n" +
        "Le petit randonneur poussa, poussa jusqu'à le remettre à flot. Une vague de plus et il était déjà sur l'eau." +
        "\n" +
        "\n" +
        "Tout fatigué de ses efforts accumulés, il grimpa à bord pour se reposer les pieds." +
        "\n" +
        "\n" +
        "L'heure n'avait désormais plus d'importance, car devenu matelot, pour l'aventure il était déjà en partance !",
        cover: require('../assets/appPictures/mockedData/littleBoat.jpg'),
        author: 'Thomas Pottier'
        }
    ]
  });


  let mapMarkers;
  mapMarkers = markers.stories.map((story) =>
    <Marker style={styles.callout}
    key={story.id}
    coordinate={{ latitude: story.latitude, longitude: story.longitude }}
    image={require('../assets/appPictures/orangePin3.png')}
    title={story.title}
    excerpt={story.excerpt}
    onCalloutPress={() => navigation.navigate('StoryScreen', {
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
