import React, { useContext, useState } from "react";
import Modal from "./Modal";
import AuthForm from "./AuthForm";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="logo">MyApp</div>
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? (
          <FaTimes size={20} color="white" /> 
        ) : (
          <FaBars size={20} color="white" /> 
        )}
      </div>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={toggleModal}>Login / Register</button>
        )}
      </div>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <AuthForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
