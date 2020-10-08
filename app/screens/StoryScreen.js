import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import myConfig from '../myConfig';

import axios from 'axios';

import ImageModal from 'react-native-image-modal';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';


export default StoryScreen = ({route}) => {

  console.log('story:', route)

  const [author, setAuthor] = useState([]);

  const [storyFeedback, setStoryFeedback] = useState(0);

  const apiUserQuery = myConfig.API_REQUEST+'appusers/'.concat(route.params.author);

  console.log('AUTHOR:', route.params.author)

  const getAuthorName = async () => {
    try {
      let responseResults = await fetch(apiUserQuery, {
          method : 'GET'
        }
      )

      let jsonResponseResults = await responseResults.json();
      setAuthor(jsonResponseResults);

    } catch (e) {
      alert('Problème de connexion au serveur. Impossible de récupérer le nom de l\'auteur.')
    }

  };


  useEffect(() => {
    getAuthorName();
  }, []);

  return (

    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Text style={styles.storyTitle}>{route.params.title}</Text>

        <TouchableOpacity
          onPress={()=>   setStoryFeedback(1)}
        >
          {storyFeedback === 0 ?
            <IconMaterial style={styles.favoriteIcon} name="favorite-border" color={'#FF8811'} size={50} />:
            <IconMaterial style={styles.favoriteIcon} name="favorite" color={'#FF8811'} size={50} />
          }
        </TouchableOpacity>

        <View style={styles.storyCover}>
          <ImageModal
            resizeMode="center"
            imageBackgroundColor="#E6E1C5"
            style={{
              width: 300,
              height: 250,
            }}
            source={{
              uri: route.params.cover
            }}
          />
        </View>

        <Text style={styles.incentive}>Trouve moi si tu peux!</Text>
        <Text style={styles.tale}>{route.params.tale}</Text>
        { author.username?
          <Text style={styles.author}>{author.username}</Text> :
          <Text style={styles.author}>Auteur anonyme</Text>
        }

      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  author : {
    color : '#0C2E06',
    fontFamily: "Kalam-Regular",
    fontSize: 16,
    marginBottom : 18,
    marginRight : 12,
    textAlign: 'right'
  },
  background : {
    backgroundColor : '#E6E1C5',
    flex :1,
  },
  favoriteIcon : {
    paddingVertical: 4,
    textAlign : 'center',
  },
  incentive: {
    color : '#713309',
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 22,
    paddingTop: 2,
    paddingBottom : 10,
    textAlign: 'center',
    textDecorationLine : 'underline',
  },
  storyCover: {
    alignSelf : 'center',
    borderRadius : 5,
  },
  tale: {
    color : 'black',
    fontFamily: "Kalam-Regular",
    fontSize: 16,
    padding : 16,
    textAlign: 'center',
  },
  storyTitle: {
    color : '#0C2E06',
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 22,
    paddingHorizontal: 6,
    paddingTop: 12,
    textAlign: 'center',
  },
  fact: {
    height : 'auto'
  }
});


