import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Button,
} from "react-native";
import { red2Color, themeColor } from "../styles/globalStyles";
import { WebView } from "react-native-webview";

const UpdateModal = ({ modalVisible, setModalVisible, data }) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.textSty}>
          Download the new version {data.version}
        </Text>
        <Text style={styles.infSty}>
          {data.info}
        </Text>
        <View style={styles.centeredView}>
          <WebView source={{ uri: data.url }} />
        </View>
        <Button
          title="cancel"
          onPress={() => setModalVisible(!modalVisible)}
          color={red2Color}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  textSty: {
    backgroundColor: themeColor,
    padding: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  infSty: {
    backgroundColor: themeColor,
    paddingBottom: 4,
    paddingLeft: 10,
    color: "#fff",
    fontSize: 16,
  },
});

export default UpdateModal;
