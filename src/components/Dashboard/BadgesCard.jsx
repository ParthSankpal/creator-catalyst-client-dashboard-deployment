"use client";

export default function BadgesCard({ data }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Badges
        </h3>
        <span className="text-sm text-emerald-600 font-medium">
          {data.filter((b) => b.unlocked).length}/{data.length} unlocked
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {data.map((badge, i) => (
          <div
            key={i}
            className={`text-center p-3 rounded-xl ${
              badge.unlocked
                ? "bg-yellow-50 dark:bg-yellow-900/30"
                : "bg-gray-50 dark:bg-gray-700/50"
            }`}
          >
            <div className="text-2xl mb-1">{badge.icon}</div>
            <div
              className={`text-xs font-medium ${
                badge.unlocked
                  ? "text-gray-700 dark:text-gray-200"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {badge.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
