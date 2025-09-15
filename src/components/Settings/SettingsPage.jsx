"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationsForm from "./NotificationsForm";
import { getUser } from "@/src/api/authApi";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      id="creator-settings"
      className="page-content dark:bg-[#222222] min-h-screen transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
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
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.user_name}
                    </p>
                  </div>

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

                  <div>
                    <p className="text-sm text-gray-500">Channel Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.channel_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Channel Handle</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.channel_handle}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Channel ID</p>
                    <p className="font-mono text-sm text-gray-900 dark:text-white">
                      {user.channel_id}
                    </p>
                  </div>

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

          {/* Notifications */}
          <NotificationsForm />
        </div>
      </div>
    </div>
  );
}
