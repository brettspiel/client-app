import React, { useEffect, useState } from "react";
import { TransparentInput } from "../../components/TransparentInput";
import styles from "./styles.module.css";
import { TransparentButton } from "../../components/TransparentButton";
import { ipcRenderer } from "../../ipc";

export type Props = {
  onCancel: () => any;
};

export const HostSetting: React.FunctionComponent<Props> = ({ onCancel }) => {
  const [ip, setIp] = useState<null | { internalV4: string; publicV4: string }>(
    null
  );
  useEffect(() => {
    ipcRenderer.invoke("getIp").then(setIp);
  }, []);

  console.log("@ip", ip);

  return (
    <>
      <label htmlFor="">{JSON.stringify(ip)}</label>
      <TransparentInput
        className={styles.item}
        type="text"
        value={ip?.internalV4 ?? ""}
        readOnly
      />
      <TransparentInput
        className={styles.item}
        type="text"
        value={ip?.publicV4 ?? ""}
        readOnly
      />
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
