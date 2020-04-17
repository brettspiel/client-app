import express from "express";
import cors from "cors";
import { Server } from "http";

const app = express();
app.use(cors());

app.get("/__healthcheck", (_req, res) => {
  res.sendStatus(200);
});

let server: Server | null = null;

export const launch = (port: number, host: string) =>
  new Promise((resolve) => {
    const s = app.listen(port, host, () => {
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
