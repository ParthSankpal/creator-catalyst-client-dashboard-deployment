"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/src/api/authApi";
import { generateFirebaseMessageToken } from "@/src/utils/firebaseMessaging";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  console.log(user, "user>>>>>>>>>>>>>>>>>>>>>");
  
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Run FCM setup once when navbar mounts
  useEffect(() => {
    generateFirebaseMessageToken();
  }, []);

  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "Dashboard";
    return capitalize(parts[0]);
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b px-4 bg-background">
      {/* Sidebar toggle button */}
      <SidebarTrigger />

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
                  src={ user ? user?.avatar : "https://github.com/shadcn.png"}
                  alt="https://github.com/shadcn.png"
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
