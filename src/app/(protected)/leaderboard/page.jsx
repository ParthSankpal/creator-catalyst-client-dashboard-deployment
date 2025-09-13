"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LeaderboardCard from "../../../components/Leaderboard/LeaderboardCard/LeaderboardCard";
import { getLeaderboard } from "@/src/api/leaderboardApi";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("city");
  const [leaderboardData, setLeaderboardData] = useState({
    city: [],
    india: [],
    friends: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // 👉 replace with actual logged-in user email from auth
  const loggedInEmail = "thakkar.km@somaiya.edu";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getLeaderboard();
        console.log("Leaderboard API response:", res);

        const apiData = res.data || [];

        // map API response into shape LeaderboardCard expects
        const mapped = apiData.map((item) => ({
          rank: item.rank,
          name: item.channel_name || item.user_name,
          location: "India", // API doesn’t provide
          points: item.total_points,
          trend: "", // placeholder
          highlight: item.user_email === loggedInEmail,
          email: item.user_email, // keep for identifying
        }));

        setLeaderboardData({
          city: mapped,
          india: mapped,
          friends: mapped.filter((u) => u.highlight), // demo logic
        });

        // find current user
        const me = mapped.find((u) => u.email === loggedInEmail);
        setCurrentUser(me || null);
      } catch (error) {
        console.error("Error loading leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Leaderboard 📊
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          See how you rank against other creators in your city and across India!
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="city">My City</TabsTrigger>
          <TabsTrigger value="india">All India</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Leaderboard Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {activeTab === "city"
                    ? "Delhi Rankings"
                    : activeTab === "india"
                    ? "India Rankings"
                    : "Friends Rankings"}
                </CardTitle>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Updated hourly
                </span>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : (
                  <div className="space-y-3">
                    {leaderboardData[activeTab]?.length > 0 ? (
                      leaderboardData[activeTab].map((user) => (
                        <LeaderboardCard key={user.rank} {...user} />
                      ))
                    ) : (
                      <p className="text-gray-500">No data available</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Stats */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                {currentUser ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/40 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                        #{currentUser.rank}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Current Rank
                      </div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                        {currentUser.trend || "—"}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/40 rounded-lg">
                        <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                          {currentUser.points}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Total Points
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/40 rounded-lg">
                        <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
                          {currentUser.total_badges || 0}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Badges
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">You’re not ranked yet</p>
                )}
              </CardContent>
            </Card>

            {/* Next Milestone */}
            {currentUser && (
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Next Milestone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Reach Top {Math.max(currentUser.rank - 1, 1)}
                    </div>
                    <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      +{50} points to go
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-[#3f3f3f] rounded-full h-2 mt-3">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
