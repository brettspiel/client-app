import { User } from "../types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  users: User[];
};

const initialState: UserState = {
  users: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    join: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    leave: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter((u) => u.id !== action.payload.id);
    },
  },
});

export const { join, leave } = slice.actions;
export const user = slice.reducer;
