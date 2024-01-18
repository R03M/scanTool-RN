import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, deleteList, updateItem, updateList } from "./action";

const initialState = {
  listCodes: [],
  valueListInsp: null,
  itemView: [],
  modeScan: "camera",

  //? update item
  statusUpdate: false,
  error: null,

  //? delete list
  statusDelete: false,
  errorDelete: null,

  //? delete item of list
  statusDelItem: false,
  errorDelete: null,
};

export const sistemSlice = createSlice({
  name: "sistem",
  initialState,
  reducers: {
    setList: (state, action) => {
      state.listCodes = action.payload;
    },
    initialStatusUpdate: (state) => {
      state.statusUpdate = false;
    },
    initialStatusDelete: (state) => {
      state.statusDelete = false;
    },
    setValueListInsp: (state, action) => {
      state.valueListInsp = action.payload;
    },
    setItemView: (state, action) => {
      state.itemView = action.payload;
    },
    initialStatusDelItem: (state) => {
      state.statusDelItem = false;
    },
    setModeScan: (state, action) => {
      state.modeScan = action.payload;
    },
  },
  extraReducers: (builter) => {
    builter
      //? update item
      .addCase(updateItem.fulfilled, (state, action) => {
        state.listCodes = action.payload;
        state.statusUpdate = true;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      //? delete list
      .addCase(deleteList.fulfilled, (state, action) => {
        state.listCodes = action.payload;
        state.statusDelete = true;
      })
      //? delete item
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.listCodes = action.payload.newList;
        state.itemView = action.payload.item;
        state.statusDelItem = true;
      })
      //? update item
      .addCase(updateList.fulfilled, (state, action) => {
        state.listCodes = action.payload.currentList;
        state.itemView = action.payload.updatedItem;
      });
  },
});

export const {
  setList,
  initialStatusUpdate,
  initialStatusDelete,
  setValueListInsp,
  setItemView,
  initialStatusDelItem,
  setModeScan
} = sistemSlice.actions;

export default sistemSlice.reducer;
