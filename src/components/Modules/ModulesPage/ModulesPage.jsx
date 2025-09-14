"use client";

import React, { useEffect, useState } from "react";
import { transformModulesData, calculateProgress } from "../../../utils/modules";
import { getCreatorModules, getModules } from "../../../api/modules";

// shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ModuleCard from "../ModuleCard/ModuleCard";
import ProgressCard from "../ProgressCard";

const ModulesPage = () => {
  const [allModules, setAllModules] = useState([]);
  const [creatorModules, setCreatorModules] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // fetch both APIs in parallel
        const [allRes, creatorRes] = await Promise.all([
          getModules(),
          getCreatorModules(),
        ]);

        if (allRes.status === "success") {
          setAllModules(transformModulesData(allRes.data));
        }

        if (creatorRes.status === "success") {
          const transformed = transformModulesData(creatorRes.data);
          setCreatorModules(transformed);
          setProgress(calculateProgress(transformed));
        }
      } catch (err) {
        console.error("Error fetching modules:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const isModuleStarted = (id) =>
    creatorModules.some((m) => m.id === id);

  return (
    <div className="page-content min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Learning Modules 📚
          </h2>
          <p className="mt-1 text-muted-foreground">
            Master content creation through our structured program!
          </p>
        </div>

        {/* Progress Summary */}
        <div className="mb-8">
          {loading ? (
            <Card className="p-4">
              <Skeleton className="h-6 w-1/3 mb-3" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ) : progress ? (
            <ProgressCard progress={progress} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No progress data available yet</CardTitle>
              </CardHeader>
              <CardContent>
                Start a module to see your progress here.
              </CardContent>
            </Card>
          )}
        </div>

        {/* All Modules Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-2/3 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : allModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allModules.map((module) =>
              isModuleStarted(module.id) ? (
                <ModuleCard key={module.id} {...module} />
              ) : (
                <Card key={module.id} className="flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {module.documentation}
                    </p>
                  </CardContent>
                  <div className="p-4">
                    <Button asChild>
                      <a href={`/modules/${module.id}`}>Start Module</a>
                    </Button>
                  </div>
                </Card>
              )
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No modules available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default ModulesPage;
