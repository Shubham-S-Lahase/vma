import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./AuthForm.css";

const AuthForm = ({ isLogin, setIsLogin, toggleModal }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isLogin ? {} : { name: "" }),
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(endpoint, formData);

      if (isLogin) {
        login(response.data.token); 
        toggleModal(); 
      } else {
        alert("Registration successful! Please log in.");
        setIsLogin(true); 
      }
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </>
  );
};

export default AuthForm;