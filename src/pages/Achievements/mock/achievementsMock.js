export const achievementsMock = {
  title: "Achievements Page",
  summary: {
    totalBadges: 42,
    currentStreak: 15,
    globalRank: "Top 2%",
    nextMilestone: "MasterArchitect",
    progress: 75,
    currentXP: 300,
    targetXP: 400,
    level: 25,
    points: 1280,
    completedGoals: 12,
  },
  trophy: {
    title: "MasterArchitect",
    subtitle: "Next milestone",
    progress: 75,
    currentXP: 300,
    targetXP: 400,
    level: 25,
  },
  badges: [
    {
      id: 1,
      title: "Fast Starter",
      description: "Completed the first learning goal.",
    },
    {
      id: 2,
      title: "Study Streak",
      description: "Learned for 15 days in a row.",
    },
    {
      id: 3,
      title: "Course Finisher",
      description: "Completed 12 courses.",
    },
  ],
  weeklyGoals: [
    {
      id: 1,
      title: "Complete 3 Python Modules",
      achieved: true,
      achievedDate: "Monday",
      progress: 100,
    },
    {
      id: 2,
      title: "Solve 10 Logic Puzzles",
      achieved: true,
      achievedDate: "Wednesday",
      progress: 100,
    },
    {
      id: 3,
      title: "Daily Streak 15/20 Days",
      achieved: false,
      progress: 75,
    },
    {
      id: 4,
      title: "Pass Mock Certification",
      achieved: false,
      progress: 0,
    },
  ],
};
