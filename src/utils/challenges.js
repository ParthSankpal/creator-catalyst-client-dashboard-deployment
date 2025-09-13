// utils/challenges.js

// 🔹 Determine status from dates
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
  const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
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
    case "missed":
      return {
        borderColor: "border-red-500",
        badgeColor:
          "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
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
export const getEmojiForChallenge = (title = "", difficulty = "") => {
  if (title.toLowerCase().includes("food")) return "🍕";
  if (title.toLowerCase().includes("history")) return "🏛️";
  if (title.toLowerCase().includes("tech")) return "💻";
  if (title.toLowerCase().includes("art")) return "🎨";
  if (title.toLowerCase().includes("culture")) return "🎭";
  if (difficulty.toLowerCase() === "easy") return "🌱";
  if (difficulty.toLowerCase() === "medium") return "⚡";
  if (difficulty.toLowerCase() === "hard") return "🔥";
  return "🏆";
};

// 🔹 Transform API response
export const transformChallenges = (rawChallenges = []) => {
  const categorized = {
    active: { enrolled: [], others: [] },
    upcoming: { enrolled: [], others: [] },
    completed: { enrolled: [], others: [] },
  };

  rawChallenges.forEach((c) => {
    let status = getChallengeStatus(c);
    const hasSubmission = c.submissions && c.submissions.length > 0;

    // ✅ If submissions exist → always mark as completed
    if (hasSubmission) {
      status = "completed";
      c.completionStatus = "completed";
    } else if (status === "completed") {
      // ❌ Ended but no submission → missed
      c.completionStatus = "missed";
    }

    // 🎨 Assign colors
    const colors =
      c.completionStatus === "missed"
        ? getChallengeColors("missed")
        : getChallengeColors(status);

    const emoji = getEmojiForChallenge(
      c.challenge_title,
      c.difficulty_level
    );

    const challengeData = {
      challenge_id: c.challenge_id,
      type: status, // active | upcoming | completed
      title: c.challenge_title,
      description: c.description,
      reward: `${c.reward_points} pts`,
      participants: c.participants || Math.floor(Math.random() * 1000),
      rank: c.rank || "#7",
      points: c.points_earned || 0,
      expectedReward: `${c.reward_points} pts`,
      duration: formatDuration(c.start_date, c.end_date),
      timeLeft: status === "active" ? getTimeRemaining(c.end_date) : null,
      status:
        hasSubmission
          ? "Completed"
          : c.completionStatus === "missed"
          ? "Not Completed"
          : status === "upcoming"
          ? "Starts Soon"
          : "Ongoing",
      emoji,
      ...colors,
      enrolled: !!c.progress_id,

      // 🔹 Add progress + submissions
      progress_started_at: c.progress_started_at,
      progress_updated_at: c.progress_updated_at,
      progress_completed_at: c.progress_completed_at,
      points_earned: c.points_earned,
      submissions: c.submissions || [],
    };

    if (challengeData.enrolled) {
      categorized[status].enrolled.push(challengeData);
    } else {
      categorized[status].others.push(challengeData);
    }
  });

  return categorized;
};
