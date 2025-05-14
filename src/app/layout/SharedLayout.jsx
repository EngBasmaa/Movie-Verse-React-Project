import React, { useContext } from "react";
import { Footer, Header } from "../../shared/components";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../features/auth/AuthContext.js";

export function SharedLayout() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {!isAuthenticated && <Header />}

      <Outlet />
      <Footer />
    </>
  );
}
