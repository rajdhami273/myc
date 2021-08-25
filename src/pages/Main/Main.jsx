import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./Main.css";
import Header from "../../components/Header/Header";
import Home from "./Home/Home";

export default function Main(props) {
  const { url } = useRouteMatch();
  const routes = [
    {
      path: url + "/",
      component: Home,
      exact: true,
    },
    {
      path: url + "/home",
      component: Home,
      // exact: true,
    },
  ];
  return (
    <div className="wrapper">
      <Header />
      <div className="main-container">
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
