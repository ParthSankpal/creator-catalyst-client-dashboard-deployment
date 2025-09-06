"use client";

export default function UpcomingCard({ data }) {
  return (
    <div className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Upcoming
      </h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg bg-${item.color}-50 dark:bg-${item.color}-900/30`}
          >
            <div
              className={`w-2 h-2 bg-${item.color}-500 rounded-full flex-shrink-0`}
            ></div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
