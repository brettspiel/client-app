import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { paths } from "../../paths";
import { TitleMenuPage } from "../TitleMenuPage";
import { Lounge } from "../Lounge";
import { Provider } from "react-redux";
import { store } from "../../store";
import styles from "./styles.module.css";
import { SocketProvider } from "../../hooks/useSocket";
import { LoginPage } from "../LoginPage";

export const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <SocketProvider>
      <HashRouter>
        <div className={styles.app}>
          <Switch>
            <Route
              path={paths["/"].routingPath}
              component={TitleMenuPage}
              exact
            />
            <Route
              path={paths["/login"].routingPath}
              component={LoginPage}
              exact
            />
            <Route
              path={paths["/lounge"].routingPath}
              component={Lounge}
              exact
            />
          </Switch>
        </div>
      </HashRouter>
    </SocketProvider>
  </Provider>
);
