import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { paths } from "../../paths";
import { TitleMenuPage } from "../TitleMenuPage";
import { Lounge } from "../Lounge";
import { Provider } from "react-redux";
import { store } from "../../store";
import styles from "./styles.module.css";

export const App: React.FunctionComponent = () => (
  <Provider store={store}>
    <HashRouter>
      <div className={styles.app}>
        <Switch>
          <Route
            path={paths["/"].routingPath}
            component={TitleMenuPage}
            exact
          />
          <Route path={paths["/lounge"].routingPath} component={Lounge} exact />
        </Switch>
      </div>
    </HashRouter>
  </Provider>
);
