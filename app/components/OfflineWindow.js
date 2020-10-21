import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions

} from 'react-native';
import LottieView from 'lottie-react-native';
import {NetworkConsumer} from 'react-native-offline';



export default OfflineWindow = () => {

  return (

      <View style={styles.container} >
        <NetworkConsumer>
          {({ isConnected }) => (
            isConnected ? (
              <Text></Text>
            ) : (

                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Vous semblez être hors-ligne:</Text>
                    <Text style={styles.modalText}>
                      Merci de vous re-connecter à Internet afin de pouvoir accéder à notre contenu de façon optimale.
                    </Text>
                    <View style={styles.offlineAnimationContainer}>
                      <LottieView style={styles.offlineAnimation}
                                  source={require('../assets/animations/13262-no-internet-connection.json')} autoPlay loop/>
                    </View>

                  </View>
                </View>
            )
          )}
        </NetworkConsumer>
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center'
  },
  container : {
    alignSelf: 'center',
    bottom: '-10%',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  modalView: {
    margin: 16,
    backgroundColor: '#E6E1C5',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#0C2E06',
    shadowOffset: {
      width: 15,
      height: 10,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 16,
  },
  modalText: {
    fontFamily: 'JosefinSans-Regular',
    marginBottom: 15,
    fontSize: 13,
    textAlign: 'center',
  },
  modalTitle: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  offlineAnimation: {
    alignSelf: 'center',
    height: 180,
    justifyContent: 'center',
  },
  offlineAnimationContainer: {
    backgroundColor: '#2CA6A4',
    borderColor: '#005554',
    borderRadius: 5,
    borderWidth: 3,
    marginBottom : 8,
  },

});
