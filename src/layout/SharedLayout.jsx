import React from "react";

import { Outlet } from "react-router-dom";
import { Footer, Header } from "../shared/components";

export function SharedLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
