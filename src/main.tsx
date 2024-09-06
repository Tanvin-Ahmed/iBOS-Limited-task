import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/router.tsx";
import AuthContextProvider from "./context/auth-context.tsx";
import StoreContextProvider from "./context/store-context.tsx";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <StoreContextProvider>
        <Toaster />
        <Router />
      </StoreContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
