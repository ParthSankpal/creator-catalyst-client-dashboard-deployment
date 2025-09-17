"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/src/utils/firebase.config";
import { addNotification, clearNotifications, markAllRead } from "@/src/store/slices/notificationsSlice";

export default function NotificationsDropdown() {
  const dispatch = useDispatch();
  const { list, unreadCount } = useSelector((state) => state.notifications);
  const [showAll, setShowAll] = useState(false);

  // 🔔 Listen for FCM foreground messages
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const notif = {
        id: Date.now(),
        title: payload.notification?.title || "Notification",
        body: payload.notification?.body || "",
        data: payload.data || {},
      };
      dispatch(addNotification(notif));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) dispatch(markAllRead()); // reset unread count when opened
        if (!open) setShowAll(false);
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-md text-gray-500 hover:text-foreground">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={`w-80 transition-all ${
          showAll ? "max-h-96" : "max-h-64"
        } overflow-y-auto p-2`}
      >
        {list.length === 0 ? (
          <div className="text-sm text-muted-foreground p-2 text-center">
            No notifications yet
          </div>
        ) : (
          <div className="space-y-2">
            {(showAll ? list : list.slice(0, 3)).map((notif) => (
              <DropdownMenuItem
                key={notif.id}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{notif.title}</span>
                  {notif.body && (
                    <span className="text-xs text-gray-500">{notif.body}</span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}

        {list.length > 3 && !showAll && (
          <>
            <DropdownMenuSeparator />
            <div
              onClick={() => setShowAll(true)}
              onMouseDown={(e) => e.preventDefault()} // prevent closing
              className="px-2 py-1.5 text-center text-sm text-muted-foreground cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
            >
              View all notifications
            </div>
          </>
        )}

        {list.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div
              onClick={() => dispatch(clearNotifications())}
              onMouseDown={(e) => e.preventDefault()}
              className="px-2 py-1.5 text-center text-sm text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-700 rounded-md"
            >
              Clear all
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
