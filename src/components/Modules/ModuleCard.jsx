
const ModuleCard = ({ icon, title, description, videos, assignments, score, inProgress, unlocked, unlocksAt }) => {
    return (
        <article className={`bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border-l-3 ${unlocked ? (inProgress ? "border-emerald-500" : "border-emerald-600") : "border-gray-300"} flex flex-col`}>
            <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${unlocked ? (inProgress ? "bg-emerald-100 text-emerald-800" : "bg-emerald-600 text-white") : "bg-gray-200 text-gray-500"}`}>
                    {unlocked ? (inProgress ? "In Progress" : "Completed") : "Locked"}
                </span>
                <span>
                    {icon}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <h3>
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <div className="flex flex-col items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between w-full">
                    Videos
                    <span className="font-medium">{videos}</span>
                </div>
                <div className="flex justify-between w-full mt-2">
                    Assignments
                    <span className="font-medium">{assignments}</span>
                </div>
                {score !== undefined &&
                    <div className="flex justify-between w-full mt-2">
                        Score
                        <span className="font-medium">{score}</span>
                    </div>
                }
                {!unlocked &&
                    <div className="flex justify-between w-full mt-2">
                        Unlocks At
                        <span className="font-medium">{unlocksAt}</span>
                    </div>
                }
            </div>
            {
                !inProgress && unlocked &&
                <button className="mt-4 px-4 py-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-700 hover:text-emerald-100 transition w-full">
                    Review Materials
                </button>
            }
            {
                inProgress && unlocked &&
                <>
                    <button className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-700 hover:text-white transition w-full">
                        Watch Next Video 🎥
                    </button>
                    <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition w-full">
                        Mark Complete ✓
                    </button>
                </>
            }
            {
                !unlocked &&
                <button className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed w-full" disabled>
                    Locked
                </button>
            }
        </article>
    )
}

export default ModuleCard
