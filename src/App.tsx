import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { paths } from "./paths";
import { RootMenuPage } from "./features/RootMenuPage";

export const App: React.FunctionComponent = () => (
  <HashRouter>
    <Switch>
      <Route
        path={paths["/"].routingPath}
        component={RootMenuPage}
        exact
      />
    </Switch>
  </HashRouter>
);
