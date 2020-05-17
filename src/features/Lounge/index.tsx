import React from "react";
import { useReduxState } from "../../hooks/useReduxState";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { paths } from "../../paths";

export const Lounge: React.FunctionComponent = () => {
  const internalV4 = useReduxState((state) => state.server.internalV4);
  const publicV4 = useReduxState((state) => state.server.publicV4);
  const history = useHistory();
  if (!internalV4 || !publicV4) {
    history.push(paths["/"].routingPath);
  }

  return (
    <div className={styles.lounge}>
      <h1>ラウンジ</h1>
      <div>{internalV4}</div>
      <div>{publicV4}</div>
    </div>
  );
};
