import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { blackColor, green1Color, red1Color } from "../styles/globalStyles";
import {
  MaterialIcons,
  AntDesign,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import BtnCuston from "./BtnCuston";

const ItemRow = ({ id, code, deleteItem, disabledDelete = false, onSend }) => {
  const [showBarcode, setShowBarcode] = useState(false);
  const iconsSize = 25;

  const handlerDelete = () => {
    deleteItem(id);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <Text
            style={{
              flex: 1,
              fontWeight: "700",
              color: showBarcode ? green1Color : blackColor,
            }}
          >
            {code}
          </Text>
        </ScrollView>
        <View style={{ flexDirection: "row", gap: 15 }}>
          {!disabledDelete && (
            <BtnCuston
              backGColor={red1Color}
              onPress={handlerDelete}
              title={<AntDesign name="delete" size={iconsSize} />}
            />
          )}
          <BtnCuston
            title={<Entypo name="laptop" size={iconsSize} />}
            onPress={() => onSend(code)}
            backGColor={"black"}
          />
          <BtnCuston
            onPress={() => setShowBarcode(!showBarcode)}
            backGColor={!showBarcode ? green1Color : blackColor}
            title={
              showBarcode ? (
                <FontAwesome name="eye-slash" size={iconsSize} />
              ) : (
                <MaterialIcons name="qr-code-2" size={iconsSize} />
              )
            }
          />
        </View>
      </View>
      <View
        style={[
          styles.qrView,
          {
            display: showBarcode ? "flex" : "none",
          },
        ]}
      >
        <QRCode value={code} />
      </View>
      <View style={styles.line}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    margin: 5,
  },
  qrView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  line: {
    left: "2.5%",
    width: "95%",
    borderBottomWidth: 1,
  },
});

export default ItemRow;
