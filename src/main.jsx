import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Mainlayout from "./layout/Mainlayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Mainlayout />
  </StrictMode>
);
