import { configureStore } from "@reduxjs/toolkit";
import { user } from "./modules/user";
import { server } from "./modules/server";

export const store = configureStore({
  reducer: {
    user,
    server,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type ReduxState = ReturnType<typeof store.getState>;
