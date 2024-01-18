import React from "react";
import { View, StyleSheet, Modal, Text, ScrollView } from "react-native";
import {
  green1,
  red2Color,
  themeColor,
  whitePure,
} from "../styles/globalStyles";
import BtnCuston from "./BtnCuston";
import { WebView } from "react-native-webview";
import handlerLanguage from "../utils/languaje";

const UpdateModal = ({ modalVisible, setModalVisible, data }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textSty}>
            {handlerLanguage("downlodTheV")} {data.version}
          </Text>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <Text style={styles.infSty}>{data.info}</Text>
          </ScrollView>
        </View>
      </View>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: data.url,
        }}
      />
      <View style={styles.btns}>
        <BtnCuston
          title={handlerLanguage("cancel")}
          onPress={() => setModalVisible(!modalVisible)}
          backGColor={red2Color}
          styles={{ padding: 80 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: themeColor,
  },
  header: {
    height: 70,
  },
  textSty: {
    padding: 20,
    textAlign: "center",
    color: whitePure,
    fontSize: 16,
    fontWeight: "700",
  },
  body: {
    height: "60%",
    paddingHorizontal: 5,
  },
  infSty: {
    paddingBottom: 4,
    paddingLeft: 10,
    color: whitePure,
    fontSize: 16,
  },
  btns: {
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: themeColor,
  },
  endMsg: {
    color: whitePure,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default UpdateModal;
