import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "semantic-ui-react";
import { useSocket } from "../../hooks/useSocket";
import { ChatLog } from "../../types/domain/ChatLog";
import { useLoggedInEffect } from "../../hooks/useLoggedInEffect";
import { useReduxState } from "../../hooks/useReduxState";
import { useDispatch } from "react-redux";
import { addLog } from "../../modules/loungeChatLog";
import { LoungePageSendChatWorkflow } from "../../debug/LoungePageSendChatWorkflow";

export const LoungePage: React.FunctionComponent = () => {
  const { self, serverId, serverAddress } = useLoggedInEffect();
  const dispatch = useDispatch();
  const chatLogs = useReduxState((state) => state.loungeChatLog.logs);
  const [chatMessage, setChatMessage] = useState("");
  const { connect, disconnect, emit, subscribe, unsubscribe } = useSocket(
    serverAddress,
    "/lounge"
  );
  useEffect(() => {
    new LoungePageSendChatWorkflow(emit).run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatLogSubscriber = useCallback(
    (chatLog: ChatLog) => {
      dispatch(addLog(chatLog));
    },
    [dispatch]
  );
  useEffect(() => {
    connect();
    subscribe("server/lounge/chatLog", chatLogSubscriber);

    return () => {
      unsubscribe("server/lounge/chatLog", chatLogSubscriber);
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.lounge}>
      <h1>サーバーID: {serverId}</h1>
      {chatLogs.map((log) => (
        <div key={log.timestamp}>
          [{log.user.name}] {log.message}
        </div>
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
