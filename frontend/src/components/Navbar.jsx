import React, { useState } from "react";
import { GoSun, GoMoon } from "react-icons/go";

import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      console.log("dark mode");
    } else {
      console.log("light mode");
    }
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left - Title */}
        <div
          className="text-xl font-bold text-blue-600"
          onClick={() => navigate("/")}
        >
          PRODUCT STORE 🛒
        </div>

        {/* Right - Buttons */}
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/create")}
          >
            Create Page
          </button>

          <button
            onClick={handleDarkMode}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
          >
            {darkMode ? <GoSun /> : <GoMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
