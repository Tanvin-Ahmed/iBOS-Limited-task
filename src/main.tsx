import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/router.tsx";
import AuthContextProvider from "./context/auth-context.tsx";
import StoreContextProvider from "./context/store-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <StoreContextProvider>
        <Router />
      </StoreContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
