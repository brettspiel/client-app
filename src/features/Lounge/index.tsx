import React, { useCallback, useState } from "react";
import { useReduxState } from "../../hooks/useReduxState";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { paths } from "../../paths";
import { TransparentInput } from "../../components/TransparentInput";
import { TransparentButton } from "../../components/TransparentButton";
import { useDispatch } from "react-redux";
import { createUser } from "../../modules/user";

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
      <div>{JSON.stringify(user)}</div>

      <TransparentInput
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <TransparentButton onClick={handleClickLogin}>ログイン</TransparentButton>
    </div>
  );
};
