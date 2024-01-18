import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import BtnCuston from "./BtnCuston";
import { MODE_SCAN } from "../utils/emuns";
import { Entypo } from "@expo/vector-icons";
import handlerLanguage from "../utils/languaje";
import { cyanColor, green1, green1Color, red75 } from "../styles/globalStyles";

const SmallSendToPc = ({
  channelName,
  setChannelName,
  edit,
  setEdit,
  sendCode,
  onUpdateChannel,
  editable,
  onEditable,
  statusViewEditable,
  modeScan,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>
          {handlerLanguage("channelName")}
        </Text>
        {edit ? (
          <TextInput
            autoFocus={true}
            value={channelName}
            onChangeText={setChannelName}
            onSubmitEditing={() => {
              onUpdateChannel();
              setEdit(!edit);
            }}
          />
        ) : (
          <Text>{channelName}</Text>
        )}
        <BtnCuston
          title={<Entypo name={edit ? "save" : "edit"} size={20} />}
          backGColor={green1Color}
          onPress={() => {
            if (edit) {
              onUpdateChannel();
            }
            setEdit(!edit);
          }}
          styles={{ width: 35, height: 35, paddingVertical: 5 }}
        />
      </View>
      <View style={styles.secundaryBtns}>
        <BtnCuston
          value1={<Entypo name="laptop" size={24} />}
          title={handlerLanguage("sendList")}
          backGColor={cyanColor}
          onPress={() => sendCode(null, true)}
        />
        {editable && modeScan === MODE_SCAN.CAMERA && (
          <BtnCuston
            title={
              !statusViewEditable
                ? handlerLanguage("addMore")
                : handlerLanguage("hideScanner")
            }
            backGColor={statusViewEditable ? red75 : green1}
            onPress={onEditable}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 5,
    margin: 5,
    borderRadius: 4,
  },
  secundaryBtns: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 5,
    gap: 10,
  },
});

export default SmallSendToPc;
