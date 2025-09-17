"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getLeaderboard } from "@/src/api/leaderboardApi";

export default function LeaderboardPage() {
  const user = useSelector((state) => state.user.user); 
  // // // // // console.log(user);
  
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getLeaderboard();
        const apiData = res.data || [];

        // console.log(apiData);
        

        // map API response into UI-friendly structure
        const mapped = apiData.map((item) => ({
          id: item.creator_id,
          rank: item.rank,
          name: item.channel_name || item.user_name,
          email: item.user_email,
          points: item.total_points,
          coins: item.total_coins,
          badges: item.total_badges,
        }));

        setLeaderboard(mapped);

        // find current logged-in user
        const me = mapped.find((u) => u.id === user?.id);
        // console.log(me, "current logged-in user");
        
        setCurrentUser(me || null);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Leaderboard 📊
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          See how you rank against other creators across India!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard List */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>India Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : leaderboard.length > 0 ? (
                <div className="space-y-2">
                  {leaderboard.map((u) => (
                    <div
                      key={u.rank}
                      className={`flex items-center justify-between rounded-xl p-3 transition ${
                        u.id === user?.id
                          ? "bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {/* Left: Rank + Avatar + Name */}
                      <div className="flex items-center space-x-4">
                        <span className="w-6 text-center font-semibold text-gray-700 dark:text-gray-300">
                          #{u.rank}
                        </span>
                        <Avatar>
                          <AvatarFallback>
                            {u.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {u.name}
                        </span>
                      </div>

                      {/* Right: Points + Badges */}
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {u.points} pts
                        </span>
                        <span className="font-semibold text-purple-600 dark:text-purple-400">
                          🎖 {u.badges}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Stats */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              {currentUser ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/40 rounded-xl">
                    <div className="text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
                      #{currentUser.rank}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Current Rank
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/40 rounded-lg">
                      <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                        {currentUser.points}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Points
                      </div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/40 rounded-lg">
                      <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
                        {currentUser.coins}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Coins
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/40 rounded-lg">
                      <div className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                        {currentUser.badges}
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
          {currentUser && currentUser.rank > 1 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Next Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const aheadUser = leaderboard.find(
                    (u) => u.rank === currentUser.rank - 1
                  );
                  const pointsNeeded =
                    aheadUser && aheadUser.points > currentUser.points
                      ? aheadUser.points - currentUser.points + 1
                      : 0;

                  return (
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Beat <span className="font-medium">{aheadUser?.name}</span> (Rank #{aheadUser?.rank})
                      </div>
                      <div className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                        +{pointsNeeded} points to go
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
