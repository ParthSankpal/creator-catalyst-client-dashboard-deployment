"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getModules,
  getCreatorModules,
  startModule,
} from "@/src/api/modules";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Tabs from "@/src/components/Tabs/Tabs";
import Notification from "@/src/components/Notification/Notification";
import ModuleCard from "../ModuleCard/ModuleCard";

export default function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("available");
  const [notification, setNotification] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const [allModulesRes, creatorModulesRes] = await Promise.all([
          getModules(),
          getCreatorModules(),
        ]);

        const allModules = allModulesRes?.data || [];
        const creatorModules = creatorModulesRes?.data || [];

        // Map enrolled modules with progress
        const enrolledMap = {};
        creatorModules.forEach((m) => {
          enrolledMap[m.module_id] = m;
        });

        const merged = allModules.map((mod) => ({
          ...mod,
          ...enrolledMap[mod.module_id], // overwrite with enrolled data if exists
          progress_status: enrolledMap[mod.module_id]?.progress_status || "not_started",
          points_earned: enrolledMap[mod.module_id]?.points_earned || 0,
        }));

        setModules(merged);
      } catch (err) {
        console.error("Error fetching modules:", err);
        setNotification({ message: "Failed to load modules", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleStart = async (id) => {
    try {
      await startModule(id);
      setNotification({ message: "Module started!", type: "success" });

      setModules((prev) =>
        prev.map((m) =>
          m.module_id === id
            ? { ...m, progress_status: "in_progress", points_earned: 0 }
            : m
        )
      );

      setTab("in_progress");
    } catch (err) {
      console.error(err);
      setNotification({ message: "Failed to start module", type: "error" });
    }
  };

  const tabs = [
    { value: "available", label: "Available" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const availableModules = modules.filter((m) => m.progress_status === "not_started");
  const inProgressModules = modules.filter((m) => m.progress_status === "in_progress");
  const completedModules = modules.filter((m) => m.progress_status === "completed");

  let filteredModules = [];
  if (tab === "available") filteredModules = availableModules;
  if (tab === "in_progress") filteredModules = inProgressModules;
  if (tab === "completed") filteredModules = completedModules;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semiboldbold mb-6">📘 Modules</h2>

      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />

      {filteredModules.length === 0 ? (
        <p className="text-muted-foreground mt-6">No modules here</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredModules.map((mod) => (
            <ModuleCard
              key={mod.module_id}
              {...mod}
              tab={tab}
              onStart={handleStart}
              onView={() => router.push(`/modules/${mod.module_id}`)}
            />
          ))}
        </div>
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
