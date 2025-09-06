import React from "react";

const ProgressCard = ({ progress }) => {
  if (!progress) return null;

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        Your Progress 📊
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-[#3a3a3a] p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress.videos.done}/{progress.videos.total}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Videos Watched
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#3a3a3a] p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress.assignments.done}/{progress.assignments.total}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Assignments Done
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#3a3a3a] p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress.avgScore}%
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Avg Score</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
