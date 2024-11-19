import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
function MainLayout() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <div className="min-h-[100vh] bg-gray-100">
        <Outlet />
      </div>
      {/* <Sidebar /> */}
    </div>
  );
}

export default MainLayout;
