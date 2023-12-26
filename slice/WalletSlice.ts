import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FINGERAPP } from "@env";

import { Alert } from "react-native";
import { Data } from "./Auth";
import { Toast } from "toastify-react-native";
import { TopupType } from "../Navigation/PagesNavigation/wallet";

export interface WalletState {
    isError: boolean,
  isSuccess: boolean,
  FeedListingLoading: boolean,
  loginmessage: any,
  topupdata: {
    data: string | null
  } | null
}


const initialState: WalletState = {
    isError: false,
    isSuccess: false,
    FeedListingLoading: false,
    loginmessage: null,
    topupdata: null
  };


export const TopupWalletApi = createAsyncThunk(
    "topupWallet/userTopupwallet",
    async (data: TopupType, { rejectWithValue }) => {
      // console.log('LoginAuthApi', data)
      const tokengot = await AsyncStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      // console.log(FINGERAPP)
      const instance = axios.create({
        baseURL: FINGERAPP,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": infoneeded
        },
      });
      return await instance
        .post("transactions/topup", data)
        .then(async (response) => {
            console.log('wallet top up ', response?.data)
          // Alert.alert(response.data?.body)
          return await response.data;
        })
  
        .catch((err) => {
          let errdata = err.response.data;
          console.log("error ", errdata);
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );

  

export const WalletSlice = createSlice({
    name: "WalletSlice",
    initialState,
    reducers: {
      reset: (state) => {
        Object.assign(state, initialState);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(TopupWalletApi.pending, (state) => {
          state.FeedListingLoading = true;
        })
        .addCase(TopupWalletApi.fulfilled, (state, action) => {
          //   console.log("FeedListingdata ", action.payload);
          state.FeedListingLoading = false;
          state.isSuccess = true;
          state.topupdata = action.payload;
        })
        .addCase(TopupWalletApi.rejected, (state, action) => {
          state.FeedListingLoading = false;
          state.isError = true;
          state.loginmessage = action.payload;
        })     
    },
  });
  
  export const { reset } = WalletSlice.actions;
  
  // export const selectLoginSlice = (state) => state.LoginSlice;
  export default WalletSlice.reducer;