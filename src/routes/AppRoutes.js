import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/login/Login";
import GuardedRoute from "./GuardedRoute";
import CreateTournament from "../pages/createTournament/CreateTournament";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  {
    path: "/createTournament",
    element: (
      <GuardedRoute
        path="/createTournament"
        element={<CreateTournament />}
        protected={true}
      />
    ),
  },
  { path: "*", element: <NotFound /> },
];

const AppRoutes = () => (
  <Routes>
    {routes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}
  </Routes>
);

export default AppRoutes;
