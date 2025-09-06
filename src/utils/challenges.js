// utils/challenges.js

// 🔹 Determine status
export const getChallengeStatus = (challenge) => {
  const now = new Date();
  const start = new Date(challenge.start_date);
  const end = new Date(challenge.end_date);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "completed";
};

// 🔹 Calculate time left
export const getTimeRemaining = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

// 🔹 Duration
export const formatDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return `${days} days`;
};

// 🔹 Status → Colors
export const getChallengeColors = (status) => {
  switch (status) {
    case "active":
      return {
        borderColor: "border-blue-500",
        badgeColor:
          "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
      };
    case "upcoming":
      return {
        borderColor: "border-purple-500",
        badgeColor:
          "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
      };
    case "completed":
      return {
        borderColor: "border-green-500",
        badgeColor:
          "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
      };
    default:
      return {
        borderColor: "border-gray-500",
        badgeColor:
          "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200",
      };
  }
};

// 🔹 Category → Emoji mapping
export const getEmojiForChallenge = (title, difficulty) => {
  if (title.toLowerCase().includes("food")) return "🍕";
  if (title.toLowerCase().includes("history")) return "🏛️";
  if (title.toLowerCase().includes("tech")) return "💻";
  if (title.toLowerCase().includes("art")) return "🎨";
  if (title.toLowerCase().includes("culture")) return "🎭";
  if (difficulty === "easy") return "🌱";
  if (difficulty === "medium") return "⚡";
  if (difficulty === "hard") return "🔥";
  return "🏆";
};
