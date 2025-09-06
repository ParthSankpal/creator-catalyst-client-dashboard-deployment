"use client";
import { useState, useEffect } from "react";


import ChallengeCard from "../ChallengeCard/ChallengeCard";
import Tabs from "../../Tabs/Tabs";
import { formatDuration, getChallengeColors, getChallengeStatus, getEmojiForChallenge } from "../../../utils/challenges";
import { getChallenges } from "../../../api/challenges";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [challenges, setChallenges] = useState({
    active: [],
    completed: [],
    upcoming: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChallenges();

        const categorized = { active: [], completed: [], upcoming: [] };

        data?.data?.forEach((c) => {
          const status = getChallengeStatus(c);
          const colors = getChallengeColors(status);
          const emoji = getEmojiForChallenge(c.challenge_title, c.difficulty_level);

          categorized[status].push({
            id: c.id,
            title: c.challenge_title,
            description: c.description,
            reward: `${c.reward_points} pts`,
            participants: c.participants || Math.floor(Math.random() * 1000),
            rank: c.rank || "#7",
            points: c.points || `${c.reward_points} pts`,
            expectedReward: `${c.reward_points} pts`,
            duration: formatDuration(c.start_date, c.end_date),
            timeLeft: status === "active" ? getTimeRemaining(c.end_date) : null,
            status:
              status === "completed"
                ? "Completed"
                : status === "upcoming"
                  ? "Starts Soon"
                  : "Ongoing",
            emoji,
            ...colors,
          });
        });


        setChallenges(categorized);
      } catch (err) {
        console.error("Error fetching challenges:", err);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Upcoming", value: "upcoming" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Challenges 🏆
        </h2>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Participate in exciting challenges to earn points and showcase your
          creativity!
        </p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges[activeTab]?.length > 0 ? (
          challenges[activeTab].map((c) => (
            <ChallengeCard key={c.id} type={activeTab} {...c} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              {activeTab === "active" && "🚀 No active challenges right now. Check back soon!"}
              {activeTab === "completed" && "✅ You haven’t completed any challenges yet."}
              {activeTab === "upcoming" && "⏳ No upcoming challenges are scheduled."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
