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
import { getTimeRemaining } from "@/src/utils/challenges";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);

  const [rewards, setRewards] = useState(null);
  const [creatorModules, setCreatorModules] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [rewardsRes, modulesRes, challengesRes] = await Promise.all([
          getCreatorRewards(),
          getCreatorModules(),
          getChallenges(),
        ]);

        setRewards(rewardsRes?.data);
        setCreatorModules(modulesRes?.data || []);
        setChallenges(challengesRes?.data || []);
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

  return (
    <div className=" pt-6 space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Greeting */}
      <h2 className="text-2xl font-bold">Hi, {user?.name} 👋</h2>

      {/* Progress & Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">
        {/* Progress */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Your Progress 🎯</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </>
            ) : (
              <>
                <Progress
                  value={
                    (creatorModules.filter((m) => m.progress_status === "completed")
                      .length /
                      creatorModules.length) *
                    100 || 0
                  }
                  className="mb-2"
                />
                <p className="text-sm text-muted-foreground">
                  {
                    creatorModules.filter((m) => m.progress_status === "completed")
                      .length
                  }{" "}
                  of {creatorModules.length} Modules Completed
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Rewards */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Current Points ⭐</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : (
              <>
                <p className="text-3xl font-bold">{rewards?.total_points || 0}</p>
                <p className="text-sm text-muted-foreground">
                  Coins: {rewards?.total_coins || 0}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Badges 🏆</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 flex-wrap">
            {loading ? (
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            ) : rewards?.badges_earned > 0 ? (
              [...Array(rewards.badges_earned)].map((_, i) => (
                <Badge key={i} variant="secondary">
                  🥇 Badge {i + 1}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No badges yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Challenges */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Currently Enrolled</h3>
          {enrolledChallenges.length > 2 && (
            <Button asChild variant="outline" size="sm">
              <Link href="/challenges">View More</Link>
            </Button>
          )}
        </div>

        {enrolledChallenges.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledChallenges.slice(0, 2).map((ch) => (
                <Card key={ch.challenge_id} className="p-4">
                  <h4 className="font-semibold">
                    {ch.challenge_title} ({ch.target_city})
                  </h4>
                  <p className="text-sm text-muted-foreground">{ch.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline">
                      {getTimeRemaining(ch.end_date)} left
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {ch.points_earned}/{ch.reward_points} pts
                    </span>
                  </div>
                  <Button className="mt-3 w-full">Submit Video 🎥</Button>
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

      {/* Submitted Challenges */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          {submittedChallenges.length > 1 && (
            <>
              <h3 className="font-semibold">Your Submissions</h3>
              <Button asChild variant="outline" size="sm">
                <Link href="/challenges">View More</Link>
              </Button>
            </>
          )}
        </div>

        {submittedChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {submittedChallenges.slice(0, 2).map((ch) => (
              <Card key={ch.challenge_id} className="p-4">
                <h4 className="font-semibold">{ch.challenge_title}</h4>
                <p className="text-sm text-muted-foreground">{ch.description}</p>
                <Button asChild variant="secondary" className="mt-3 w-full">
                  <Link href={`/challenges/${ch.challenge_id}`}>
                    View Submissions
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        ) : (null)}
      </div>


      <Card >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Your Modules 📚</CardTitle>
            {creatorModules.length > 2 && (
              <Button asChild variant="outline" size="sm">
                <Link href="/modules">View More</Link>
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="grid gap-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-5 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-3 w-1/2" />
                </Card>
              ))}
            </div>
          ) : creatorModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {creatorModules.slice(0, 2).map((m) => (
                <Card
                  key={m.module_id}
                  className="p-4 hover:shadow-md cursor-pointer transition"
                >
                  <h4 className="font-medium">{m.title}</h4>
                  <p className="text-sm text-muted-foreground">{m.documentation}</p>
                  <div className="flex justify-between items-center mt-2">
                    <Progress
                      value={m.progress_status === "completed" ? 100 : 0}
                      className="w-2/3"
                    />
                    <span className="text-xs">
                      {m.points_earned}/{m.reward_points_can_achieve} pts
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No modules assigned yet.</p>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
