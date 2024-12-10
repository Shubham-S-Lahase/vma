import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser  = JSON.parse(localStorage.getItem("user"));
    if (savedUser ) {
      setUser (savedUser );
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const decoded = jwtDecode(token); // Decode the token to get user info
    console.log('Decoded:', decoded);
    const userData = { id: decoded.id, name: decoded.name, token };
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
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
