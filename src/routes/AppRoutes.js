import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/login/Login";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
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
