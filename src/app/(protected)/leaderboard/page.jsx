"use client";
import { useState } from "react";
import Tabs from "../../../components/Tabs/Tabs";
import LeaderboardCard from "../../../components/Leaderboard/LeaderboardCard/LeaderboardCard";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("city");

  const tabs = [
    { label: "My City", value: "city" },
    { label: "All India", value: "india" },
    { label: "Friends", value: "friends" },
  ];


  const data = {
    city: [
      { rank: 1, name: "Ravi M.", location: "Delhi", points: 1432, trend: "👑" },
      { rank: 2, name: "Arjun K.", location: "Delhi", points: 1245, trend: "🥈" },
      { rank: 3, name: "Sarah L.", location: "Delhi", points: 1156, trend: "🥉" },
      { rank: 18, name: "Priya S. (You)", location: "Delhi", points: 260, trend: "↑3 this week", highlight: true },
    ],
    india: [
      { rank: 127, name: "Priya S. (You)", location: "Delhi", points: 260, trend: "↑15 this week", highlight: true },
    ],
    friends: [
      { rank: 1, name: "Priya S. (You)", location: "Delhi", points: 260, trend: "↑3 this week", highlight: true },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Leaderboard 📊
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          See how you rank against other creators in your city and across India!
        </p>
      </div>

      {/* Filter Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {activeTab === "city"
                  ? "Delhi Rankings"
                  : activeTab === "india"
                  ? "India Rankings"
                  : "Friends Rankings"}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Updated hourly
              </span>
            </div>

            <div className="space-y-3">
              {data[activeTab].map((user) => (
                <LeaderboardCard key={user.rank} {...user} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Your Stats
            </h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/40 rounded-xl">
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">#18</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Rank</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↑3 positions</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/40 rounded-lg">
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">260</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Points</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/40 rounded-lg">
                  <div className="text-lg font-bold text-purple-700 dark:text-purple-300">5</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Videos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/40 dark:shadow-black/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Next Milestone
            </h3>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Reach Top 15</div>
              <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400">40 points to go</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "75%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
