import React, { useCallback, useState } from "react";
import { useReduxState } from "../../hooks/useReduxState";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { paths } from "../../paths";
import { useDispatch } from "react-redux";
import { createUser } from "../../modules/user";
import { Button, Input } from "semantic-ui-react";

export const Lounge: React.FunctionComponent = () => {
  const serverId = useReduxState((state) => state.server.serverId);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const user = useReduxState((state) => state.user.self);

  const handleClickLogin = useCallback(() => {
    dispatch(createUser(userName));
  }, [dispatch, userName]);

  if (serverId == null) {
    history.push(paths["/"].routingPath);
  }

  return (
    <div className={styles.lounge}>
      <h1>サーバーID: {serverId}</h1>
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
