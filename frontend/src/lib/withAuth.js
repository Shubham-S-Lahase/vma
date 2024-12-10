import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);
    
    if (loading) {
      return <div>Loading...</div>; 
    }

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} user={user} token={user?.token} />;
  };
};

export default withAuth;
