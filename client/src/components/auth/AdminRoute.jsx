
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminRoute = () => {

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;
  }


  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default AdminRoute;