import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { UserDataContext } from '../context/AppContexts';
import axios from 'axios';
import myConfig from '../myConfig';
import LottieView from 'lottie-react-native';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import StoryComponent from '../components/StoryComponent';
import OfflineWindow from '../components/OfflineWindow';
import {showMessage} from 'react-native-flash-message';


export default UserCollectionScreen = ({navigation}) => {

  const userData = useContext(UserDataContext);

  //data states
  const [userStories, setUserStories] = useState([]);
  const [favStories, setFavStories] = useState();

  //loading states
  const [ loadingPub, setLoadingPub ] = useState(true);
  const [ loadingFav, setLoadingFav ] = useState(true);

  useEffect(() => {
    getPublishedStories();
    getFavoritesStories();
  }, [userData.user.favorites]);

  // queries on stories published and written by connected user.
  const getPublishedStories = async () => {
    // url model for the filtered queries http://192.168.1.50:8000/stories/?author=Username&validated=true'
    await axios.get(myConfig.API_REQUEST+'stories/?author='+ userData.user.username +'&validated=true')
      .then(function (response) {
        setUserStories(response.data);
        setLoadingPub(false);
      })
      .catch(function (error) {
        console.log(error.response);
        showMessage({
          message: "Problème",
          description: "Nous n'avons pas pu trouver vos histoires publiées, merci de retenter plus tard.",
          type: "danger",
        });
      });
  };
  // rendering a text or a flatlist based on the presence of data
  let publishedStoriesRender;

  if (userStories.length < 1) {
    publishedStoriesRender = <Text style={styles.tipsForUser}>Vos histoires n'ont pas encore été publiées, continuez d'en proposer ou bien profitez simplement des histoires existantes.</Text>
  } else {
    publishedStoriesRender =
      <FlatList
        data={userStories}
        renderItem={({item}) => <StoryComponent id = {item.id}
                                                title = {item.title}
                                                excerpt = {item.excerpt}
                                                tale = {item.tale}
                                                cover = {item.cover}
                                                author = {item.author}/>}
        keyExtractor={item => item.id.toString()}
        style={styles.flatListContainer}
      />
  }

  const getFavoritesStories = () => {

    let urls = [];
    //console.log('URLS BEFORE PROCEDURE', urls)
    for (const fav of userData.user.favorites) {
      //console.log(fav)
      urls = [...urls, myConfig.API_REQUEST+ 'stories/' + fav +'/']
    }
    //console.log('URLS AFTER PROCEDURE', urls)
    const promises = urls.map
    //console.log(' THE FAVORITES IN STORE' , userData.user.favorites)
    Promise.all(urls.map(url => fetch(url)))
      .then(resp => Promise.all( resp.map(r => r.json() )))
      .then(result => {
        let favArray = result
        setFavStories(favArray)
      })
      .then(
        setLoadingFav(false)
      )
      .catch(error => {
        showMessage({
          message: "Problème",
          description: "Nous n'avons pas pu trouver vos histoires préférées, merci de retenter plus tard.",
          type: "danger",
        });
        console.log(error)
      })


  };

  // rendering a text or a flatlist based on the the presence of data
  let favoritesStoriesRender;

  if (userData.user.favorites.length < 1) {
    favoritesStoriesRender =  <Text style={styles.tipsForUser}>Vous n'avez pas encore d'histoires favories. Ajoutez-en en cliquant sur le coeur orange quand vous êtes sur la page d'une histoire!</Text>
  } else {
    favoritesStoriesRender =

      <FlatList
        data={favStories}
        renderItem={({item}) => <StoryComponent id = {item.id}
                                                title = {item.title}
                                                excerpt = {item.excerpt}
                                                tale = {item.tale}
                                                cover = {item.cover}
                                                author = {item.author}/>}
        keyExtractor={item => item.id.toString()}
        style={styles.flatListContainer}
      />
  }

  return (

    <SafeAreaView style={styles.container}>
      <OfflineWindow/>

      <TouchableOpacity style = {styles.settingsScreenButton} onPress = {() => {
        navigation.navigate('UserPageScreen')
      }}>
          <IconFA name="tools" color={'#FF8811'} size={30}/>
      </TouchableOpacity>

        <View style={styles.collectionSection}>
          <Text style={styles.collectionTitle}>Mes collections</Text>
          <View style={styles.collectionSubSection}>
            <Text style={styles.collectionSubhead}>Mes histoires préférées:</Text>

            { loadingFav ?
              <LottieView style={styles.smallLoader} source={require('../assets/animations/8442-load-rappi.json')} autoPlay loop />
              :
              favoritesStoriesRender
            }
          </View>


          <View style={styles.collectionSubSection}>
            <Text style={styles.collectionSubhead}>Mes histoires publiées:</Text>

            { loadingPub ?
              <LottieView style={styles.smallLoader} source={require('../assets/animations/8442-load-rappi.json')} autoPlay loop />
              :
              publishedStoriesRender
            }
          </View>
        </View>

    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  collectionSubSection : {
    height: '44%',
  },
  collectionSubhead: {
    color: '#0C2E06',
    fontFamily: "JosefinSans-Regular",
    fontSize : 16,
    padding : 15,
    width: '90%',
    alignSelf :'center',
  },
  collectionSection : {
    width: (Dimensions.get('window').width),
  },
  collectionTitle : {
    color: '#0C2E06',
    fontFamily: "JosefinSans-Regular",
    fontSize : 22,
    padding: 8,
    textAlign: 'center',
    marginBottom : 8,
  },
  container: {
    alignItems: "center",
    backgroundColor : "#E6E1C5",
    flex: 1,
    justifyContent: "center",
    paddingBottom : 34,
  },
  flatListContainer: {
    backgroundColor: '#DAD3A9',
    elevation : 5,
  },
  settingsScreenButton : {
    backgroundColor: '#F8E8D5',
    borderColor:'#FF8811',
    borderRadius: 5,
    borderWidth:3,
    padding: 8,
    position: 'absolute',
    right : 16,
    top: 16,
    zIndex : 1
  },
  smallLoader : {
    alignSelf: 'center',
    width: 100,
  },
  tipsForUser : {
    fontFamily: "JosefinSans-Regular",
    fontSize : 14,
    padding : 15,
    textAlign: 'center',
    backgroundColor: '#F8E8D5',
    borderRadius: 5
  }

});
