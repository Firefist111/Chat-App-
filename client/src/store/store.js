import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/userSlice";
import messageReducer from "./slice/message/messageSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import socketReducer from "./slice/socket/socketSlice";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["isAuthenticated", "user"], // persist ONLY auth data
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // 👈 important
    message: messageReducer,
    socket : socketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // REQUIRED
    }),
});

export const persistor = persistStore(store);
