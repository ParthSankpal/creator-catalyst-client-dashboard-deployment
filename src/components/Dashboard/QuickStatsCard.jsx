"use client";

export default function QuickStatsCard({ data }) {
  return (
    <div className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Quick Stats
      </h3>
      {data.map((stat, i) => (
        <div key={i} className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {stat.label}
          </span>
          <span
            className={`font-semibold ${
              stat.highlight
                ? "text-green-600 dark:text-green-400"
                : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
