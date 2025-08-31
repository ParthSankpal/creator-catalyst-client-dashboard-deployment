// components/Tabs/Tabs.js
export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="mb-6">
      <div
        className={`
          flex space-x-1 rounded-lg p-1 w-fit 
          bg-gray-100 dark:bg-gray-800
        `}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md transition
              ${
                activeTab === tab.value
                  ? "bg-white shadow text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
