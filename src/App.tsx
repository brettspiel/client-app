import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { paths } from "./paths";
import { RootMenuPage } from "./features/RootMenuPage";
import { AppLayout } from "./features/AppLayout";

export const App: React.FunctionComponent = () => (
  <React.StrictMode>
    <HashRouter>
      <AppLayout>
        <Switch>
          <Route
            path={paths["/"].routingPath}
            component={RootMenuPage}
            exact
          />
        </Switch>
      </AppLayout>
    </HashRouter>
  </React.StrictMode>
);
