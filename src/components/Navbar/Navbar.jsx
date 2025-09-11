"use client"

import { Bell, ChevronDown } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import ThemeToggle from "../ThemeToggle/ThemeToggle"

export default function Navbar() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b px-4 bg-background">
      {/* Sidebar toggle button */}
      <SidebarTrigger />

      {/* Title & Right actions */}
      <div className="flex flex-1 items-center justify-between">
        {/* Page Title */}
        <h1 className="text-lg font-semibold">Dashboard</h1>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button className="p-2 rounded-md text-gray-500 hover:text-foreground">
            <Bell className="h-5 w-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://github.com/shadcn.png"
              alt="user"
              className="h-8 w-8 rounded-full border"
            />
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  )
}
