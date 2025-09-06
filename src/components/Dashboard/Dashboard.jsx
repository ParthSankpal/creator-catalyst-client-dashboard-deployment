"use client";

import { useSelector } from "react-redux";


import ProgressCard from "./ProgressCard";
import ChallengeCard from "./ChallengeCard";
import ModuleCard from "./ModuleCard";
import BadgesCard from "./BadgesCard";
import QuickStatsCard from "./QuickStatsCard";
import UpcomingCard from "./UpcomingCard";

/* Dummy Data */
const progressData = {
  submissions: { count: 5, total: 12, percent: 42 },
  points: { current: 260, weekly: 45 },
  rank: { current: 18, city: "Delhi", movement: "+3" },
};

const challengeData = {
  title: "Delhi Street Food Spots",
  description:
    "Showcase the hidden gems and popular street food locations in Delhi. Focus on authenticity, taste, and the local experience.",
  deadline: "Jan 20, 2025",
  points: 50,
  daysLeft: 2,
};

const moduleData = {
  week: 3,
  title: "Editing & Tools",
  description:
    "Master video editing techniques and learn about essential tools for creating engaging short-form content.",
  actions: ["Watch Video 🎥", "Download PDF 📄", "Mark Complete ✓"],
};

const badgesData = [
  { icon: "🏆", label: "First Upload", unlocked: true },
  { icon: "🎬", label: "Video Creator", unlocked: true },
  { icon: "📈", label: "Trending", unlocked: true },
  { icon: "⭐", label: "Top Creator", unlocked: false },
  { icon: "🔥", label: "Viral Hit", unlocked: false },
];

const quickStatsData = [
  { label: "Views this week", value: "12.5K" },
  { label: "Likes received", value: "834" },
  { label: "Comments", value: "127" },
  { label: "Completion rate", value: "85%", highlight: true },
];

const upcomingData = [
  { color: "red", title: "Challenge submission", time: "Due in 2 days" },
  { color: "yellow", title: "Week 4 module", time: "Starts Jan 22" },
];

export default function Dashboard() {
  const user = useSelector((state) => state.user.user);


  if (!user) return <p>Please log in to see your YouTube data.</p>;

  return (
    <div className="page-content  min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Hi, {user.name} from {user.city}! 👋
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressCard data={progressData} />
            <ChallengeCard data={challengeData} />
            <ModuleCard data={moduleData} />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <BadgesCard data={badgesData} />
            <QuickStatsCard data={quickStatsData} />
            <UpcomingCard data={upcomingData} />
          </div>
        </div>
      </div>
    </div>
  );
}
