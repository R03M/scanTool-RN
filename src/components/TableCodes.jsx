import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Alert,
} from "react-native";
import BtnCuston from "./BtnCuston";
import uuid from "react-native-uuid";
import { updateItem } from "../redux/action";
import handlerLanguage from "../utils/languaje";
import { getNameofListS } from "../utils/allNamesList";
import { useDispatch, useSelector } from "react-redux";
import { initialStatusUpdate } from "../redux/sistemSlice";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  darkColor,
  green1Color,
  red1Color,
  themeColor,
  whiteColor,
} from "../styles/globalStyles";

const TableCodes = ({
  listCode,
  setListCode,
  deleteItem,
  goToDetails,
  edit,
  setEdit,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [showInputName, setShowInputName] = useState(false);
  const { statusUpdate } = useSelector((state) => state.sistem);
  const iconsSize = 25;

  const handlerSave = async () => {
    let listNames = await getNameofListS();

    const newItem = {
      id: uuid.v4(),
      name: name,
      listCodes: listCode,
    };
    dispatch(updateItem({ listNames, name, newItem })).then((action) => {
      const error = action.error;
      if (!error) {
        setName("");
        setShowInputName(false);
        setListCode([]);
      }
    });
    setEdit(!edit);
  };

  const handlerDelete = (id) => {
    deleteItem(id);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(initialStatusUpdate());
    }, 800);
  }, [statusUpdate]);

  return (
    <View style={styles.scrollV}>
      {statusUpdate ? (
        <Text style={styles.msgCreateOk}>{handlerLanguage("savedList")}</Text>
      ) : (
        <View style={styles.containerList}>
          <BtnCuston
            backGColor={showInputName ? red1Color : green1Color}
            styles={{ width: 50, height: 50 }}
            title={
              showInputName ? (
                <MaterialIcons name="cancel" size={iconsSize} />
              ) : (
                <Entypo name="save" size={iconsSize} />
              )
            }
            onPress={() => {
              if (!listCode.length) {
                const msg = handlerLanguage("msgNoCodeList");
                Alert.alert(false, msg, [], { cancelable: true });
                return;
              }
              setShowInputName(!showInputName);
              setEdit(!edit);
              setName("");
            }}
          />
          {showInputName ? (
            <View style={styles.viewTextInput}>
              <TextInput
                autoFocus
                placeholder={handlerLanguage("nameOfList")}
                value={name}
                onChangeText={setName}
                onSubmitEditing={handlerSave}
              />
            </View>
          ) : (
            <Text style={{ color: green1Color, fontWeight: "bold" }}>
              {handlerLanguage("scanCodes")} {listCode.length}
            </Text>
          )}
          <BtnCuston
            backGColor={green1Color}
            styles={{ width: 50, height: 50 }}
            title={<MaterialIcons name="qr-code-2" size={iconsSize} />}
            onPress={() => {
              if (listCode.length) {
                goToDetails();
                return;
              }
              const msg = handlerLanguage("msgNoCodesShow");
              Alert.alert(false, msg, [], { cancelable: true });
            }}
          />
        </View>
      )}
      <ScrollView contentContainerStyle={{ padding: 10, gap: 10 }}>
        {listCode.map(({ id, code }) => {
          return (
            <View style={styles.rowsItems} key={id}>
              <AntDesign
                name="delete"
                size={iconsSize}
                color={red1Color}
                onPress={() => handlerDelete(id)}
              />
              <ScrollView horizontal={true}>
                <Text key={id} style={styles.textSty}>
                  {code}
                </Text>
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollV: {
    flex: 1,
    backgroundColor: darkColor,
    borderRadius: 4,
    margin: 2,
    borderColor: themeColor,
  },
  textSty: {
    color: whiteColor,
    fontWeight: "700",
    textAlign: "center",
  },
  msgCreateOk: {
    backgroundColor: whiteColor,
    padding: 10,
    borderRadius: 2,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: green1Color,
  },
  viewTextInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowsItems: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    paddingVertical: 5,
  },
  containerList: {
    flexDirection: "row",
    backgroundColor: whiteColor,
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    borderRadius: 4,
  },
});

export default TableCodes;
