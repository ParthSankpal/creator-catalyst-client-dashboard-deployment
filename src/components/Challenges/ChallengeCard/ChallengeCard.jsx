"use client";
import { useRouter } from "next/navigation";

export default function ChallengeCard(props) {
  const router = useRouter();
  const {
    id, // make sure we pass id from the parent
    type,
    title,
    description,
    emoji,
    borderColor,
    badgeColor,
    timeLeft,
    reward,
    participants,
    rank,
    points,
    expectedReward,
    duration,
    status,
  } = props;

  const handleClick = () => {
    router.push(`/challenges/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer rounded-2xl shadow-xl p-6 border-l-4 ${borderColor} transition 
        bg-white text-gray-900 shadow-gray-200/40
        dark:bg-[#222222] dark:text-gray-100 dark:shadow-gray-800
        hover:shadow-2xl hover:scale-[1.02] duration-200
      `}
    >
      <div className="flex items-center justify-between mb-4">
        {(type === "active" || type === "completed" || type === "upcoming") && (
          <span
            className={`px-3 py-1 ${badgeColor} text-xs font-medium rounded-full`}
          >
            {timeLeft || status}
          </span>
        )}
        <span className="text-2xl">{emoji}</span>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Active */}
      {type === "active" && (
        <>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Participants
              </span>
              <span className="font-medium">{participants}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Reward</span>
              <span className="font-medium text-emerald-600">{reward}</span>
            </div>
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition">
            Submit Entry
          </button>
        </>
      )}

      {/* Completed */}
      {type === "completed" && (
        <>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Your Rank</span>
              <span className="font-medium text-green-600">{rank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Points Earned
              </span>
              <span className="font-medium text-green-600">{points}</span>
            </div>
          </div>
          <button
            className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-medium cursor-not-allowed 
                       dark:bg-[#3f3f3f] dark:text-gray-400"
          >
            Challenge Ended
          </button>
        </>
      )}

      {/* Upcoming */}
      {type === "upcoming" && (
        <>
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Expected Reward
              </span>
              <span className="font-medium text-purple-600">
                {expectedReward}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Duration</span>
              <span className="font-medium">{duration}</span>
            </div>
          </div>
          <button
            className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg font-medium cursor-not-allowed 
                       dark:bg-[#3f3f3f] dark:text-gray-400"
          >
            Coming Soon
          </button>
        </>
      )}
    </div>
  );
}
