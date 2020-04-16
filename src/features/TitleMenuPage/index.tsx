import React, { useCallback, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { TransparentButton } from "../../components/TransparentButton";
import when from "when-switch";
import { TransparentInput } from "../../components/TransparentInput";
import { ipcRenderer } from "../../ipc";

export const TitleMenuPage: React.FunctionComponent = () => {
  const [status, setStatus] = useState<null | "host" | "client">(null);
  const handleClickHost = useCallback(async () => {
    setStatus("host");
    const ip = await ipcRenderer.invoke("getIp");
    console.log("@ip", ip);
  }, []);
  const content = useMemo(
    () =>
      when(status)
        .is(null, () => (
          <>
            <TransparentButton className={styles.item} onClick={handleClickHost}>
              サーバーを起動
            </TransparentButton>
            <TransparentButton className={styles.item} onClick={() => setStatus("client")}>
              サーバーに接続
            </TransparentButton>
          </>
        ))
        .is("host", () => (
          <>
            <label htmlFor="">label</label>
            <TransparentInput ref={ref => ref && ref.focus()} className={styles.item} type="text" placeholder="サーバーアドレス"/>
          </>
        ))
        .is("client", () => (
          <>
            <TransparentInput ref={ref => ref && ref.focus()} className={styles.item} type="text" placeholder="サーバーアドレス"/>
            <TransparentButton className={styles.item}>接続</TransparentButton>
          </>
        )),
    [status]
  ).else(null);

  return <div className={styles.container}>
    <div className={styles.box}>
      {content}
      {status != null && (
        <TransparentButton className={styles.item} onClick={() => setStatus(null)}>キャンセル</TransparentButton>
      )}
    </div>
  </div>;
};
