"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getUser } from "@/src/api/authApi";
import Notification from "@/src/components/Notification/Notification";
import { CreatorSubscribe, CreatorUnsubscribe } from "@/src/api/notificationApi";
import { getCookie } from "@/src/utils/cookieHandler";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const fcmToken = useMemo(() => getCookie("fcm_token"), []);
  console.log(fcmToken, "fcm_token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setNotification({ message: "Failed to fetch user", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();


  }, []);

  const handleToggle = async () => {
    if (!user) return;
    setToggleLoading(true);

    try {
      if (user.is_user_subscribed_to_notifications) {
        // 🔹 unsubscribe
        await CreatorUnsubscribe(fcmToken);
        setUser((prev) => ({
          ...prev,
          is_user_subscribed_to_notifications: false,
        }));
        setNotification({ message: "Notifications disabled", type: "info" });
      } else {
        // 🔹 subscribe
        await CreatorSubscribe(fcmToken);
        setUser((prev) => ({
          ...prev,
          is_user_subscribed_to_notifications: true,
        }));
        setNotification({ message: "Notifications enabled", type: "success" });
      }
    } catch (err) {
      console.error("Error updating subscription:", err);
      const backendMessage =
        err?.response?.data?.message || err?.message || "Update failed";
      setNotification({ message: backendMessage, type: "error" });
    } finally {
      setToggleLoading(false);
    }
  };

  return (
    <div
      id="creator-settings"
      className="page-content dark:bg-[#222222] min-h-screen transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Settings ⚙️
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Manage your profile, preferences, and account settings.
          </p>
        </div>

        <div className="space-y-6">
          {/* User Info */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                  ))}
                </div>
              ) : user ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Avatar */}
                  {user.avatar && (
                    <div className="sm:col-span-2 flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-16 h-16 rounded-full border"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.user_name}
                        </p>
                        <p className="text-sm text-gray-500">{user.user_email}</p>
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.user_name}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {user.user_email}
                      {user.email_verified ? (
                        <Badge className="bg-green-600 hover:bg-green-700">
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-red-600 hover:bg-red-700">
                          Not Verified
                        </Badge>
                      )}
                    </p>
                  </div>

                  {/* Channel Name */}
                  <div>
                    <p className="text-sm text-gray-500">Channel Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.channel_name}
                    </p>
                  </div>

                  {/* Channel Handle */}
                  <div>
                    <p className="text-sm text-gray-500">Channel Handle</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.channel_handle}
                    </p>
                  </div>

                  {/* Channel ID */}
                  <div>
                    <p className="text-sm text-gray-500">Channel ID</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">
                      {user.channel_id}
                    </p>
                  </div>

                  {/* Account Created */}
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(user.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">Failed to load user data.</p>
              )}
            </CardContent>
          </Card>

          {/* Notifications Toggle */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="flex grow flex-col">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Push Notifications
                    </label>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Get notified about new challenges and modules
                    </span>
                  </span>

                  {/* Toggle Switch */}
                  {/* Toggle Switch */}
                  <div
                    className={`group relative inline-flex w-11 shrink-0 rounded-full p-0.5 inset-ring inset-ring-white/10 outline-offset-2 transition-colors duration-200 ease-in-out ${user.is_user_subscribed_to_notifications
                        ? "bg-[#279aff]" // ✅ brand color
                        : "bg-white/5"
                      }`}
                  >
                    <span className="relative size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out transform group-has-checked:translate-x-5">
                      {/* Off Icon */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in ${user.is_user_subscribed_to_notifications
                            ? "opacity-0"
                            : "opacity-100"
                          }`}
                      >
                        <svg
                          fill="none"
                          viewBox="0 0 12 12"
                          className="size-3 text-gray-600"
                        >
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      {/* On Icon */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in ${user.is_user_subscribed_to_notifications
                            ? "opacity-100"
                            : "opacity-0"
                          }`}
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 12 12"
                          className="size-3 text-[#279aff]" // ✅ brand color
                        >
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={user.is_user_subscribed_to_notifications}
                      onChange={handleToggle}
                      disabled={toggleLoading}
                      className="absolute inset-0 appearance-none cursor-pointer focus:outline-hidden"
                    />
                  </div>

                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
