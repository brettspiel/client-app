import { User } from "../types/User";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersApi } from "../api/UsersApi";
import { UserCreateRequest } from "../types/UserCreateRequest";
import { ReduxState } from "../store";
import { getServerAddress } from "../utils/serverAddress";
import { EventsApi } from "../api/EventsApi";

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
    const serverId = (thunkApi.getState() as ReduxState).server.serverId;
    if (!serverId) throw new Error("serverId not found");
    const req = UserCreateRequest.decode({ name });
    if (req.isLeft()) throw new Error(JSON.stringify(req));
    const serverAddress = getServerAddress(serverId);

    return new UsersApi(serverAddress)
      .create(req.unsafeCoerce())
      .promise()
      .then((result) => result.unsafeCoerce())
      .then((user) => {
        thunkApi.dispatch(slice.actions.addSelf(user));
      });
  }
);

export const user = slice.reducer;
