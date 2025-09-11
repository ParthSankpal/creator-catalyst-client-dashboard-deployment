"use client";

import React, { useEffect, useState } from "react";
import ProgressCard from "../ProgressCard";
import ModuleCard from "../ModuleCard/ModuleCard";
import { transformModulesData, calculateProgress } from "../../../utils/modules";
import { getCreatorModules } from "../../../api/modules";

const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const result = await getCreatorModules();
        if (result.status === "success") {
          const transformed = transformModulesData(result.data);
          setModules(transformed);
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

  return (
    <div className="page-content min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Learning Modules 📚
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Master content creation through our structured program!
          </p>
        </div>

        <div className="mb-8">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading progress...</p>
          ) : progress ? (
            <ProgressCard progress={progress} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No progress data available yet.
            </p>
          )}
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading modules...</p>
        ) : modules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <ModuleCard key={module.id} {...module} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No modules available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default ModulesPage;
