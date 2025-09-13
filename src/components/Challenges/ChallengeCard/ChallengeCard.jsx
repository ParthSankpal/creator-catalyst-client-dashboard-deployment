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

export default function ChallengeCard(props) {
  const router = useRouter();
  const {
    challenge_id,
    type,
    title,
    description,
    emoji,
    badgeColor,
    timeLeft,
    reward,
    participants,
    rank,
    points,
    expectedReward,
    duration,
    status,

    // 🔹 progress + submissions
    progress_started_at,
    progress_updated_at,
    submissions,
  } = props;

  const handleView = () => {
    router.push(`/challenges/${challenge_id}`);
  };

  return (
    <Card className="transition hover:shadow-lg hover:scale-[1.02] duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        {(type === "active" || type === "completed" || type === "upcoming") && (
          <Badge
            className={`text-xs font-medium ${badgeColor}`}
            variant="secondary"
          >
            {timeLeft || status}
          </Badge>
        )}
        <span className="text-2xl">{emoji}</span>
      </CardHeader>

      <CardContent>
        <CardTitle className="text-lg font-semibold mb-1">{title}</CardTitle>
        <CardDescription className="mb-4">{description}</CardDescription>

        {/* Active */}
        {type === "active" && (
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Participants</span>
              <span className="font-medium">{participants}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reward</span>
              <span className="font-medium text-emerald-600">{reward}</span>
            </div>
          </div>
        )}

        {/* Completed */}
        {type === "completed" && (
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Your Rank</span>
              <span className="font-medium text-green-600">{rank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Points Earned</span>
              <span className="font-medium text-green-600">{points}</span>
            </div>
          </div>
        )}

        {/* Upcoming */}
        {type === "upcoming" && (
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Reward</span>
              <span className="font-medium text-purple-600">
                {expectedReward}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{duration}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* 🔹 Active */}
        {type === "active" && (
          <>
            <Button
              variant="secondary"
              className="flex-1 cursor-pointer"
              onClick={handleView}
            >
              View
            </Button>

            {(progress_started_at ||
              progress_updated_at ||
              submissions?.length > 0) && (
              <Button className="flex-1 cursor-pointer">
                {submissions?.length > 0
                  ? "Add Another Submission"
                  : "Submit Entry"}
              </Button>
            )}
          </>
        )}

        {/* 🔹 Completed */}
        {type === "completed" && (
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
        {type === "upcoming" && (
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
