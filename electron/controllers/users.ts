import { Response, Router } from "express";
import { EitherAsync } from "purify-ts";
import { User } from "../../src/types/User";
import { UserCreateRequest } from "../../src/types/UserCreateRequest";
import { v4 as uuidV4 } from "uuid";

export const usersRoute = Router();

const users: {
  [id: string]: {
    user: User;
    secretToken: string;
  };
} = {};

usersRoute.post<any, any, any, any>("/users", (req, res) => {
  EitherAsync<string, User>(async ({ liftEither }) => {
    const body = await liftEither(UserCreateRequest.decode(req.body));
    return liftEither(User.decode({ ...body, id: uuidV4() }));
  })
    .run()
    .then((result) =>
      result.either(
        (error) => {
          res.status(400).send({ error }).end();
        },
        (user) => {
          res.send(user);
        }
      )
    );
});
