import Card from "./form/Card";

export default function RecentSubmissions() {
  const submissions = [
    {
      title: "Old Delhi Markets",
      status: "Approved • 2 days ago",
      points: "+50 pts",
      bg: "from-green-400 to-emerald-400",
      textColor: "text-green-600",
    },
    {
      title: "Connaught Place",
      status: "Under Review • 1 day ago",
      points: "Pending",
      bg: "from-yellow-400 to-orange-400",
      textColor: "text-yellow-600",
    },
  ];

  return (
    <Card title="Recent Submissions">
      <div className="space-y-3">
        {submissions.map((sub, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className={`w-12 h-8 bg-gradient-to-br ${sub.bg} rounded`}></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{sub.title}</div>
              <div className="text-xs text-gray-500">{sub.status}</div>
            </div>
            <div className={`${sub.textColor} text-sm`}>{sub.points}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
