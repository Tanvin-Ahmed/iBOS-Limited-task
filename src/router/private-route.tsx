import { User } from "@/types";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const str = sessionStorage.getItem("user")?.trim();
  let auth;
  if (str) {
    auth = JSON.parse(str) as User;
  }

  return auth?.email ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
