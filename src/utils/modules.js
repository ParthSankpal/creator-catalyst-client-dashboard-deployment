// Transform API response to module card format
export const transformModulesData = (data) => {
  if (!Array.isArray(data)) return [];

  return data.map((m) => {
    const inProgress = m.progress_status === "in_progress";
    const unlocked = m.module_status === "published";

    // Determine videos & assignments progress
    const videosDone = m.video_url ? 1 : 0;
    const videosTotal = 1; // can customize if multiple videos per module
    const assignmentsDone = m.activity ? 1 : 0;
    const assignmentsTotal = 1; // can customize if multiple assignments

    return {
      id: m.module_id,
      icon: getEmojiForModule(m.title),
      title: m.title,
      description: m.documentation,
      videos: `${videosDone}/${videosTotal}`,
      assignments: `${assignmentsDone}/${assignmentsTotal}`,
      score: m.points_earned ? `${m.points_earned}%` : undefined,
      inProgress,
      unlocked,
      unlocksAt: !unlocked ? formatDate(m.created_at) : null,
      raw: m,
    };
  });
};

// Calculate overall progress across all modules
export const calculateProgress = (modules) => {
  let totalVideos = 0;
  let completedVideos = 0;
  let totalAssignments = 0;
  let completedAssignments = 0;
  let totalScore = 0;
  let scoredModules = 0;

  modules.forEach((m) => {
    if (m.videos) {
      const [done, total] = m.videos.split("/").map(Number);
      completedVideos += done;
      totalVideos += total;
    }

    if (m.assignments) {
      const [done, total] = m.assignments.split("/").map(Number);
      completedAssignments += done;
      totalAssignments += total;
    }

    if (m.score) {
      totalScore += parseInt(m.score.replace("%", ""));
      scoredModules++;
    }
  });

  return {
    videos: { done: completedVideos, total: totalVideos },
    assignments: { done: completedAssignments, total: totalAssignments },
    avgScore: scoredModules > 0 ? Math.round(totalScore / scoredModules) : 0,
  };
};

// Get an emoji based on module title
export const getEmojiForModule = (title) => {
  const lower = title.toLowerCase();
  if (lower.includes("intro") || lower.includes("data")) return "📚";
  if (lower.includes("algo")) return "⚙️";
  return "🎓";
};

// Format date nicely
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
