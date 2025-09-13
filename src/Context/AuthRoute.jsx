import { Navigate } from "react-router-dom";
import { useApp } from "./useApp";

const AuthRoute = ({ children, requireAuth = false, restricted = false, requireRole = null }) => {
  const { user } = useApp();

  // Route requires login but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/Login" replace />;
  }

  // Restricted route (like Login/Register) but user is already logged in
  if (restricted && user) {
    return <Navigate to={user.role === "admin" ? "/Dashboard" : "/"} replace />;
  }

  // Route requires a specific role
  if (requireRole && user?.role !== requireRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
