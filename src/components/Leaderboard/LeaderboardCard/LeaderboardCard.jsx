export default function LeaderboardCard({ rank, name, location, points, trend, highlight }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg transition ${
        highlight
          ? "bg-emerald-50 border border-emerald-200 dark:bg-emerald-900/40 dark:border-emerald-700"
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      <div className={`w-8 text-center font-bold ${highlight ? "text-emerald-700 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200"}`}>
        {rank}
      </div>
      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-900 dark:text-gray-100">{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{location}</div>
      </div>
      <div className="text-right">
        <div className={`font-bold ${highlight ? "text-emerald-700 dark:text-emerald-400" : "text-gray-700 dark:text-gray-200"}`}>
          {points} pts
        </div>
        <div className="text-xs text-emerald-600 dark:text-emerald-400">{trend}</div>
      </div>
    </div>
  );
}
