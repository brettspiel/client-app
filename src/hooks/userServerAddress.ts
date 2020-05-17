import { useReduxState } from "./useReduxState";
import { getServerAddress } from "../utils/serverAddress";

export const useServerAddress = (serverId?: string) => {
  const serverIdState = useReduxState((state) => state.server.serverId);
  const id = serverId || serverIdState;
  return id == null ? undefined : getServerAddress(id);
};
