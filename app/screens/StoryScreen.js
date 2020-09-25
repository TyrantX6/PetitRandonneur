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

import IconMaterial from 'react-native-vector-icons/MaterialIcons';


export default StoryScreen = ({route}) => {

  return (

    <SafeAreaView style={styles.background}>
      <ScrollView>
        <Text style={styles.storyTitle}>{route.params.title}</Text>
        <IconMaterial style={styles.favoriteIcon} name="favorite-border" color={'#FF8811'} size={50} />
        <Image style={styles.storyCover}source={route.params.cover}/>
        <Text style={styles.incentive}>Trouve moi si tu peux!</Text>
        <Text style={styles.tale}>{route.params.tale}</Text>
        <Text style={styles.author}>{route.params.author}</Text>
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
    paddingVertical : 10
  },
  storyCover: {
    borderRadius : 5,
    width :'80%',
    height: 250,
    resizeMode: 'contain',
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


