import React from "react";
import jwt_decode from "jwt-decode";
import { Route, Navigate, Routes } from "react-router-dom";
import Cookies from "js-cookie";

const GuardedRoute = ({
  path,
  element: Element,
  protected: isProtected,
  ...props
}) => {
 /*  const loginTime = Cookies.get("loginTime");
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();

  if (currentTime - loginTime >= twentyFourHours) {
    Cookies.remove("username");
    Cookies.remove("jwt");
    Cookies.remove("loginTime");
  }

  const jwt = Cookies.get("jwt");
  const user = Cookies.get("username");

  if (jwt) {
    const decodedToken = jwt_decode(jwt);
    const jwtUser = decodedToken.sub;

    if (user == jwtUser) {
      return (
        // Si el usuario está autenticado, redirige a la ruta especificada
        <Routes>
          <Route path="/" element={Element} />
        </Routes>
      );
    } else {
      window.alert("Error Autenticación");
      return <Navigate to="/adminLogin" replace />;
    }
  } else {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    window.alert("Debes loguearte para acceder a este link");
    return <Navigate to="/adminLogin" replace />;
  } */
};

export default GuardedRoute;
