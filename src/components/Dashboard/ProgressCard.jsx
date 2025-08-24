"use client";

export default function ProgressCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Your Progress 🎯
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Submissions */}
        <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            {data.submissions.count}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            of {data.submissions.total} Shorts
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"
              style={{ width: `${data.submissions.percent}%` }}
            ></div>
          </div>
        </div>

        {/* Points */}
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
          <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
            {data.points.current}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Current Points
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
            +{data.points.weekly} this week
          </div>
        </div>

        {/* Rank */}
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            #{data.rank.current}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            in {data.rank.city}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-300 mt-1">
            {data.rank.movement} positions
          </div>
        </div>
      </div>
    </div>
  );
}
