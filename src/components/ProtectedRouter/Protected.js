import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return true;
  } else {
    return false;
  }
};
const Protected = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
