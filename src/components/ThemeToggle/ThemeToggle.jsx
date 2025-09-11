"use client";

import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    // Always apply light theme
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <button
      className="px-3 py-2 rounded-md border bg-background text-foreground hover:bg-gray-200 transition"
      disabled
    >
      ☀️ Light
    </button>
  );
}
