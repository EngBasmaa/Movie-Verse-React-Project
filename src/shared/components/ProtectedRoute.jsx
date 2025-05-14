import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../features/auth/AuthContext.js";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  // Check both context state and cookie
  const isLoggedIn = isAuthenticated || Cookies.get("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
