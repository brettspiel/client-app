import express, { Response } from "express";
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

const users: {
  [id: string]: {
    user: User;
    res?: Response;
  };
} = {};

const chatLogs: string[] = [];

app.post("/users", (req, res) => {
  EitherAsync<string, User>(async ({ liftEither }) => {
    const body = await liftEither(UserCreateRequest.decode(req.body));
    const user = await liftEither(User.decode({ ...body, id: uuidV4() }));
    users[user.id] = { user };
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
          Object.values(users).forEach(({ res }) => {
            if (res) {
              res.write(`data: ${{ type: "user", user }}\n\n`);
            }
          });
        }
      )
    );
});

app.post("/chat", (req, res) => {
  const text: string = req.body.text;
  chatLogs.push(text);
  Object.values(users).forEach(({ res }) => {
    res && res.write(`data: ${JSON.stringify({ type: "chat", text })}\n\n`);
  });
  res.sendStatus(200).end();
});

app.get("/events/:userId", (req, res) => {
  const userId = req.params.userId;
  req.socket.setTimeout(2147483647);
  res.writeHead(200, {
    // text/event-stream を追加
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write("\n");
  users[userId].res = res;
  req.on("close", () => {
    delete users[userId].res;
  });
});

let server: Server | null = null;

export const launch = (port: number) =>
  new Promise((resolve) => {
    const s = app.listen(port, () => {
      server = s;
      resolve();
    });
  });

export const stopServer = () =>
  new Promise((resolve) => {
    server
      ? server.close(() => {
          server = null;
          resolve();
        })
      : resolve();
  });
