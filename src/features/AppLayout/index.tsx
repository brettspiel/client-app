import React from "react";
import styles from "./styles.module.css";

export const AppLayout: React.FunctionComponent = ({ children }) => (
  <div className={styles.app}>{children}</div>
)
