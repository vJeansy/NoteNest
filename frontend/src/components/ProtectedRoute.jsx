import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("token"); // ✅ Check if the user is authenticated
  return token ? <Outlet /> : <Navigate to="/login" replace />; // ✅ Redirect to the login page if not authenticated
}
export default ProtectedRoute;