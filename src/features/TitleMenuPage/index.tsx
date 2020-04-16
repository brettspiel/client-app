import React from "react";
import styles from "./styles.module.css";
import { TransparentButton } from "../../components/TransparentButton";

export const TitleMenuPage: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <TransparentButton className={styles.button}>サーバーを起動</TransparentButton>
      <TransparentButton className={styles.button}>サーバーに接続</TransparentButton>
    </div>
  );
};
