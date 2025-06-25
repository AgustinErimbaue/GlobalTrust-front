import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardService from "./cardService";

const initialState = {
  card: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createCard = createAsyncThunk(
  "card/createCard",
  async (cardData, thunkAPI) => {
    try {
      return await cardService.createCard(cardData);
    } catch (error) {
      const msg =
        error.response?.data?.msg ||
        error.message ||
        "Error creating card";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    resetCardState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.card = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.card = action.payload.card || action.payload;
        state.message = action.payload.msg || "Card created successfully";
      })
      .addCase(createCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Error creating card";
        state.card = null;
      });
  },
});

export const { resetCardState } = cardSlice.actions;
export default cardSlice.reducer;
