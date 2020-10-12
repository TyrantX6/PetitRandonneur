import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,

} from 'react-native';

import {useNavigation} from "@react-navigation/core";
import IconEntypo from 'react-native-vector-icons/Entypo.js';


export default StoryComponent = story => {

  const navigation = useNavigation();



  return (

    <View style={styles.storyComponent}>
      <TouchableOpacity
        onPress={() => navigation.navigate('StoryScreen', {
          id : story.id,
          title : story.title,
          excerpt : story.excerpt,
          tale : story.tale,
          cover : story.cover,
          author : story.author,
        })}
      >
        <View style={styles.componentWrapper} >
          <Text numberOfLines={1} style={styles.itemTitle}>{story.title}</Text>
          <IconEntypo  name="arrow-with-circle-right" color={'#FF8811'} size={34} />
        </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  componentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color : '#0C2E06',
    fontFamily: "JosefinSans-Regular",
    fontSize : 16,
    maxWidth : '88%',
    paddingTop : 7,
  },
  storyComponent: {
    elevation : 5,
    marginVertical: 5,
    width:'90%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignSelf: 'center',
    backgroundColor: '#F8E8D5',
    borderRadius: 5
  },

});
