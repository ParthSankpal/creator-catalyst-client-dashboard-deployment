"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/src/api/authApi";

// 🔔 Notifications Dropdown
function NotificationsDropdown() {
  const [showAll, setShowAll] = useState(false);

  const notifications = [
    "🔔 Your profile was viewed",
    "💬 New comment on your post",
    "⬆️ Update available for your project",
    "📩 You have a new message",
    "⏳ Your subscription will expire soon",
    "🛠️ Server maintenance scheduled",
    "👥 Team member joined your workspace",
    "✅ Password changed successfully",
    "📅 Reminder: Meeting at 4 PM",
    "🤝 Invitation to collaborate on project",
  ];

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) setShowAll(false); // reset when dropdown closes
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md text-gray-500 hover:text-foreground focus:outline-none focus:ring-0 hover:cursor-pointer">
          <Bell className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={`w-80 transition-all ${
          showAll ? "max-h-96" : "max-h-64"
        } overflow-y-auto p-2`}
      >
        <div className="space-y-2">
          {(showAll ? notifications : notifications.slice(0, 3)).map(
            (notif, i) => (
              <DropdownMenuItem
                key={i}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {notif}
              </DropdownMenuItem>
            )
          )}
        </div>

        {!showAll && (
          <>
            <DropdownMenuSeparator />
            <div
              onClick={() => setShowAll(true)}
              onMouseDown={(e) => e.preventDefault()} // prevent close
              className="px-2 py-1.5 text-center text-sm text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              View all notifications
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract top-level path name
  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "Dashboard";
    return capitalize(parts[0]); // only parent
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // redirect after logout
  };

  return (
    <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b px-4 bg-background">
      {/* Sidebar toggle button */}
      <SidebarTrigger />

      {/* Title & Right actions */}
      <div className="flex flex-1 items-center justify-between">
        {/* Page Title */}
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* 🔔 Notifications */}
          <NotificationsDropdown />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src="https://github.com/shadcn.png"
                  alt="user"
                  className="h-8 w-8 rounded-full border"
                />
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
