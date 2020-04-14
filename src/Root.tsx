import React from "react";
import { Link } from "react-router-dom";
import { paths } from "./paths";

export const Root: React.FunctionComponent = () => (
  <div>
    <h1>Root</h1>

    <Link to={paths["/cra"].routingPath}>CRA</Link>
  </div>
);
