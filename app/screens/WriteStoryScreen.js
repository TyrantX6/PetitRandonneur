import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default WriteStoryScreen = ({navigation}) => {



  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ecrire une histoire</Text>
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    fontSize : 35,
    marginVertical: 20,
  },
});
