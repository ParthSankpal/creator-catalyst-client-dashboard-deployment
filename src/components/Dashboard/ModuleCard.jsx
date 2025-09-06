"use client";

export default function ModuleCard({ data }) {
  return (
    <div className="bg-white dark:bg-[#222222] rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Current Module 📚
      </h3>
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
        Week {data.week}: {data.title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {data.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {data.actions.map((action, i) => (
          <button
            key={i}
            className="bg-gray-100 dark:bg-[#3f3f3f] hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-3 rounded-lg text-sm font-medium transition"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
