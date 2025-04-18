import React, { useEffect, useState } from "react";
import { GoSun, GoMoon } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const navigate = useNavigate();

  // Apply dark mode to the <html> element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left - Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 cursor-pointer tracking-tight hover:opacity-90 transition-opacity duration-200"
        >
          PRODUCT STORE 🛒
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/create")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-100"
          >
            + Create
          </button>

          <button
            onClick={handleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white rounded-lg transition-colors duration-200"
            aria-label="Toggle Theme"
          >
            {darkMode ? <GoSun className="text-xl" /> : <GoMoon className="text-xl" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;