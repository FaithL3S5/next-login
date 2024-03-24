"use client";

import { useEffect, useState } from "react";

// Component for toggling dark mode
const DarkModeToggleButton: React.FC = () => {
  // State variable to track dark mode status
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Retrieve user's theme preference from local storage
  let userTheme =
    typeof window !== "undefined" && window.localStorage.getItem("theme");

  // Check system's preferred color scheme
  let systemTheme =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Function to check and set the initial theme
  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      // Apply dark mode styles
      document.documentElement.classList.add("dark");
      setDarkMode(true);
      return;
    }
    setDarkMode(false);
  };

  // Function to toggle between light and dark mode
  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      // Switch to light mode
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
      return;
    }
    // Switch to dark mode
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    setDarkMode(true);
  };

  // Run theme check on component mount
  useEffect(() => {
    themeCheck();
  }, []);

  // Render toggle switch
  return (
    <label className="inline-flex items-center cursor-pointer">
      <span className="me-3 text-sm font-medium text-blue-500 dark:text-black">
        Blue
      </span>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onClick={themeSwitch}
        defaultChecked={!darkMode}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-orange-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-black dark:text-orange-500">
        Orange
      </span>
    </label>
  );
};

export default DarkModeToggleButton;
