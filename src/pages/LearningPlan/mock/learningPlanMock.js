export const learningPlanMockData = {
  planner: {
    title: "Study Planner",
    actions: ["Manual Edit", "AI Suggest"],
    tasks: [
      {
        id: 1,
        title: "JavaFX Animation Lab",
        studyTime: "2h",
        completed: false,
        dueText: "Due Today",
        active: true,
        tags: [
          {
            label: "AI SUGGESTION",
            className: "ai-tag",
          },
          {
            label: "Priority High",
            className: "priority-tag",
          },
        ],
      },
      {
        id: 2,
        title: "Advanced React Patterns - Module 4",
        studyTime: "1.5h",
        completed: false,
        subtitle: "Manual Entry",
        dueText: "Tomorrow",
      },
      {
        id: 3,
        title: "HTML/CSS Semantic Audit",
        studyTime: "2h",
        completed: true,
        subtitle: "Completed 2h ago",
        dueText: "Finished",
        finished: true,
        done: true,
      },
    ],
  },
};
