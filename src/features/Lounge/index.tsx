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
  const internalV4 = useReduxState((state) => state.server.internalV4);
  const publicV4 = useReduxState((state) => state.server.publicV4);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const user = useReduxState((state) => state.user.self);

  const handleClickLogin = useCallback(() => {
    dispatch(createUser(userName));
  }, [dispatch, userName]);

  if (!internalV4 || !publicV4) {
    history.push(paths["/"].routingPath);
  }

  return (
    <div className={styles.lounge}>
      <h1>ラウンジ</h1>
      <div>{internalV4}</div>
      <div>{publicV4}</div>
      <div>{JSON.stringify(user)}</div>

      <TransparentInput
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <TransparentButton onClick={handleClickLogin}>ログイン</TransparentButton>
    </div>
  );
};
