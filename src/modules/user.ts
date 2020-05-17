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
    const serverUrl = (thunkApi.getState() as ReduxState).server.url;
    if (!serverUrl) throw new Error("serverUrl not found");
    const req = UserCreateRequest.decode({ name });
    if (req.isLeft()) throw new Error(JSON.stringify(req));

    return new UsersApi(serverUrl)
      .create(req.unsafeCoerce())
      .promise()
      .then((result) => result.unsafeCoerce())
      .then((user) => {
        thunkApi.dispatch(slice.actions.addSelf(user));
      });
  }
);

export const user = slice.reducer;
