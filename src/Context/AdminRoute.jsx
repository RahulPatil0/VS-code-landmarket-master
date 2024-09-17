import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AdminDashboard from "../Component/Admin/AdminDashboard";
import { useAuth } from "./Auth";

export default function AdminPrivateRoute() {
  
  const [auth, updateAuth] = useAuth();

  return auth?.role && auth.role.includes("admin") ? <AdminDashboard /> : <Navigate to="/unauthorized" />;
}