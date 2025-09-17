"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCreatorRewards } from "@/src/api/dashboard";
import { getCreatorModules } from "@/src/api/modules";
import { getChallenges } from "@/src/api/challenges";
import { getLeaderboard } from "@/src/api/dashboard";
import { getTimeRemaining } from "@/src/utils/challenges";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);

  const [rewards, setRewards] = useState(null);
  const [creatorModules, setCreatorModules] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [rewardsRes, modulesRes, challengesRes, leaderboardRes] =
          await Promise.all([
            getCreatorRewards(),
            getCreatorModules(),
            getChallenges(),
            getLeaderboard(),
          ]);

        setRewards(rewardsRes?.data);
        setCreatorModules(modulesRes?.data || []);
        setChallenges(challengesRes?.data || []);
        setLeaderboard(leaderboardRes?.data || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 🔹 Challenges split
  const enrolledChallenges = challenges.filter(
    (c) =>
      c.challenge_status === "active" &&
      c.progress_status &&
      c.progress_status !== "not_started" &&
      (!c.submissions || c.submissions.length === 0)
  );

  const submittedChallenges = challenges.filter(
    (c) => c.submissions && c.submissions.length > 0
  );

  // 🔹 Find logged-in user’s rank
  const myRank = leaderboard.find(
    (entry) => entry.user_email === user?.email
  )?.rank;

  return (
    <div className=" pt-6 space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Greeting */}
      <h2 className="text-3xl font-semibold">
        Welcome Back, {user?.name?.split(" ")[0]}!
      </h2>
      <p className="text-muted-foreground -mt-3">
        Your next challenge is live, the leaderboard is waiting. Let’s see what
        you’ve got today.
      </p>

      {/* Progress, Rewards, Rank */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 mb-0">
        {/* Progress */}
        <Card
          className="p-6 rounded-2xl"
          style={{
            background: "#fff",
            border: "1px solid #98CFFE",
            boxShadow: "0px 0px 10px 2px rgba(39, 154, 255, 0.1)",
          }}
        >
          {loading ? (
            <>
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-4 w-40" />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-black mb-0">
                Your Progress
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Every module completed is a new skill unlocked
              </p>
              <Progress
                value={
                  (creatorModules.filter(
                    (m) => m.progress_status === "completed"
                  ).length /
                    creatorModules.length) *
                    100 || 0
                }
                className="h-3 rounded-full mb-0"
                style={{ backgroundColor: "#E5E7EB" }}
                indicatorClassName="bg-[#279AFF] rounded-full"
              />
              <p className="text-xs text-black mt-2">
                {
                  creatorModules.filter(
                    (m) => m.progress_status === "completed"
                  ).length
                }{" "}
                of {creatorModules.length} Modules Completed
              </p>
            </>
          )}
        </Card>

        {/* Rank */}
        <Card
          className="p-6 rounded-2xl flex flex-col items-center justify-center text-center"
          style={{
            background: "#fff",
            border: "1px solid #98CFFE",
            boxShadow: "0px 0px 10px 2px rgba(39, 154, 255, 0.1)",
          }}
        >
          {loading ? (
            <>
              <Skeleton className="h-10 w-14 mb-2" />
              <Skeleton className="h-4 w-20" />
            </>
          ) : myRank ? (
            <div className="my-3.5">
              <p
                className="text-7xl font-semibold"
                style={{ color: "#279AFF" }}
              >
                <span style={{ fontSize: "3rem" }}>#</span>
                {myRank}
              </p>
              <p className="text-base text-black mt-0 font-semibold ">
                Your Rank
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Not ranked yet</p>
          )}
        </Card>

        {/* Rewards */}
        <Card
          className="p-6 rounded-2xl shadow-md"
          style={{
            background: "#fff",
            border: "1px solid #98CFFE",
            boxShadow: "0px 0px 10px 2px rgba(39, 154, 255, 0.1)",
          }}
        >
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-semibold text-black">
              Your Coins
            </CardTitle>
            <p className="text-sm text-gray-500">
              Stack ’em up! Every challenge completed adds to your treasure.
            </p>
          </CardHeader>
          <CardContent className="p-0 mt-0 ml-1 mb-4">
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img src="/coin.png" alt="Coin" className="h-10" />
                <p
                  className="text-4xl font-semibold"
                  style={{ color: "#279AFF" }}
                >
                  {rewards?.total_coins || 0}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Enrolled + Completed + Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Enrolled Challenges (Left on desktop, last on mobile) */}
        <div className="order-3 md:order-1 md:col-span-2 mt-7">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-[1.25rem]">
                Currently Enrolled
              </h3>
              {enrolledChallenges.length > 5 && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/challenges">View More</Link>
                </Button>
              )}
            </div>

            {enrolledChallenges.length > 0 ? (
              <>
                {/* Table for desktop */}
                <div className="hidden md:block border rounded-xl overflow-hidden">
                  {/* Header row */}
                  <div
                    className="grid grid-cols-4 gap-4 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                    style={{
                      gridTemplateColumns: "2fr 1fr 1fr 1fr", // 🔹 Title wider than others
                    }}
                  >
                    <div>Challenge</div>
                    <div className="text-center">Reward</div>
                    <div className="text-center">Deadline</div>
                  </div>

                  {/* Rows */}
                  <div className="divide-y">
                    {enrolledChallenges.map((ch) => (
                      <div
                        key={ch.challenge_id}
                        className="grid grid-cols-4 gap-4 items-center px-4 py-3 hover:bg-gray-50 transition"
                        style={{
                          gridTemplateColumns: "2fr 1fr 1fr 1fr", // 🔹 Title wider than others
                        }}
                      >
                        {/* Challenge Title (Desktop Table) */}
                        <div className="font-medium text-gray-800">
                          {ch.challenge_title.length > 27
                            ? ch.challenge_title.slice(0, 27) + "..."
                            : ch.challenge_title}
                        </div>

                        {/* Points */}
                        <div className="text-center text-sm text-gray-700">
                          <p className="text-[#0A84F1] font-semibold">
                            {ch.reward_points} pts
                          </p>
                        </div>

                        {/* Deadline */}
                        <div className="text-center">
                          <Badge variant="outline">
                            {getTimeRemaining(ch.end_date)} left
                          </Badge>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <a href={`/challenges/${ch.challenge_id}`}>
                            <Button
                              size="sm"
                              className="rounded-full px-7 bg-[#1499FF] hover:cursor-pointer hover:bg-[#81C2FB]"
                            >
                              View
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cards for mobile */}
                <div className="block md:hidden space-y-4">
                  {enrolledChallenges.map((ch) => (
                    <Card key={ch.challenge_id} className="p-4">
                      <h4 className="font-semibold text-gray-900">
                        {ch.challenge_title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">
                        {ch.target_city}
                      </p>

                      <div className="flex justify-between items-center text-sm mb-3">
                        <span className="font-medium text-gray-700">
                          {ch.reward_points} pts
                        </span>
                        <Badge variant="outline">
                          {getTimeRemaining(ch.end_date)} left
                        </Badge>
                      </div>

                      <a href={`/challenges/${ch.challenge_id}`}>
                        <Button
                          size="sm"
                          className="rounded-full text-[15px] px-10 py-5 bg-[#1499FF] hover:cursor-pointer hover:bg-[#81C2FB]"
                        >
                          View
                        </Button>
                      </a>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <p className="text-muted-foreground mb-3">
                  Ready for challenges? 🚀
                </p>
                <Button asChild>
                  <Link href="/challenges">Explore Challenges</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Completed + Badges stacked */}
        <div className="order-1 md:order-2 flex flex-col gap-6">
          {/* Badges */}
          <Card
            className="relative p-6 rounded-2xl shadow-md overflow-hidden"
            style={{
              background: "#D1EAFF",
              border: "1px solid #98CFFE",
            }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none shimmer-overlay" />

            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl font-semibold text-[#0A84F1]">
                Badges Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Skeleton className="h-12 w-12 mb-2 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              ) : rewards?.badges?.length > 0 ? (
                <div className="flex flex-wrap gap-6">
                  {rewards.badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <img
                        src={badge.icon}
                        alt={badge.title}
                        className="w-16 h-16 object-contain"
                      />
                      <p className="text-sm font-medium mt-2">{badge.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No badges yet</p>
              )}
            </CardContent>
          </Card>

          {/* Challenges Completed */}
          <Card
            className="p-6 rounded-2xl shadow-md"
            style={{
              background: "#fff",
              border: "1px solid #98CFFE",
              boxShadow: "0px 0px 10px 2px rgba(39, 154, 255, 0.1)",
            }}
          >
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl font-semibold text-black">
                Challenges Completed
              </CardTitle>
              <p className="text-sm text-gray-500">
                Each challenge completed brings you closer to mastery.
              </p>
            </CardHeader>
            <CardContent className="p-0 mt-0 ml-1 mb-4">
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <p
                    className="text-4xl font-semibold"
                    style={{ color: "#279AFF" }}
                  >
                    {rewards?.challenges?.completed || 0}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
