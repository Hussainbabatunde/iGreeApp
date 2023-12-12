import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { FINGERAPP } from "@env";

import { Alert } from "react-native";
import { sentEmail } from "../app/otpscreen";

export interface IUsersList {
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
  registermessage: any,
  registerdata: {
    message: String,
    status: String,
    data: {
      otp: String
    } 
  } | null,
  verifyUserData : {
    data:{
      id: number
    },
    message: String 
  } | null,
  setupUserData : {
    extra: {
      token: string
    },
    message: string
  } | null
}

 interface RegisterDataInfo{
  message: String,
  status: String,
  data: {
    otp: String
  }
}

const initialState: IUsersList = {
  isError: false,
  isSuccess: false,
  FeedListingLoading: false,
  loginmessage: null,
  logindata: null,
  registerdata: null,
  registermessage: null,
  verifyUserData: null,
  setupUserData: null
};

export type Data = {
    email: string,
    password: string
}

export type SetupData = {
  data: {
    firstname: string;
    lastname: string;
    phonenumber: string;
},
verifyUserId : number | any}



export const RegisterAuthApi = createAsyncThunk(
  "RegisterAuth/userRegisterAuth",
  async (data: Data, { rejectWithValue }) => {
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
      .post("auth/register", data)
      .then(async (response) => {
        // console.log("register2 ", response.data)
        // Alert.alert(response.data?.body)
        return await response.data;
      })

      .catch((err) => {
        let errdata = err.response.data;
        // console.log("error ", errdata);
        return rejectWithValue(errdata);
        // console.log(err)
      });
  }
);

export const VerifyUserAuthApi = createAsyncThunk(
  "verifyUser/userVerifyUser",
  async (data: sentEmail, { rejectWithValue }) => {
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
      .put(`/auth/verify/${data}`)
      .then(async (response) => {
        // console.log("verify ", response?.data)
        // Alert.alert(response.data?.body)
        return await response.data;
      })

      .catch((err) => {
        let errdata = err.response.data;
        // console.log("error ", errdata);
        return rejectWithValue(errdata);
        // console.log(err)
      });
  }
);

  export const SetupUserAuthApi = createAsyncThunk(
    "setupUser/userSetupUser",
    async (setupData: SetupData, { rejectWithValue }) => {
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
        .post(`/auth/setup-profile/${setupData?.verifyUserId}`, setupData?.data)
        .then(async (response) => {
          // console.log("setup ", response?.data)
          // Alert.alert(response.data?.body)
          return await response.data;
        })

        .catch((err) => {
          let errdata = err.response.data;
          // console.log("error ", errdata);
          return rejectWithValue(errdata);
          // console.log(err)
        });
    }
  );



export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterAuthApi.pending, (state) => {
        state.FeedListingLoading = true;
      })
      .addCase(RegisterAuthApi.fulfilled, (state, action) => {
        //   console.log("FeedListingdata ", action.payload);
        state.FeedListingLoading = false;
        state.isSuccess = true;
        state.registerdata = action.payload;
      })
      .addCase(RegisterAuthApi.rejected, (state, action) => {
        state.FeedListingLoading = false;
        state.isError = true;
        state.registermessage = action.payload;
      })
      .addCase(VerifyUserAuthApi.pending, (state) => {
        state.FeedListingLoading = true;
      })
      .addCase(VerifyUserAuthApi.fulfilled, (state, action) => {
        //   console.log("FeedListingdata ", action.payload);
        state.FeedListingLoading = false;
        state.isSuccess = true;
        state.verifyUserData = action.payload;
      })
      .addCase(VerifyUserAuthApi.rejected, (state, action) => {
        state.FeedListingLoading = false;
        state.isError = true;
        state.registermessage = action.payload;
      })
      .addCase(SetupUserAuthApi.pending, (state) => {
        state.FeedListingLoading = true;
      })
      .addCase(SetupUserAuthApi.fulfilled, (state, action) => {
        //   console.log("FeedListingdata ", action.payload);
        state.FeedListingLoading = false;
        state.isSuccess = true;
        state.setupUserData = action.payload;
      })
      .addCase(SetupUserAuthApi.rejected, (state, action) => {
        state.FeedListingLoading = false;
        state.isError = true;
        state.registermessage = action.payload;
      })     
  },
});

export const { reset } = AuthSlice.actions;

// export const selectLoginSlice = (state) => state.LoginSlice;
export default AuthSlice.reducer;
