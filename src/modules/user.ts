import { User } from "../types/User";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersApi } from "../api/UsersApi";
import { UserCreateRequest } from "../types/UserCreateRequest";
import { ReduxState } from "../store";

export type UserState = {
  self?: User;
};

const initialState: UserState = {};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addSelf: (state, action: PayloadAction<User>) => {
      state.self = action.payload;
    },
  },
});

export const createUser = createAsyncThunk(
  "user/createUser",
  (name: string, thunkApi) => {
    const internalV4 = (thunkApi.getState() as ReduxState).server.internalV4;
    if (!internalV4) throw new Error("internalV4 not found");
    const req = UserCreateRequest.decode({ name });
    if (req.isLeft()) throw new Error(JSON.stringify(req));

    return new UsersApi(`http://${internalV4}:9000`)
      .create(req.unsafeCoerce())
      .promise()
      .then((result) => result.unsafeCoerce())
      .then((user) => {
        thunkApi.dispatch(slice.actions.addSelf(user));
      });
  }
);

export const user = slice.reducer;
