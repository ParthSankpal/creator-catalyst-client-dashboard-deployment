import React from "react";

const ProgressCard = ({ progress }) => {
  if (!progress || !progress.videos || !progress.assignments) {
    return (
      <div className="bg-white dark:bg-[#2c2c2c] rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Your Progress 📊
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          You haven’t started any modules yet.  
          Start one to see your progress here!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        Your Progress 📊
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-[#3a3a3a] p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress.videos?.done ?? 0}/{progress.videos?.total ?? 0}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Videos Watched
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#3a3a3a] p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress.assignments?.done ?? 0}/{progress.assignments?.total ?? 0}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Assignments Done
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-[#3a3a3a] p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progress.avgScore ?? 0}%
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Avg Score</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
