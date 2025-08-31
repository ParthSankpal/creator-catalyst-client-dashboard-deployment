"use client";
import { useState } from "react";
import Tabs from "../../../components/Tabs/Tabs";
import ChallengeCard from "../../../components/Challenges/ChallengeCard/ChallengeCard";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState("active");

  // Global Tabs
  const tabs = [
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Upcoming", value: "upcoming" },
  ];

  // Dummy data
  const challenges = {
    active: [
      {
        id: "delhi-street-food",
        title: "Delhi Street Food Spots",
        description:
          "Showcase the hidden gems and popular street food locations in Delhi. Focus on authenticity and local experience.",
        participants: 847,
        reward: "50 points",
        emoji: "🍕",
        timeLeft: "2 days left",
        borderColor: "border-red-500",
        badgeColor: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
      },
      {
        id: "mumbai-history",
        title: "Historic Mumbai",
        description:
          "Explore and document Mumbai's rich history through its architecture, monuments, and cultural landmarks.",
        participants: 623,
        reward: "75 points",
        emoji: "🏛️",
        timeLeft: "5 days left",
        borderColor: "border-yellow-500",
        badgeColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
      },
      {
        id: "bangalore-tech",
        title: "Bangalore Tech Hub",
        description:
          "Show the innovative spirit of Bangalore's tech ecosystem, from startups to IT parks and innovation centers.",
        participants: 392,
        reward: "60 points",
        emoji: "💻",
        timeLeft: "1 week left",
        borderColor: "border-blue-500",
        badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
      },
    ],
    completed: [
      {
        id: "kolkata-art",
        title: "Kolkata Art Scene",
        description:
          "Captured the vibrant art culture of Kolkata, from street art to traditional galleries.",
        rank: "#7",
        points: "45 points",
        emoji: "🎨",
        status: "Completed",
        borderColor: "border-green-500",
        badgeColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
      },
    ],
    upcoming: [
      {
        id: "chennai-culture",
        title: "Chennai Cultural Heritage",
        description:
          "Explore Chennai's rich cultural heritage, temples, music, and traditional arts.",
        expectedReward: "80 points",
        duration: "2 weeks",
        emoji: "🎭",
        status: "Starts Feb 1",
        borderColor: "border-purple-500",
        badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
      },
    ],
  };

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

      {/* Reusable Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges[activeTab].map((c) => (
          <ChallengeCard key={c.id} type={activeTab} {...c} />
        ))}
      </div>
    </div>
  );
}
