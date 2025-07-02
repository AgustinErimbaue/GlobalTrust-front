import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import account from "../features/account/accountSlice";
import card from "../features/card/cardSlice";
import loan from "../features/loan/loanSlice";
export const store = configureStore({
  reducer: {
    auth,
    account,
    card,
    loan,
  },
});
