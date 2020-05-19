import express from "express";
import cors from "cors";
import httpServer, { Server } from "http";
import socketIo from "socket.io";
import { SocketEventService } from "./SocketEventService";
import { healthcheckRoute } from "./controllers/healthcheck";
import { usersRoute } from "./controllers/users";
import { ChatLog } from "../src/types/domain/ChatLog";
import { loungeChatStore } from "./stores/ChatStore";

const app = express();
const http = httpServer.createServer(app);
const io = socketIo(http);
app.use(express.json());
app.use(cors());

app.use(healthcheckRoute);
app.use(usersRoute);

io.on("connection", (socket) => {
  const ses = new SocketEventService(socket);
  ses.subscribe("client/lounge/chatSend", (value) => {
    const log = loungeChatStore.insert(value.user, value.message);

    ses.emit("server/lounge/chatLog", log, true);
  });
});

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
