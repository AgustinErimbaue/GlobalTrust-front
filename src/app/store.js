import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import account from "../features/account/accountSlice";
import card from "../features/card/cardSlice";

export const store = configureStore({
  reducer: {
    auth,
    account,
    card,
  },
});
