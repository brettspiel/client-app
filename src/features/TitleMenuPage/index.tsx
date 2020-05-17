import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { TransparentButton } from "../../components/TransparentButton";
import when from "when-switch";
import { ipcRenderer } from "../../ipc";
import { ClientSetting } from "./ClientSetting";
import { useHistory } from "react-router-dom";
import { paths } from "../../paths";
import { registerUrl } from "../../modules/server";
import { useDispatch } from "react-redux";

export const TitleMenuPage: React.FunctionComponent = () => {
  const history = useHistory();
  const [status, setStatus] = useState<null | "client">(null);
  const dispatch = useDispatch();
  const handleClickHost = useCallback(async () => {
    const serverUrl = await ipcRenderer.invoke("launchServer");
    dispatch(registerUrl(serverUrl));
    history.push(paths["/lounge"].routingPath);
  }, [dispatch, history]);

  const content = useMemo(
    () =>
      when(status)
        .is(null, () => (
          <>
            <TransparentButton
              className={styles.item}
              onClick={handleClickHost}
            >
              サーバーを起動
            </TransparentButton>
            <TransparentButton
              className={styles.item}
              onClick={() => setStatus("client")}
            >
              サーバーに接続
            </TransparentButton>
          </>
        ))
        .is("client", () => <ClientSetting onCancel={() => setStatus(null)} />),
    [handleClickHost, status]
  ).else(null);

  return (
    <div className={styles.container}>
      <div className={styles.box}>{content}</div>
    </div>
  );
};
