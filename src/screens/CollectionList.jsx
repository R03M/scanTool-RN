import React, { useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "../redux/action";
import { initialStatusDelete, setItemView } from "../redux/sistemSlice";
import CollectionItem from "../components/CollectionItem";
import { useNavigation } from "@react-navigation/native";
import AlertMsg from "../components/AlertMsg";
import handlerLanguage from "../utils/languaje";

const CollectionList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { listCodes, statusDelete } = useSelector((state) => state.sistem);

  const handleDelete = (id) => {
    dispatch(deleteList({ id, listCodes }));
  };

  const handleOpenDetails = (id) => {
    const item = listCodes.find((i) => i.id === id);
    dispatch(setItemView(item));
    navigation.navigate("ListOfItems");
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(initialStatusDelete());
    }, 400);
  }, [statusDelete]);

  return (
    <>
      {statusDelete && <AlertMsg msg={"Eliminado"} />}
      <View style={{ flex: 1, margin: 5 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listCodes?.length ? (
            listCodes.map((item) => {
              return (
                <CollectionItem
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  openDetails={() => handleOpenDetails(item.id)}
                />
              );
            })
          ) : (
            <Text style={{ textAlign: "center" }}>
              {handlerLanguage("noListCollection")}
            </Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default CollectionList;
