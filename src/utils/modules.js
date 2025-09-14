

export const transformModulesData = (data) => {
  return data.map((item) => ({
    id: item.module_id,
    title: item.title,
    documentation: item.documentation,
    activity: item.activity,
    status: item.module_status,
    videoUrl: item.video_url,
    rewardPoints: item.reward_points_can_achieve,
    progressStatus: item.progress_status ?? "not_started",
    pointsEarned: item.points_earned ?? 0,
  }));
};

export const calculateProgress = (modules) => {
  if (!modules.length) return { total: 0, completed: 0, percentage: 0 };

  const total = modules.length;
  const completed = modules.filter((m) => m.progressStatus === "completed").length;
  const percentage = Math.round((completed / total) * 100);

  return { total, completed, percentage };
};
