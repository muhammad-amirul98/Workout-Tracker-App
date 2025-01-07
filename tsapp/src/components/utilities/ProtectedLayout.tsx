import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout: React.FC = () => {
  const isLoggedIn = !!sessionStorage.getItem("jwt"); // Replace with your actual auth check logic

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
