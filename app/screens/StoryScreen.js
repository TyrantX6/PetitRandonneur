import React, {useEffect, useState} from 'react';
import {
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
import {UserDataContext} from '../context/AppContexts';

export default StoryScreen = ({route}) => {

  const userData = React.useContext(UserDataContext);

  const [author, setAuthor] = useState([]);
  const [storyFeedback, setStoryFeedback] = useState(0);

  const apiUserQuery = myConfig.API_REQUEST+'appusers/'.concat(route.params.author);

  const getAuthorName = async () => {

      await axios.get(apiUserQuery)
        .then(function (response) {
         setAuthor(response.data);
      })
        .catch(function (error) {
          console.log(error.response);
        });
  };

  let dynamicHeartIcon;
  if (!userData.user){
    dynamicHeartIcon = <IconMaterial style={styles.favoriteIcon} name="favorite-border" color={'#A0A0A0'} size={50} />
  } else {
    dynamicHeartIcon = <IconMaterial style={styles.favoriteIcon} name="favorite-border" color={'#FF8811'} size={50} />
  }

  const checkFeedbackOnStory = () => {
    if(userData.user === null) {
      setStoryFeedback(0);
    } else {
      if(userData.user.favorites.includes(route.params.id)){
        setStoryFeedback(1)
      } else{
        setStoryFeedback(0)
      }
    }
  }

  const sendFeedbackToDatabase = async () => {
    if(userData.user === null) {
      alert('Merci de vous connecter avant d\'enregistrer une histoire en favori.')
    } else {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userData.user.tokens.access
      }

      if(storyFeedback === 0){
        await axios.patch(myConfig.API_REQUEST+'appusers/'+ userData.user.username + '/'
          , {favorites: [...userData.user.favorites, route.params.id]}, {
            headers: headers
          })
          .then(function (response) {
            userData.setUser({...userData.user, favorites : [...userData.user.favorites, route.params.id]})
            setStoryFeedback(1)
            alert('Correctement effectué.')
          })
          .catch(function (error) {
            console.log(error.response);
            alert('Problème avec la procédure')
          });
      } else {
        const favoritesMinusOne = userData.user.favorites.filter((id) => id !== route.params.id);

        await axios.patch(myConfig.API_REQUEST+'appusers/'+ userData.user.username + '/'
          ,  { favorites: favoritesMinusOne }, {
            headers: headers
          })
          .then(function (response) {
            userData.setUser({...userData.user, favorites: favoritesMinusOne})
            setStoryFeedback(0)
            alert('Correctement effectué.')
          })
          .catch(function (error) {
            console.log(error.response);
            alert('Problème avec la procédure')
          });
      }
    }
  }

  useEffect(() => {
    getAuthorName();
    checkFeedbackOnStory();
  }, [userData.user]);

  return (

    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Text style={styles.storyTitle}>{route.params.title}</Text>

        <TouchableOpacity
          onPress={() => sendFeedbackToDatabase()}
        >
          {storyFeedback === 0 ?
            dynamicHeartIcon:
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
