import React, { useCallback, useState } from "react";
import { ipcRenderer } from "../../ipc";
import { Button, Input } from "semantic-ui-react";
import { useServerAddress } from "../../hooks/userServerAddress";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerId } from "../../modules/server";
import { paths } from "../../paths";

export type Props = {
  onCancel: () => any;
};

export const ClientSetting: React.FunctionComponent<Props> = ({ onCancel }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [serverId, setServerId] = useState("");
  const serverAddress = useServerAddress(serverId);
  const handleClickClient = useCallback(async () => {
    fetch(`${serverAddress}/__healthcheck`).then((res) => {
      if (res.status === 200) {
        dispatch(registerId(serverId));
        history.push(paths["/lounge"].routingPath);
      }
    });
  }, [dispatch, history, serverAddress, serverId]);

  return (
    <>
      <Input
        ref={(ref) => ref && ref.focus()}
        type="text"
        placeholder="サーバーID"
        value={serverId}
        onChange={(event) => setServerId(event.target.value)}
      />
      <Button onClick={handleClickClient}>接続</Button>
      <Button
        onClick={() => {
          ipcRenderer.invoke("stopServer");
          onCancel();
        }}
      >
        キャンセル
      </Button>
    </>
  );
};
