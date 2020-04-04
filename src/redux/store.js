import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import  rootReducer  from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { PERSIST } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contacts"],
  blacklist: ["_persist"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST]
    }
  })
}); 
export const persistor = persistStore(store); 
