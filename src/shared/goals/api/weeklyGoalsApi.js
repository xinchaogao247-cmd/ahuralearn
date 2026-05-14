import request from "../../../api/request";
import { weeklyGoalsMock } from "../mock/weeklyGoalsMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getWeeklyGoals() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(weeklyGoalsMock);
      }, mockDelay);
    });
  }

  return request.get("/weekly-goals");
}

export async function getActiveWeeklyGoals() {
  const goals = await getWeeklyGoals();

  return goals.filter((goal) => !goal.achieved);
}

export async function getAchievedWeeklyGoals() {
  const goals = await getWeeklyGoals();

  return goals.filter((goal) => goal.achieved);
}

export async function addWeeklyGoal(newGoal) {
  const goal = {
    id: Date.now(),
    title: newGoal.title,
    current: 0,
    total: Number(newGoal.total),
    achieved: false,
    achievedDay: null,
  };

  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        weeklyGoalsMock.unshift(goal);
        resolve(goal);
      }, mockDelay);
    });
  }

  return request.post("/weekly-goals", goal);
}

export async function deleteWeeklyGoal(id) {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const goalIndex = weeklyGoalsMock.findIndex((goal) => goal.id === id);

        if (goalIndex !== -1) {
          weeklyGoalsMock.splice(goalIndex, 1);
        }

        resolve({ id });
      }, mockDelay);
    });
  }

  return request.delete(`/weekly-goals/${id}`);
}
