import React from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "./useApp";

const AuthRoute = ({ children, requireAuth = false, restricted = false }) => {
  const { user,loading } = useApp();

  if(loading){
    return<p>Loading....</p>
  }

  // if not user route needs authentication (like /cart, /orders)
  if (requireAuth && !user) {
    return <Navigate to="/Login" replace />;
  }

  // if user route is restricted (like /login, /register)
  if (restricted && user) {
    return <Navigate to="/" replace />;
  }

  //  allowed
  return children;
};

export default AuthRoute;

