import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';



export default LoginScreen = ({navigation}) => {

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');


  return (

    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Idenfication</Text>
      <TextInput style={styles.fields}
                 onChangeText={setInputUsername}
                 placeholder = {'Username'}
                 value={inputUsername}
      />

      <TextInput style={styles.fields}
                 onChangeText={setInputPassword}
                 placeholder = {'Password'}
                 value={inputPassword}
                 secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={''}
      >
        <Text>Send the data!</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginVertical: 20,
  },
  title: {
    alignItems: "center",
    fontSize : 35,
    marginVertical: 20,
  },
  fields: {
    borderColor: 'gray',
    borderWidth: 3,
    backgroundColor:'#E8E3E3',
    width: '80%',
    alignItems: "center",
    fontSize : 16,
    marginVertical: 20,
  }

});
