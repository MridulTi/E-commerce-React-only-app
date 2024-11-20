import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
function MainLayout() {
  return (
    <div>
      <Sidebar/>
      <div className="min-h-[100vh] bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
