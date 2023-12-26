import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import { combineReducers } from "redux";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthSlice from './slice/Auth'
import LoginSlice from './slice/LoginSlice'
import WalletSlice from './slice/WalletSlice'


const reducers = combineReducers({
  AuthSlice:AuthSlice,
  LoginSlice: LoginSlice,
  WalletSlice: WalletSlice
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
//   blacklist: ["RejectTripSlice", "GetAllDriverTripsSlice", "logoutSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware option needs to be provided for avoiding the error. ref: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },

      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
