import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import tokenExpiryMiddleware from "../utils/tokenExpiryMiddleware";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "expiry"],
};

const persitedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persitedAuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(tokenExpiryMiddleware),
});

export const persistor = persistStore(store);
