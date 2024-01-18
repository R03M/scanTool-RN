import React from "react";
import { View, StyleSheet, Pressable, Text, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BtnCuston from "./BtnCuston";
import {
  blackColor,
  blueColor,
  red1Color,
  themeColor,
  white2Color,
  whiteColor,
} from "../styles/globalStyles";
import handlerLanguage from "../utils/languaje";

const CollectionItem = ({ item, onDelete, openDetails }) => {
  const title = handlerLanguage("wait");
  const subtitle = `${handlerLanguage("msgDelList")}${item.name}`;
  const btnCancel = handlerLanguage("cancel");
  const btnOk = handlerLanguage("delete");

  const handleDelete = () => {
    Alert.alert(title, subtitle, [
      {
        text: btnCancel,
      },
      {
        text: btnOk,
        onPress: () => onDelete(item.id),
      },
    ]);
  };

  return (
    <Pressable onPress={openDetails}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: pressed ? themeColor : whiteColor,
            },
          ]}
          key={item.id}
        >
          <Text
            style={[
              styles.name,
              {
                color: pressed ? whiteColor : blackColor,
              },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={{
              width: "25%",
              fontWeight: 800,
              color: pressed ? whiteColor : blackColor,
            }}
          >
            {item.listCodes?.length}
          </Text>
          <BtnCuston
            backGColor={red1Color}
            styles={styles.btn}
            title={<AntDesign name="delete" size={20} />}
            onPress={handleDelete}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  name: {
    width: "25%",
    height: 50,
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  btn: {
    width: 35,
    height: 35,
    paddingVertical: 5,
  },
});

export default CollectionItem;
