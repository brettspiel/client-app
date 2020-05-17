import { configureStore } from "@reduxjs/toolkit";
import { user } from "./modules/user";

export const store = configureStore({
  reducer: {
    user,
  },
  devTools: process.env.NODE_ENV === "development",
});
