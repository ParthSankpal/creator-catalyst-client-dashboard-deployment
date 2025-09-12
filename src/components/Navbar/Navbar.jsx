"use client";

import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full shrink-0 items-center gap-10 px-3 bg-transparent">
      <div className="w-10 h-10 rounded-full bg-sky-400/30 backdrop-blur-sm flex items-center justify-center hover:bg-sky-400/40 transition-all">
        <SidebarTrigger />
      </div>

      {/* Title & Right actions */}
      <div className="flex flex-1 items-center justify-between">
        {/* Page Title */}
        <h1 className="text-lg font-semibold"></h1>

        {/* Right section */}
        <div className="flex items-center gap-5">
          <button className="w-10 h-10 rounded-full bg-sky-400/30 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-foreground hover:bg-sky-400/40 transition-all hover:cursor-pointer">
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="https://github.com/shadcn.png"
                alt="user"
                className="h-10 w-10 rounded-full border"
              />
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-10 w-48 bg-background border rounded-md shadow-lg">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    // Add your signout logic here
                    console.log("Signing out...");
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted rounded-md"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
}
