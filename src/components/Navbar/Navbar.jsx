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
import { useEffect } from 'react'

import { onMessage } from 'firebase/messaging';
import { generateFirebaseMessageToken } from "@/src/utils/firebaseMessaging";
import { messaging } from "@/src/utils/firebase.config";


// 🔔 Notifications Dropdown
function NotificationsDropdown() {
  const [showAll, setShowAll] = useState(false);
  const [notifications, setNotifications] = useState([]);

  //   useEffect(() => {
  //   generateFirebaseMessageToken();

  //   const unsubscribe = onMessage(messaging, (payload) => {
  //     console.log("📩 FCM Payload:", payload);

  //     const title = payload?.notification?.title || "Notification";
  //     const body = payload?.notification?.body || "";
  //     const data = payload?.data || {};

  //     // Build display message
  //     const notifText = body
  //       ? `${title} — ${body}`
  //       : title;

  //     // Optionally append custom data
  //     const fullNotif = Object.keys(data).length
  //       ? `${notifText}\n${JSON.stringify(data)}`
  //       : notifText;

  //     setNotifications((prev) => [fullNotif, ...prev]);
  //   });

  //   return () => unsubscribe();
  // }, []);



  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ prevent SSR issues

    const initFCM = async () => {
      const token = await generateFirebaseMessageToken();
      console.log("FCM Device Token:", token);
    };

    initFCM();

    // ✅ Setup listener for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("📩 FCM Payload:", payload);

      const title = payload?.notification?.title || "Notification";
      const body = payload?.notification?.body || "";
      const data = payload?.data || {};

      const notifText = body ? `${title} — ${body}` : title;

      const fullNotif =
        Object.keys(data).length > 0
          ? `${notifText}\n${JSON.stringify(data)}`
          : notifText;

      setNotifications((prev) => [fullNotif, ...prev]);
    });

    // ✅ Cleanup
    return () => {
      unsubscribe();
    };
  }, []);

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
        className={`w-80 transition-all ${showAll ? "max-h-96" : "max-h-64"
          } overflow-y-auto p-2`}
      >
        {notifications.length === 0 ? (
          <div className="text-sm text-muted-foreground p-2 text-center">
            No notifications yet
          </div>
        ) : (
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
        )}

        {notifications.length > 3 && !showAll && (
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
