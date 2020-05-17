import express from "express";
import cors from "cors";
import { Server } from "http";
import { User } from "../src/types/User";
import { UserCreateRequest } from "../src/types/UserCreateRequest";
import { EitherAsync } from "purify-ts";
import { v4 as uuidV4 } from "uuid";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/__healthcheck", (_req, res) => {
  res.sendStatus(200);
});

const users: { [id: string]: User } = {};

app.post("/users", (req, res) => {
  EitherAsync<string, User>(async ({ liftEither }) => {
    const body = await liftEither(UserCreateRequest.decode(req.body));
    const user = await liftEither(User.decode({ ...body, id: uuidV4() }));
    users[user.id] = user;
    return user;
  })
    .run()
    .then((result) =>
      result.either(
        (error) => {
          res.status(400).send({ error }).end();
        },
        (user) => {
          res.send(user).end();
        }
      )
    );
});

let server: Server | null = null;

export const launch = (port: number) =>
  new Promise((resolve) => {
    const s = app.listen(port, () => {
      server = s;
      resolve();
    });
  });

export const stopServer = () => {
  server &&
    server.close(() => {
      server = null;
    });
};
