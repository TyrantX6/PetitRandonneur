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




export default StoryScreen = ({route}) => {

  return (

    <SafeAreaView>
      <Text style={styles.fact}>{route.params.title}</Text>
      <Text style={styles.fact}>{route.params.description}</Text>
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({
  fact: {
    height : 100
  }
});


