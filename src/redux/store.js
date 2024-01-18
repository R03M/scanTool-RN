import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sistemReducer from "./sistemSlice";

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

export const store = configureStore({
  reducer: {
    sistem: sistemReducer,
  },
  middleware,
});
