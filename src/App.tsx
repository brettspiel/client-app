import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { paths } from "./paths";
import { TitleMenuPage } from "./features/TitleMenuPage";
import { AppLayout } from "./features/AppLayout";
import { Lounge } from "./features/Lounge";

export const App: React.FunctionComponent = () => (
  <React.StrictMode>
    <HashRouter>
      <AppLayout>
        <Switch>
          <Route
            path={paths["/"].routingPath}
            component={TitleMenuPage}
            exact
          />
          <Route path={paths["/lounge"].routingPath} component={Lounge} exact />
        </Switch>
      </AppLayout>
    </HashRouter>
  </React.StrictMode>
);
