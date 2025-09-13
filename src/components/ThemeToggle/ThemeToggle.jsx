"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Laptop } from "lucide-react";

const THEME_KEY = "theme_preference";
const themes = ["light", "dark", "system"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  const applyTheme = (mode) => {
    if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", mode === "dark");
    }
  };

  useEffect(() => {
    const savedTheme = Cookies.get(THEME_KEY) || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

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

  const renderIcon = () => {
    if (theme === "light") return <Sun className="h-4 w-4" />;
    if (theme === "dark") return <Moon className="h-4 w-4" />;
    return <Laptop className="h-4 w-4" />;
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      {renderIcon()}
      <span className="ml-2 capitalize">{theme}</span>
    </Button>


  );
}