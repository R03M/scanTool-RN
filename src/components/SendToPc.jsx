import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  darkPure,
  green2Color,
  red1Color,
  themeColor,
  white2Color,
} from "../styles/globalStyles";
import { LS_CHANNEL_NAME, lsSetItems } from "../utils/localStorage";
import handlerLanguage from "../utils/languaje";
import BtnCuston from "./BtnCuston";

const SendToPc = ({
  sendToPcVisible,
  setSendToPcVisible,
  channelName,
  setChannelName,
  sendCodes,
  setSendCodes,
}) => {
  const firstName = handlerLanguage("firstName");

  const handleChannelName = async (value) => {
    setChannelName(value);
    await lsSetItems(LS_CHANNEL_NAME, value);
    if (value === "") {
      setSendCodes(false);
    }
  };

  const handleSwitch = () => {
    if (channelName?.length) {
      setSendCodes(!sendCodes);
      setSendToPcVisible(!sendToPcVisible);
      return;
    }
    Alert.alert(false, firstName, [], {
      cancelable: true,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={sendToPcVisible}
      onRequestClose={() => {
        setSendToPcVisible(!sendToPcVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.titleSTP}>{handlerLanguage("qSendC")}</Text>
          </View>

          <View style={{ gap: 10, marginVertical: 20, alignItems: "center" }}>
            <View style={styles.rowsStp}>
              <Text style={styles.subtitlesStp}>
                {handlerLanguage("channelName")}
              </Text>
              <TextInput
                value={channelName}
                onChangeText={handleChannelName}
                style={styles.textInputStp}
              />
            </View>
            <View style={styles.rowsStp}>
              <Text style={styles.subtitlesStp}>
                {handlerLanguage("activate")}
              </Text>
              <Switch
                trackColor={{ false: red1Color, true: darkPure }}
                thumbColor={sendCodes ? green2Color : white2Color}
                onValueChange={handleSwitch}
                value={sendCodes}
              />
            </View>
            {channelName && (
              <Text style={styles.infoStp}>
                {channelName}
                {handlerLanguage("channelNameInf")}
              </Text>
            )}
          </View>
          <View style={{ alignItems: "center" }}>
            <BtnCuston
              title={handlerLanguage("close")}
              backGColor={red1Color}
              onPress={() => setSendToPcVisible(!sendToPcVisible)}
              styles={{ width: "50%" }}
            />
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
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 25,
    elevation: 5,
    justifyContent: "space-between",
  },
  titleSTP: {
    textAlign: "center",
    fontSize: 16,
    color: themeColor,
    fontWeight: "bold",
  },
  rowsStp: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  subtitlesStp: {
    fontWeight: "bold",
  },
  textInputStp: {
    backgroundColor: white2Color,
    borderRadius: 2,
    width: 100,
    textAlign: "center",
  },
  infoStp: {
    fontStyle: "italic",
    color: themeColor,
    textAlign: "center",
  },
});

export default SendToPc;
