import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./Auth.css";
import Login from "./Login/Login";
import Register from "./Register/Register";

export default function Auth(props) {
  const { url } = useRouteMatch();
  const routes = [
    {
      path: url + "/",
      component: Login,
      exact: true,
    },
    {
      path: url + "/login",
      component: Login,
      // exact: true,
    },
    {
      path: url + "/register",
      component: Register,
      //   exact: true,
    },
  ];
  return (
    <div className="auth-container">
      <div className="left-section"></div>
      <div className="right-section">
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
      </div>
    </div>
  );
}
