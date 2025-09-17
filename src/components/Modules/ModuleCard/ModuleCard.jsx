"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function ModuleCard({
  module_id,
  title,
  documentation,
  description,
  reward_points_can_achieve,
  progress_status,
  points_earned,
  submissions = [],
  tab,
  onStart,
  onView,
}) {
  const [starting, setStarting] = useState(false);

  // 🔹 Get latest submission
  let latestSubmission = null;
  if (submissions?.length > 0) {
    latestSubmission = [...submissions].sort(
      (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
    )[0];
  }

  const progressPercent =
    reward_points_can_achieve > 0
      ? (points_earned / reward_points_can_achieve) * 100
      : 0;

  const handleStartClick = async () => {
    setStarting(true);
    await onStart(module_id);
    setStarting(false);
  };

  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition duration-200">
      <div>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {tab !== "available" && (
            <Badge
              variant={progress_status === "completed" ? "default" : "secondary"}
              className="capitalize"
            >
              {progress_status}
            </Badge>
          )}
        </CardHeader>

        <CardContent>
          <CardDescription className="mb-3 line-clamp-3">
            <div className=" mb-3">
              {description || "No description available"}
            </div>
            <div className=" line-clamp-4">

              {documentation || "No description available"}
            </div>
          </CardDescription>

          {tab !== "available" && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-1">
                {points_earned} / {reward_points_can_achieve} pts
              </p>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}

          {latestSubmission && (
            <div className="flex items-center gap-2 text-sm mt-2">
              {latestSubmission.accept_status ? (
                <Badge className="bg-green-500 text-white">✔ Reviewed</Badge>
              ) : (
                <Badge className="bg-yellow-500 text-white">⏳ Under Review</Badge>
              )}
              <Badge variant="outline">{latestSubmission.points_awarded} pts</Badge>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter>
        {tab === "available" ? (
          <Button
            onClick={handleStartClick}
            className="w-full cursor-pointer"
            disabled={starting}
          >
            {starting ? "Starting..." : "Start"}
          </Button>
        ) : (
          <Button
            onClick={onView}
            variant="secondary"
            className="w-full cursor-pointer"
          >
            View
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
