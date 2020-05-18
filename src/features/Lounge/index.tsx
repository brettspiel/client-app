import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReduxState } from "../../hooks/useReduxState";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { paths } from "../../paths";
import { useDispatch } from "react-redux";
import { createUser } from "../../modules/user";
import { Button, Input } from "semantic-ui-react";
import { EventsApi } from "../../api/EventsApi";
import { useServerConnection } from "../../hooks/useServerConnection";
import { User } from "../../types/User";
import { ChatApi } from "../../api/ChatApi";

export const Lounge: React.FunctionComponent = () => {
  const serverId = useReduxState((state) => state.server.serverId);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const user = useReduxState((state) => state.user.self);
  const { serverAddress } = useServerConnection();
  const [users, setUsers] = useState<User[]>([]);
  const events = useMemo(
    () => (serverAddress != null ? new EventsApi(serverAddress) : undefined),
    [serverAddress]
  );
  const chatApi = useRef<ChatApi>();
  const [chatLogs, setChatLogs] = useState<string[]>([]);
  const [chatText, setChatText] = useState("");

  useEffect(() => {
    if (serverAddress) {
      chatApi.current = new ChatApi(serverAddress);
    }
  }, [serverAddress]);

  useEffect(() => {
    if (user && !users.find((u) => u.id === user.id)) {
      setUsers(users.concat([user]));
    }
  }, [user, users]);

  const handleServerSentEvent = useCallback(
    (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "user") {
        setUsers(users.concat([data.user]));
      }
      if (data.type === "chat") {
        setChatLogs(chatLogs.concat([data.text]));
      }
    },
    [chatLogs, users]
  );

  useEffect(() => {
    if (user) {
      events?.connect(user.id, handleServerSentEvent);
    }

    return () => events?.disconnect();
  }, [events, handleServerSentEvent, user]);

  const handleClickLogin = useCallback(async () => {
    dispatch(createUser(userName));
  }, [dispatch, userName]);

  if (serverId == null) {
    history.push(paths["/"].routingPath);
  }

  return (
    <div className={styles.lounge}>
      <h1>サーバーID: {serverId}</h1>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      {chatLogs.map((log) => (
        <div key={Math.random()}>{log}</div>
      ))}
      <Input
        placeholder="チャット"
        value={chatText}
        onChange={(event) => setChatText(event.target.value)}
      />
      <Button
        onClick={() => {
          chatApi.current && chatApi.current.send(chatText);
          setChatText("");
        }}
      >
        送信
      </Button>
      {!user && (
        <div>
          <Input
            placeholder="ユーザー名"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
          <Button onClick={handleClickLogin}>サーバーにログイン</Button>
        </div>
      )}
      {user && (
        <div>
          <div>logged in as {user.name}</div>
        </div>
      )}
    </div>
  );
};
