"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const THEME_KEY = "theme_preference"; // cookie key
const themes = ["light", "dark", "system"]; // cycle order

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  // Apply theme to document
  const applyTheme = (mode) => {
    if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  };

  useEffect(() => {
    // Load theme from cookie
    const savedTheme = Cookies.get(THEME_KEY) || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen to system changes if theme is 'system'
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (Cookies.get(THEME_KEY) === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    Cookies.set(THEME_KEY, nextTheme, { expires: 365 });
    applyTheme(nextTheme);
  };

  const getButtonLabel = () => {
    if (theme === "light") return "☀️ Light";
    if (theme === "dark") return "🌙 Dark";
    return "💻 System"; 
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md border bg-background text-foreground hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {getButtonLabel()}
    </button>
  );
}
