import express from "express";
import cors from "cors";
import httpServer, { Server } from "http";
import socketIo from "socket.io";
import { TypedSocketEvent } from "./TypedSocketEvent";
import { healthcheckRoute } from "./controllers/healthcheck";
import { usersRoute } from "./controllers/users";
import { loungeSocket } from "./controllers/loungeSocket";

const app = express();
const http = httpServer.createServer(app);
const io = socketIo(http);

app.use(express.json());
app.use(cors());

app.use(healthcheckRoute);
app.use(usersRoute);

io.of("/lounge").on("connection", (socket) =>
  loungeSocket(new TypedSocketEvent(socket))
);

let server: Server | null = null;

export const launch = (port: number) =>
  new Promise((resolve) => {
    const s = http.listen(port, () => {
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
