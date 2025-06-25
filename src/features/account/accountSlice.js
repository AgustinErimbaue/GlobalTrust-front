import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";
import { logout } from "../auth/authSlice";

const initialState = {
  id: null,
  accountNumber: "",
  balance: 0,
  type: "",
  currency: "",
  UserId: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const getById = createAsyncThunk(
  "account/getById",
  async (accountId, thunkAPI) => {
    try {
      return await accountService.getById(accountId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (accountData, thunkAPI) => {
    try {
      return await accountService.createAccount(accountData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (accountId, thunkAPI) => {
    try {
      return await accountService.deleteAccount(accountId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccount: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.accountNumber = action.payload.accountNumber;
        state.balance = action.payload.balance;
        state.type = action.payload.type;
        state.currency = action.payload.currency;
        state.UserId = action.payload.UserId;
      })
      .addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.id = action.payload.id;
        state.accountNumber = action.payload.accountNumber;
        state.balance = action.payload.balance;
        state.type = action.payload.type;
        state.currency = action.payload.currency;
        state.UserId = action.payload.UserId;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.id = null;
        state.accountNumber = "";
        state.balance = 0;
        state.type = "";
        state.currency = "";
        state.UserId = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
      });
  },
});

export const { resetAccount } = accountSlice.actions;
export default accountSlice.reducer;
