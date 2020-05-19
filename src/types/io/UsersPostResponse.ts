import { Codec, GetInterface } from "purify-ts";
import { User } from "../domain/User";
import { NonEmptyString } from "../utils/codec";

export type UsersPostResponse = GetInterface<typeof UsersPostResponse>;
export const UsersPostResponse = Codec.interface({
  user: User,
  secretToken: NonEmptyString,
});
