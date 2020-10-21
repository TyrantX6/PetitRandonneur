import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Modal,

} from 'react-native';


export default WriteModal = ({ modalVisible, setModalVisible }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Consignes :</Text>
          <Text style={styles.modalText}>
            Chaque histoire proposée par la communauté passe par un processus de validation préalable afin d’assurer une certaine qualité dans le contenu proposé.{"\n"}

            A cet effet, l’équipe de rédaction se réserve le droit de corriger les fautes, modifier quelques mots ou de ne pas publier du tout les histoires qui ne respecteraient pas les règles de l’application.
          </Text>

          <Text style={styles.modalTextSubhead}>
            Ces règles sont :
          </Text>

          <Text style={styles.modalText}>
            - Aucun contenu offensant n’est autorisé, que ce soit pour les photos ou le texte.{"\n"}

            - Le contenu doit être pensé pour des enfants. Dans la mesure du possible les histoires doivent véhiculer des valeurs positives et éducatives. Le racisme, l'intolérance et le prosélytisme ne seront pas autorisés.{"\n"}

            - La localisation du lieu (longitude, latitude) doit être correcte et sera vérifiée par l’équipe avant publication.{"\n"}
          </Text>
          <Text style={styles.modalTextThanks}>
            L’équipe du Petit Randonneur tient à remercier chaleureusement tous les conteurs qui prendront part à l’aventure!
          </Text>

          <View>
            <TouchableHighlight
              style={{ ...styles.okButton }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

    </Modal>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 16,
    backgroundColor: "#E6E1C5",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    shadowColor: "#0C2E06",
    shadowOffset: {
      width: 15,
      height: 10
    },
    shadowOpacity: 0.55,
    shadowRadius: 5,
    elevation: 16
  },
  modalText: {
    fontFamily: "JosefinSans-Regular",
    marginBottom: 15,
    fontSize : 13,
    textAlign : 'justify',
  },
  modalTextSubhead: {
    fontFamily: "JosefinSans-SemiBold",
    marginBottom: 15,
    fontSize : 15,
    textAlign : 'justify',
  },
  modalTextThanks: {
    fontFamily: "JosefinSans-Italic",
    marginBottom: 15,
    fontSize : 13,
    textAlign : 'justify',
  },
  modalTitle: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize : 18,
    marginBottom: 15,
    textAlign: "center"
  },
  okButton: {
    backgroundColor: "#43820D",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2
  },
  okText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "JosefinSans-SemiBold",
    fontSize : 16
  },

});
