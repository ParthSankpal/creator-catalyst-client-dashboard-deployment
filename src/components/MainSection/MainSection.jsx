"use client";

import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const MainSection = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col  transition-colors duration-300">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Main content */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            collapsed ? "md:ml-20" : "md:ml-64"
          }  bg-white dark:bg-black/10 text-black dark:text-white `}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainSection;
