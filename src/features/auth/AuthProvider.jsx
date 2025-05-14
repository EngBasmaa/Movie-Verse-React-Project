// src/features/auth/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }) => {
  // Initialize state from cookie directly
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Cookies.get("isLoggedIn") === "true";
  });
  const [isHeader, setIsHeader] = useState(false);
  useEffect(() => {
    const stored = Cookies.get("isLoggedIn");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = ({ email, password }) => {
    // Fixed admin credentials
    if (email === "admin@movie.com" && password === "admin@12345") {
      // Set cookie with expiration (7 days) and path
      Cookies.set("isLoggedIn", "true", { path: "/" });
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    // Remove the cookie
    Cookies.remove("isLoggedIn", { path: "/" });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        isHeader,
        setIsHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
