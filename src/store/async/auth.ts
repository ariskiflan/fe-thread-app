import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../libs/api/call/user";
import { ILogin } from "../../types/app";
import { getProfile } from "../../libs/api/call/profile";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (body: ILogin, thunkAPI) => {
    try {
      const res = await login(body);

      const token = res.data.data;
      localStorage.setItem("token", token);

      return token;
    } catch (error) {
      const err = error as unknown as Error;
      console.log(err);

      thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getProfileAsync = createAsyncThunk(
  "auth/getProfile",
  async (token: string) => {
    try {
      const { data } = await getProfile(token);

      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
