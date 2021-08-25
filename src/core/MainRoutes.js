import Auth from "../pages/Auth/Auth";
import Landing from "../pages/Landing/Landing";
import Main from "../pages/Main/Main";

const routes = [
  {
    path: "/",
    exact: true,
    component: Landing,
  },
  {
    path: "/auth",
    // exact: true,
    component: Auth,
  },
  {
    path: "/main",
    // exact: true,
    component: Main,
  },
];

export default routes;
