import { useContext } from "react";
import { Footer, Header } from "../../shared/components";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../features/auth/AuthContext.js";

export function SharedLayout() {
  const { isHeader } = useContext(AuthContext);
  return (
    <>
      {!isHeader && <Header />}
      <Outlet />
      <Footer />
    </>
  );
}
