import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { userSlice } from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    userSlice: userSlice.reducer,
  },
});
