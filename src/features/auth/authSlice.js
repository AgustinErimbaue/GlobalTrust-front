import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = JSON.parse(localStorage.getItem("token") || null);
const initialState = {
  user: user,
  token: token,
};

export const register = createAsyncThunk(
  "auth/register",
  async (registerData) => {
    try {
      return await authService.register(registerData);
    } catch (error) {
      console.error(error);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (loginData) => {
  try {
    return await authService.login(loginData);
  } catch (error) {
    console.error(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export default authSlice.reducer;
