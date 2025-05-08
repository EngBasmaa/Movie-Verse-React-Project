import { createRoot } from "react-dom/client";
import MainLayout from "./app/layout/MainLayout";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MainLayout />
  </Provider>
);
