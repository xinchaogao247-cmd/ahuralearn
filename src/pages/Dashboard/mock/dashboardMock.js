export const dashboardMock = {
  username: "Alex",
  learningProgress: {
    title: "My Learning Progress",
    percentage: 75,
    label: "COMPLETED",
    weeklyChange: "+10% This Week",
    message: "Keep it up! You're on track to finish 2 goals early.",
  },
  ongoingCourses: [
    {
      title: "Web Development Masterclass",
      status: "IN PROGRESS",
      progress: 60,
      lessons: "12/20 Lessons",
    },
    {
      title: "Advanced React Patterns",
      status: "IN PROGRESS",
      progress: 35,
      lessons: "7/20 Lessons",
    },
  ],
  achievementStats: [
    {
      value: "12",
      label: "Completed",
    },
    {
      value: "04",
      label: "Certificates",
    },
    {
      value: "86h",
      label: "Study Hours",
    },
    {
      value: "15",
      label: "Day Streak",
    },
  ],
};
