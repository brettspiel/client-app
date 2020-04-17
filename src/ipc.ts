import { IpcRenderer } from "electron";

const { ipcRenderer: ipc } = window.require("electron");
export const ipcRenderer: IpcRenderer = ipc;
