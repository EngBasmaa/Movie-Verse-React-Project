import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../features/auth/AuthContext.js";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  const isLoggedIn =
    isAuthenticated || localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
