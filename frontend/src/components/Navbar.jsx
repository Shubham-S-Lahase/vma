import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import AuthForm from "./AuthForm";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between relative">
      <div className="text-xl font-bold">MyApp</div>

      {/* Hamburger Menu */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
          <div className="text-lg font-semibold">Menu</div>
          <FaTimes
            size={24}
            className="cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div className="flex flex-col mt-4">
          {isAuthenticated ? (
            <>
              <a
                href="/home"
                className="px-4 py-3 hover:bg-gray-700 transition-all border-b border-gray-700"
              >
                Home
              </a>
              <a
                href="/my-videos"
                className="px-4 py-3 hover:bg-gray-700 transition-all border-b border-gray-700"
              >
                My Videos
              </a>
              <span className="px-4 py-3">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-3 text-left text-red-500 hover:bg-gray-700 transition-all border-b border-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={toggleModal}
              className="px-4 py-3 text-left text-blue-400 hover:bg-gray-700 transition-all border-b border-gray-700"
            >
              Login / Register
            </button>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            <a href="/home" className="hover:text-gray-400">
              Home
            </a>
            <a href="/my-videos" className="hover:text-gray-400">
              My Videos
            </a>
            <span>Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Login / Register
          </button>
        )}
      </div>

      {/* Modal */}
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
