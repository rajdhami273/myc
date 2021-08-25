import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Router({ routes }) {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((item, index) => {
          const { path, component, exact } = item;
          return (
            <Route
              path={path}
              component={component}
              key={index}
              exact={exact}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}
