import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import ImageModal from 'react-native-image-modal';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';


export default StoryScreen = ({route}) => {

  console.log('story:', route)

  const [author, setAuthor] = useState([]);

  const [storyFeedback, setStoryFeedback] = useState(0);

  const apiUserQuery = 'http://192.168.1.23:8000/users/'.concat(route.params.author);

  console.log(apiUserQuery)

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
            uri={route.params.cover}
          />
        </View>

        <Text style={styles.incentive}>Trouve moi si tu peux!</Text>
        <Text style={styles.tale}>{route.params.tale}</Text>
        <Text style={styles.author}>{author.username}</Text>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  author : {
    color : '#0C2E06',
    fontFamily: "Kalam-Regular",
    marginRight : 12,
    marginBottom : 18,
    fontSize: 16,
    textAlign: 'right'
  },
  background : {
    backgroundColor : '#E6E1C5'
  },
  favoriteIcon : {
    textAlign : 'center',
    paddingVertical: 4
  },
  incentive: {
    color : '#713309',
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 22,
    textAlign: 'center',
    textDecorationLine : 'underline',
    paddingTop: 2,
    paddingBottom : 10
  },
  storyCover: {
    borderRadius : 5,
    alignSelf : 'center',
  },
  tale: {
    color : 'black',
    fontFamily: "Kalam-Regular",
    fontSize: 16,
    textAlign: 'center',
    padding : 16
  },
  storyTitle: {
    color : '#0C2E06',
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 12
  },
  fact: {
    height : 'auto'
  }
});


