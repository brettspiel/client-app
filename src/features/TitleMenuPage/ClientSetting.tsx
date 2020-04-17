import React, { useCallback, useState } from "react";
import { TransparentInput } from "../../components/TransparentInput";
import styles from "./styles.module.css";
import { TransparentButton } from "../../components/TransparentButton";
import { ipcRenderer } from "../../ipc";

export type Props = {
  onCancel: () => any;
};

export const ClientSetting: React.FunctionComponent<Props> = ({ onCancel }) => {
  const [serverAddress, setServerAddress] = useState("");
  const handleClickClient = useCallback(async () => {
    fetch(`http://localhost:9000/__healthcheck`).then(console.log);
  }, []);

  return (
    <>
      <TransparentInput
        ref={(ref) => ref && ref.focus()}
        className={styles.item}
        type="text"
        placeholder="サーバーアドレス"
        value={serverAddress}
        onChange={(event) => setServerAddress(event.target.value)}
      />
      <TransparentButton className={styles.item} onClick={handleClickClient}>
        接続
      </TransparentButton>
      <TransparentButton
        className={styles.item}
        onClick={() => {
          ipcRenderer.invoke("stopServer");
          onCancel();
        }}
      >
        キャンセル
      </TransparentButton>
    </>
  );
};
