import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FINGERAPP } from "@env";

import { Alert } from "react-native";
import { Data } from "./Auth";

export interface LoginState {
    isError: boolean,
  isSuccess: boolean,
  FeedListingLoading: boolean,
  loginmessage: any,
  logindata: {
    data:{
    id: number,
    firstname: string | null,
    lastname: string | null,
    email: string,
    phonenumber: string | null,
    username: string | null,
    has_completed_profile: string | null,
    wallet_balance: string
  },
    message: string
  } | null,
}


const initialState: LoginState = {
    isError: false,
    isSuccess: false,
    FeedListingLoading: false,
    loginmessage: null,
    logindata: null
  };


export const LoginAuthApi = createAsyncThunk(
    "loginAuth/userLoginAuth",
    async (data: Data, { rejectWithValue }) => {
      console.log('LoginAuthApi', data)
      const tokengot = await AsyncStorage.getItem("token");
      const infoneeded = `Bearer ${tokengot}`;
      // console.log(FINGERAPP)
      const instance = axios.create({
        baseURL: FINGERAPP,
        timeout: 20000,
  
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      return await instance
        .post("auth/login", data)
        .then(async (response) => {
          console.log("login ", response.data)
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

  

export const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState,
    reducers: {
      reset: (state) => {
        Object.assign(state, initialState);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(LoginAuthApi.pending, (state) => {
          state.FeedListingLoading = true;
        })
        .addCase(LoginAuthApi.fulfilled, (state, action) => {
          //   console.log("FeedListingdata ", action.payload);
          state.FeedListingLoading = false;
          state.isSuccess = true;
          state.logindata = action.payload;
        })
        .addCase(LoginAuthApi.rejected, (state, action) => {
          state.FeedListingLoading = false;
          state.isError = true;
          state.loginmessage = action.payload;
        })     
    },
  });
  
  export const { reset } = LoginSlice.actions;
  
  // export const selectLoginSlice = (state) => state.LoginSlice;
  export default LoginSlice.reducer;