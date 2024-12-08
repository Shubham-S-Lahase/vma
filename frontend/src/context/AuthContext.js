import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser  = JSON.parse(localStorage.getItem("user"));
    if (savedUser ) {
      setUser (savedUser );
    }
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token); // Decode the token to get user info
    const userData = { id: decoded.id, name: decoded.name }; // Assuming the name is included in the token payload
    setUser (userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/home");
  };

  const logout = () => {
    setUser (null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
