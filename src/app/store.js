import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import account from "../features/account/accountSlice";
export const store = configureStore({
  reducer: {
    auth,
    account,
  },
});
