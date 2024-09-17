import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import UserDashboard from "../components/User/UserDashboard";
import { useAuth } from "./Auth";

const PrivateRoute = () => {
  
  const [auth] = useAuth(); // Get authentication status from context

  return auth ? (
    <UserDashboard/>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;