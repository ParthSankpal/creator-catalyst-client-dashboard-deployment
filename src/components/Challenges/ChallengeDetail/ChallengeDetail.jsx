"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getChallengeById,
  startChallenge,
  submitChallenge,
} from "../../../api/challenges";
import {
  getChallengeStatus,
  getTimeRemaining,
  formatDuration,
  getChallengeColors,
  getEmojiForChallenge,
} from "../../../utils/challenges";

export default function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await getChallengeById(id);
        const c = res?.data;
console.log(c);

        if (c) {
          const status = getChallengeStatus(c);
          const colors = getChallengeColors(status);
          const emoji = getEmojiForChallenge(c.challenge_title, c.difficulty_level);

          setChallenge({
            id: c.id,
            title: c.challenge_title,
            description: c.description,
            reward: `${c.reward_points} pts`,
            participants: c.participants || 0,
            duration: formatDuration(c.start_date, c.end_date),
            timeLeft: status === "active" ? getTimeRemaining(c.end_date) : null,
            status,
            emoji,
            ...colors,
          });
        }
      } catch (err) {
        console.error("Error fetching challenge:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

 const handleStart = async () => {
  try {
    setSubmitting(true);
    const response = await startChallenge(id); 
    console.log("Start challenge response:", response.data);

    alert("Challenge started! 🚀");
    return response; 
  } catch (err) {
    // Check if error response exists
    const errorMessage =
      err?.response?.data?.message || 
      err?.message ||                 
      "Something went wrong.";

    console.error("Error starting challenge:", errorMessage, err);
    alert(`Failed to start challenge: ${errorMessage}`);

    throw err; 
  } finally {
    setSubmitting(false);
  }
};


  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      const payload = { answer: "My submission..." };
      await submitChallenge(id, payload);
      alert("Challenge submitted ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to submit challenge.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 dark:text-gray-300">Loading challenge...</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Challenge not found.</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-3xl mx-auto px-6 py-8 rounded-2xl shadow-xl border-l-4 ${challenge.borderColor}
        bg-white text-gray-900 shadow-gray-200/40
        dark:bg-[#222222] dark:text-gray-100 dark:shadow-gray-800`}
    >
      <div className="flex justify-between items-center mb-6">
        <span
          className={`px-3 py-1 ${challenge.badgeColor} text-xs font-medium rounded-full`}
        >
          {challenge.status === "active"
            ? challenge.timeLeft
            : challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
        </span>
        <span className="text-3xl">{challenge.emoji}</span>
      </div>

      <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {challenge.description}
      </p>

      <div className="space-y-2 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Reward</span>
          <span className="font-medium text-emerald-600">{challenge.reward}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Participants</span>
          <span className="font-medium">{challenge.participants}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Duration</span>
          <span className="font-medium">{challenge.duration}</span>
        </div>
      </div>

      {/* Actions */}
      {challenge.status === "upcoming" && (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg font-medium cursor-not-allowed 
                     dark:bg-[#3f3f3f] dark:text-gray-400"
        >
          Starts Soon
        </button>
      )}

      {challenge.status === "active" && (
        <div className="flex gap-4">
          <button
            onClick={handleStart}
            disabled={submitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            {submitting ? "Starting..." : "Start Challenge"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition"
          >
            {submitting ? "Submitting..." : "Submit Entry"}
          </button>
        </div>
      )}

      {challenge.status === "completed" && (
        <button
          disabled
          className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg font-medium cursor-not-allowed 
                     dark:bg-[#3f3f3f] dark:text-gray-400"
        >
          Challenge Ended
        </button>
      )}
    </div>
  );
}
