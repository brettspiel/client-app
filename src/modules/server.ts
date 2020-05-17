import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ServerState = {
  internalV4?: string;
  publicV4?: string;
};

const initialState: ServerState = {};

const slice = createSlice({
  name: "server",
  initialState,
  reducers: {
    register: (
      state,
      action: PayloadAction<{ internalV4: string; publicV4: string }>
    ) => {
      state.internalV4 = action.payload.internalV4;
      state.publicV4 = action.payload.publicV4;
    },
  },
});

export const { register } = slice.actions;
export const server = slice.reducer;
