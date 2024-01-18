import { createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import handlerLanguage from "../utils/languaje";
import { LS_LISTCODES, lsGetItems, lsSetItems } from "../utils/localStorage";

export const updateItem = createAsyncThunk(
  "sistem/updateItem",
  async ({ listNames, name, newItem }, { rejectWithValue }) => {
    const msgSave = handlerLanguage("saveMsg");
    const msgErrorName = handlerLanguage("errorName");

    if (name?.length) {
      if (listNames?.length) {
        if (listNames.includes(name)) {
          Alert.alert(false, msgErrorName, [], {
            cancelable: true,
          });
          return rejectWithValue(msgErrorName);
        }
        const codesList = await lsGetItems(LS_LISTCODES);
        const newListCodes = [...codesList, newItem];

        await lsSetItems(LS_LISTCODES, newListCodes);

        return newListCodes;
      }
      const firstItem = [newItem];
      await lsSetItems(LS_LISTCODES, firstItem);
      return firstItem;
    }
    Alert.alert(false, msgSave, [], {
      cancelable: true,
    });
    return rejectWithValue(msgSave);
  }
);

export const deleteList = createAsyncThunk(
  "sistem/deleteList",
  async ({ id, listCodes }) => {
    const newList = listCodes?.filter((e) => e.id !== id);
    await lsSetItems(LS_LISTCODES, newList);
    return newList;
  }
);

export const deleteItem = createAsyncThunk(
  "sistem/deleteItem",
  async ({ item, listCodes }) => {
    const oldList = listCodes.filter((e) => e.id !== item.id);
    const newList = [...oldList, item];
    await lsSetItems(LS_LISTCODES, newList);
    return { newList, item };
  }
);

export const updateList = createAsyncThunk(
  "sistem/updateList",
  async ({ updatedItem }) => {
    const currentListItems = await lsGetItems(LS_LISTCODES);
    const oldList = currentListItems.filter((e) => e.id !== updatedItem.id);
    const currentList = [...oldList, updatedItem]
    await lsSetItems(LS_LISTCODES, currentList);
    return { currentList, updatedItem };
  }
);
