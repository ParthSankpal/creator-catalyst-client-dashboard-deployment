"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { startChallenge } from "@/src/api/challenges";
import { useState } from "react";

export default function ChallengeCard(props) {
  const router = useRouter();
  const {
    challenge_id,
    challenge_status, // "active" | "upcoming" | "completed"
    challenge_title,
    description,
    reward_points,
    reward_coins,
    difficulty_level,
    location,
    category,
    progress_status, // "not_started" | "in_progress" | "completed"
    progress_started_at,
    progress_updated_at,
    submissions,
    points_earned,
    start_date,
    end_date,
  } = props;

  const [starting, setStarting] = useState(false);

  const handleView = () => {
    router.push(`/challenges/${challenge_id}`);
  };

  const handleStart = async () => {
    setStarting(true);
    try {
      await startChallenge(challenge_id);
      router.push(`/challenges/${challenge_id}`);
    } catch (err) {
      console.error("Failed to start challenge:", err);
      alert("Failed to start challenge ❌");
    } finally {
      setStarting(false);
    }
  };

  // 🔹 Pick latest submission if exists
  let latestSubmission = null;
  if (submissions?.length > 0) {
    latestSubmission = [...submissions].sort(
      (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
    )[0];
  }

  return (
    <Card className="transition flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] duration-200">
      <div>

        <CardHeader className="flex flex-row items-center justify-between">
          <Badge className="text-sm font-medium" variant="secondary">
            {challenge_status}
          </Badge>
          {/* Show submission accept_status if available */}
          {latestSubmission && (
            <div className=" flex items-center gap-2 text-sm">
              {latestSubmission.accept_status ? (
                <Badge className="bg-green-500 text-white">✔ Reviewed</Badge>
              ) : (
                <Badge className="bg-yellow-500 text-white">⏳ Under Review</Badge>
              )}
              
            </div>
          )}
        </CardHeader>

        <CardContent className=" pt-4">
          <CardTitle className="text-lg font-semibold mb-1">
            {challenge_title}
          </CardTitle>
          <CardDescription className="mb-4">{description}</CardDescription>

          {/* Active */}
          {challenge_status === "active" && (
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reward</span>
                <span className="font-medium text-emerald-600">
                  {reward_points} pts / {reward_coins} coins
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span className="font-medium">{difficulty_level}</span>
              </div>
              {location && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{location}</span>
                </div>
              )}
            </div>
          )}

          {/* Completed */}
          {challenge_status === "completed" && (
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Points Earned</span>
                <span className="font-medium text-green-600">{points_earned}</span>
              </div>
            </div>
          )}

          {/* Upcoming */}
          {challenge_status === "upcoming" && (
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start</span>
                <span className="font-medium">{start_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">End</span>
                <span className="font-medium">{end_date}</span>
              </div>
            </div>
          )}

          
        </CardContent>
      </div>

      <CardFooter className="flex gap-2">
        {/* 🔹 Active */}
        {challenge_status === "active" && (
          <>
            {progress_status === "not_started" ? (
              <Button
                className="flex-1 cursor-pointer"
                onClick={handleStart}
                disabled={starting}
              >
                {starting ? "Starting..." : "Start"}
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="flex-1 cursor-pointer"
                  onClick={handleView}
                >
                  View
                </Button>
                <Button
                  className="flex-1 cursor-pointer"
                  onClick={handleView}
                >
                  {submissions?.length > 0
                    ? "View Submission(s)"
                    : "Submit Entry"}
                </Button>
              </>
            )}
          </>
        )}

        {/* 🔹 Completed */}
        {challenge_status === "completed" && (
          <>
            {submissions?.length > 0 ? (
              <Button
                variant="secondary"
                className="flex-1 cursor-pointer"
                onClick={handleView}
              >
                View Submissions
              </Button>
            ) : (
              <Button className="flex-1" variant="secondary" disabled>
                Challenge Missed
              </Button>
            )}
          </>
        )}

        {/* 🔹 Upcoming */}
        {challenge_status === "upcoming" && (
          <>
            <Button
              variant="secondary"
              className="flex-1 cursor-pointer"
              onClick={handleView}
            >
              View
            </Button>
            <Button className="flex-1" variant="secondary" disabled>
              Coming Soon
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
