export const expiringPlansMock = [
  {
    id: 1,
    title: "Advanced React Patterns - Module 4",
    courseName: "Advanced React Patterns",
    dueDate: "2026-05-18",
    daysLeft: 1,
    priority: "High",
    status: "Due Soon",
  },
  {
    id: 2,
    title: "Machine Learning Quiz Review",
    courseName: "Machine Learning Certification",
    dueDate: "2026-05-19",
    daysLeft: 2,
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    title: "UI/UX Case Study Draft",
    courseName: "UI/UX Design Fundamentals",
    dueDate: "2026-05-20",
    daysLeft: 3,
    priority: "Low",
    status: "Scheduled",
  },
];

export const notificationsMock = {
  expiringPlans: expiringPlansMock,
};
