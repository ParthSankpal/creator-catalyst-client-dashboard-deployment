"use client";

export default function ChallengeCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Active Challenge
        </h3>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
          {data.daysLeft} days left
        </span>
      </div>
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
        {data.title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {data.description}
      </p>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-3">
        <span>📅 {data.deadline}</span> • <span>🏆 {data.points} points</span>
      </div>
      <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition mt-4">
        Submit Video 📹
      </button>
    </div>
  );
}
