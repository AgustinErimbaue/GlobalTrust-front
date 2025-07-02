import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loanService from "./loanService";

const initialState = {
    loan: null,
    loans: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const createLoan = createAsyncThunk(
    "loan/createLoan",
    async (loanData, thunkAPI) => {
        try {
            return await loanService.createLoan(loanData);
        } catch (error) {
            const msg =
                error.response?.data?.msg || error.message || "Error creating loan";
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const getLoansByUserId = createAsyncThunk(
    "loan/getLoansByUserId",
    async (_, thunkAPI) => {
        try {
            return await loanService.getLoansByUserId();
        } catch (error) {
            const msg =
                error.response?.data?.msg || error.message || "Error fetching loans";
            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const loanSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {
        resetLoanState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createLoan.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = "";
            })
            .addCase(createLoan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loan = action.payload;
                state.message = "Loan created successfully";
            })
            .addCase(createLoan.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.loan = null;
            })
            .addCase(getLoansByUserId.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = "";
            })
            .addCase(getLoansByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.loans = action.payload;
                state.message = "Loans fetched successfully";
            })
            .addCase(getLoansByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.loans = [];
            });
    },
    
});

export const { resetLoanState } = loanSlice.actions;
export default loanSlice.reducer;