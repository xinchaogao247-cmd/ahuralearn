import request from "../request";
import { learningPlanMockData } from "./learningPlanMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;
const generatedAIStudyPlanKey = "ahuralearn:generatedAIStudyPlan";

function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, mockDelay);
  });
}

function getStoredGeneratedAIStudyPlan() {
  try {
    const storedPlan = localStorage.getItem(generatedAIStudyPlanKey);

    return storedPlan ? JSON.parse(storedPlan) : null;
  } catch (err) {
    console.warn("Failed to read generated AI study plan", err);
    return null;
  }
}

function getPriority(priorityText) {
  const normalizedPriority = priorityText?.toLowerCase() ?? "";

  if (
    normalizedPriority.includes("high") ||
    normalizedPriority.includes("essential")
  ) {
    return "High";
  }

  if (normalizedPriority.includes("low")) {
    return "Low";
  }

  return "Medium";
}

function createAITasks(generatedPlan) {
  return (generatedPlan?.modules ?? []).map((module, index) => {
    const priority = getPriority(module.priority);

    return {
      id: `ai-generated-${module.id ?? index}`,
      title: module.title,
      studyTime: module.duration,
      completed: false,
      dueText: index === 0 ? "Due Today" : index === 1 ? "Tomorrow" : "This Week",
      priority,
      active: index === 0,
      note: generatedPlan.summary,
      tags: [
        {
          label: "AI SUGGESTION",
          className: "ai-tag",
        },
        {
          label: `Priority ${priority}`,
          className: "priority-tag",
        },
      ],
    };
  });
}

function mergeGeneratedAIStudyPlan(data) {
  const generatedPlan = getStoredGeneratedAIStudyPlan();
  const generatedTasks = createAITasks(generatedPlan);

  if (generatedTasks.length === 0) {
    return data;
  }

  const regularTasks = data.planner.tasks.filter(
    (task) => !String(task.id).startsWith("ai-generated-")
  );

  return {
    ...data,
    planner: {
      ...data.planner,
      tasks: [...generatedTasks, ...regularTasks],
    },
  };
}

export function saveGeneratedAIStudyPlan(generatedPlan) {
  try {
    localStorage.setItem(generatedAIStudyPlanKey, JSON.stringify(generatedPlan));
  } catch (err) {
    console.warn("Failed to save generated AI study plan", err);
  }
}

export async function getLearningPlanData() {
  if (useMockApi) {
    return mockResponse(mergeGeneratedAIStudyPlan(learningPlanMockData));
  }

  const data = await request.get("/learning-plan");

  return mergeGeneratedAIStudyPlan(data);
}

export async function createStudyPlan(newPlan) {
  if (useMockApi) {
    return mockResponse(newPlan);
  }

  return request.post("/learning-plan", newPlan);
}

export async function updateStudyPlan(id, updatedPlan) {
  if (useMockApi) {
    return mockResponse({
      id,
      ...updatedPlan,
    });
  }

  return request.put(`/learning-plan/${id}`, updatedPlan);
}

export async function deleteStudyPlan(id) {
  if (useMockApi) {
    return mockResponse({
      success: true,
      id,
    });
  }

  return request.delete(`/learning-plan/${id}`);
}

export async function completeStudyPlan(id) {
  if (useMockApi) {
    return mockResponse({
      success: true,
      id,
    });
  }

  return request.patch(`/learning-plan/${id}/complete`);
}

export async function generateAIStudyPlan(data) {
  if (useMockApi) {
    return mockResponse(data);
  }

  return request.post("/learning-plan/ai-suggest", data);
}
