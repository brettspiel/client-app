import React, { useCallback, useEffect, useRef, useState } from "react";
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

export const Lounge: React.FunctionComponent = () => {
  const serverId = useReduxState((state) => state.server.serverId);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const user = useReduxState((state) => state.user.self);
  const { serverAddress } = useServerConnection();
  const [users, setUsers] = useState<User[]>([]);
  const events = useRef<EventsApi>();

  useEffect(() => {
    if (user && !users.find((u) => u.id === user.id)) {
      setUsers(users.concat([user]));
    }
  }, [user, users]);

  useEffect(() => {
    if (serverAddress) {
      events.current = new EventsApi(serverAddress);
    }
  }, [serverAddress]);

  useEffect(() => {
    if (events.current && !events.current.isConnecting()) {
      if (user) {
        events.current.connect(user.id, (event) => {
          setUsers(users.concat([JSON.parse(event.data)]));
        });
      } else {
        events.current.disconnect();
      }
    }
  }, [user, users]);

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
