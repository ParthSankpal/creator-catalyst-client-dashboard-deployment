"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



const ModuleCard = ({
  id,
  title,
  documentation,
  status,
  rewardPoints,
  progressStatus,
}) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Badge variant={status === "published" ? "default" : "secondary"}>
          {status}
        </Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{documentation}</p>
        <div className="mt-3 text-sm">
          <span className="font-medium">Points:</span> {rewardPoints}
        </div>
        <div className="text-sm">
          <span className="font-medium">Progress:</span> {progressStatus}
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild>
          <Link href={`/modules/${id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
