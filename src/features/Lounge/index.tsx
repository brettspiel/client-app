import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { paths } from "../../paths";
import { Button, Input } from "semantic-ui-react";
import { useSocket } from "../../hooks/useSocket";
import { ChatLog } from "../../types/domain/ChatLog";
import { useLoggedInEffect } from "../../hooks/useLoggedInEffect";
import { useReduxState } from "../../hooks/useReduxState";
import { useDispatch } from "react-redux";
import { addLog } from "../../modules/loungeChatLog";

export const Lounge: React.FunctionComponent = () => {
  const { self, serverId, serverAddress } = useLoggedInEffect();
  const history = useHistory();
  const dispatch = useDispatch();
  const chatLogs = useReduxState((state) => state.loungeChatLog.logs);
  const [chatMessage, setChatMessage] = useState("");
  const {
    isConnected,
    connect,
    disconnect,
    emit,
    subscribe,
    unsubscribe,
  } = useSocket();

  useEffect(() => {
    if (serverAddress && !isConnected) {
      connect(serverAddress);
    }
  }, [connect, disconnect, isConnected, serverAddress]);

  useEffect(() => {
    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatLogSubscriber = useCallback(
    (chatLog: ChatLog) => {
      dispatch(addLog(chatLog));
    },
    [dispatch]
  );
  useEffect(() => {
    if (isConnected) subscribe("server/lounge/chatLog", chatLogSubscriber);

    return () => unsubscribe("server/lounge/chatLog", chatLogSubscriber);
  }, [chatLogSubscriber, isConnected, subscribe, unsubscribe]);

  if (serverId == null) {
    history.push(paths["/"].routingPath);
  }

  return (
    <div className={styles.lounge}>
      <h1>サーバーID: {serverId}</h1>
      <pre>{JSON.stringify(self)}</pre>
      {chatLogs.map((log) => (
        <div key={log.timestamp}>{log.message}</div>
      ))}
      <Input
        placeholder="チャット"
        value={chatMessage}
        onChange={(event) => setChatMessage(event.target.value)}
      />
      <Button
        onClick={() => {
          if (self) {
            emit("client/lounge/chatSend", {
              user: self,
              message: chatMessage,
            });
            setChatMessage("");
          }
        }}
      >
        送信
      </Button>
    </div>
  );
};
