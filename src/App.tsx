import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { paths } from "./paths";
import { TitleMenuPage } from "./features/TitleMenuPage";
import { AppLayout } from "./features/AppLayout";
import { Lounge } from "./features/Lounge";
import { Provider } from "react-redux";
import { store } from "./store";

export const App: React.FunctionComponent = () => (
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <AppLayout>
          <Switch>
            <Route
              path={paths["/"].routingPath}
              component={TitleMenuPage}
              exact
            />
            <Route
              path={paths["/lounge"].routingPath}
              component={Lounge}
              exact
            />
          </Switch>
        </AppLayout>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
