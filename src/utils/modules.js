// Normalizes modules data from both APIs
export const transformModulesData = (data, source = "creator") => {
  return data.map((item) => ({
    id: source === "all" ? item.id : item.module_id,
    title: item.title,
    documentation: item.documentation,
    activity: item.activity,
    status: source === "all" ? item.status : item.module_status,
    videoUrl: item.video_url,
    rewardPoints: item.reward_points_can_achieve,
    // 👇 Fix: use real progress if available (for both sources)
    progressStatus: item.progress_status ?? "not_started",
    pointsEarned: item.points_earned ?? 0,
    createdAt: item.created_at,
    updatedAt: item.module_updated_at,
    createdBy: item.created_by,
    videoFile: item.video_file,
  }));
};


// Calculates overall progress
export const calculateProgress = (modules) => {
  if (!modules.length) {
    return { total: 0, completed: 0, inProgress: 0, percentage: 0 };
  }

  const total = modules.length;
  const completed = modules.filter((m) => m.progressStatus === "completed").length;
  const inProgress = modules.filter((m) => m.progressStatus === "in_progress").length;
  const percentage = Math.round((completed / total) * 100);

  return { total, completed, inProgress, percentage };
};
