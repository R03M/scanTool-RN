import React from "react";
import { View, StyleSheet, Modal, Text, Alert, Image } from "react-native";
import Dots from "./Dots";
import BtnCuston from "./BtnCuston";
import { MODE_SCAN } from "../utils/emuns";
import * as Clipboard from "expo-clipboard";
import handlerLanguage from "../utils/languaje";
import { setModeScan } from "../redux/sistemSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  darkColor,
  green1Color,
  red1Color,
  skyeColor,
  themeColor,
  whiteColor,
} from "../styles/globalStyles";

const Settings = ({
  showSettings,
  setShowSettings,
  listCode,
  setListCode,
  setCopyMsg,
  sendCodes,
  sendToPcVisible,
  setSendToPcVisible,
  setActiveCam,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { modeScan } = useSelector((state) => state.sistem);

  const handledelete = () => {
    const wait = handlerLanguage("wait");
    const msgRemoved = handlerLanguage("msgRemoved");
    Alert.alert(wait, `${msgRemoved}${listCode.length}`, [
      {
        text: handlerLanguage("cancel"),
        style: "cancel",
      },
      {
        text: handlerLanguage("delete"),
        onPress: () => {
          setListCode([]);
        },
      },
    ]);
  };

  const handleCopyMsg = () => {
    setCopyMsg(true);
    setTimeout(() => {
      setCopyMsg(false);
    }, 1000);
  };

  const copyToClipboard = async () => {
    handleCopyMsg();
    const onlyCodes = listCode.map((item) => item.code);
    await Clipboard.setStringAsync(onlyCodes.join("\n"));
  };

  const handleChangeMode = () => {
    const title = handlerLanguage("changeScannerInt");
    const subtitle = handlerLanguage("changeMsg");
    const cancel = handlerLanguage("cancel");
    const changeMode = handlerLanguage("changeOk");

    if (modeScan === MODE_SCAN.CAMERA) {
      Alert.alert(title, subtitle, [
        { text: cancel },
        {
          text: changeMode,
          onPress: () => dispatch(setModeScan(MODE_SCAN.SCANNER)),
        },
      ]);
      return;
    }
    dispatch(setModeScan(MODE_SCAN.CAMERA));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showSettings}
      onRequestClose={() => {
        setShowSettings(!showSettings);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {handlerLanguage("options")}
            </Text>
          </View>

          <View style={{ gap: 10, marginVertical: 20 }}>
            <BtnCuston
              title={
                !sendCodes
                  ? handlerLanguage("sendToPc")
                  : handlerLanguage("sendToPcOn")
              }
              value1={sendCodes && <Dots mode={2} />}
              value2={sendCodes && <Dots mode={2} />}
              backGColor={darkColor}
              onPress={() => setSendToPcVisible(!sendToPcVisible)}
              stylesViewBtns={{
                gap: 5,
                justifyContent: "center",
              }}
            />
            {!listCode.length ? null : (
              <>
                <BtnCuston
                  title={handlerLanguage("copy")}
                  backGColor={green1Color}
                  onPress={copyToClipboard}
                />
                <BtnCuston
                  title={handlerLanguage("deleteCList")}
                  backGColor={red1Color}
                  onPress={handledelete}
                />
              </>
            )}
            <BtnCuston
              title={handlerLanguage("collection")}
              backGColor={skyeColor}
              onPress={() => {
                setShowSettings(!showSettings);
                setActiveCam(false);
                navigation.navigate("CollectionList");
              }}
            />
            <BtnCuston
              title={
                modeScan === "camera"
                  ? `${handlerLanguage("mode")}${handlerLanguage(
                      "selectModeScan1"
                    )}`
                  : `${handlerLanguage("mode")}${handlerLanguage(
                      "selectModeScan2"
                    )}`
              }
              backGColor={green1Color}
              onPress={handleChangeMode}
            />
          </View>
          <BtnCuston
            title={handlerLanguage("close")}
            backGColor={red1Color}
            onPress={() => setShowSettings(!showSettings)}
            styles={{ width: "80%" }}
          />
          <Image
            style={{ resizeMode: "center", width: "60%", height: "10%", marginTop: 20 }}
            source={require("../../assets/R03M_U_B.png")}
          />
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
    width: "70%",
    backgroundColor: whiteColor,
    borderRadius: 4,
    padding: 25,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },
});

export default Settings;
