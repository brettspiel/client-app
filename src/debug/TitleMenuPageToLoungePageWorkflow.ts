import { ipcRenderer } from "../ipc";
import { store } from "../store";
import { registerId } from "../modules/server";
import { createUser } from "../modules/user";
import { useHistory } from "react-router-dom";
import { paths } from "../paths";
import { DEBUG_MODE } from "../constants";

export class TitleMenuPageToLoungePageWorkflow {
  constructor(private history: ReturnType<typeof useHistory>) {}
  private dispatch = store.dispatch;

  run = async () => {
    if (!DEBUG_MODE) return;
    const serverId: string = await ipcRenderer.invoke("launchServer");

    await this.dispatch(registerId(serverId));
    await this.dispatch(createUser("BotUser"));
    this.history.push(paths["/lounge"].routingPath);
  };
}
