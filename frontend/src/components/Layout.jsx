import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="pt-[60px] flex-grow overflow-y-auto bg-gray-100 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;