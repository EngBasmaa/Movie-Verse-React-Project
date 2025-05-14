import React, { useContext, useEffect } from "react";
import { Footer, Header } from "../../shared/components";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../features/auth/AuthContext.js";
import Cookies from "js-cookie";

export function SharedLayout() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  
  // Sync authentication state with cookie on component mount
  useEffect(() => {
    const cookieAuth = Cookies.get("isLoggedIn") === "true";
    if (cookieAuth && !isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, setIsAuthenticated]);

  return (
    <>
      {!isAuthenticated && <Header />}
      <Outlet />
      <Footer />
    </>
  );
}
