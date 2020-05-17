import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ServerState = {
  url?: string;
};

const initialState: ServerState = {};

const slice = createSlice({
  name: "server",
  initialState,
  reducers: {
    registerUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { registerUrl } = slice.actions;
export const server = slice.reducer;
