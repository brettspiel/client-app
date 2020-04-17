import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { TransparentButton } from "../../components/TransparentButton";
import when from "when-switch";
import { ipcRenderer } from "../../ipc";
import { HostSetting } from "./HostSetting";
import { ClientSetting } from "./ClientSetting";

export const TitleMenuPage: React.FunctionComponent = () => {
  const [status, setStatus] = useState<null | "host" | "client">(null);
  const handleClickHost = useCallback(async () => {
    await ipcRenderer.invoke("launchServer");
    setStatus("host");
  }, []);

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
        .is("host", () => <HostSetting onCancel={() => setStatus(null)} />)
        .is("client", () => <ClientSetting onCancel={() => setStatus(null)} />),
    [handleClickHost, status]
  ).else(null);

  return (
    <div className={styles.container}>
      <div className={styles.box}>{content}</div>
    </div>
  );
};
