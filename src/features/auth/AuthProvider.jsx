// src/features/auth/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize state from localStorage directly
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = ({ email, password }) => {
    // Fixed admin credentials
    if (email === "admin@movie.com" && password === "admin@12345") {
      localStorage.setItem("isLoggedIn", "true");
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
