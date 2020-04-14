import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { paths } from "./paths";
import { Root } from "./Root";
import { CreateReactApp } from "./CreateReactApp";

export const App: React.FunctionComponent = () => (
  <HashRouter>
    <Switch>
      <Route
        path={paths["/"].routingPath}
        component={Root}
        exact
      />
      <Route
        path={paths["/cra"].routingPath}
        component={CreateReactApp}
        exact
      />
    </Switch>
  </HashRouter>
);
