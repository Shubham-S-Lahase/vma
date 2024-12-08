import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar/>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
