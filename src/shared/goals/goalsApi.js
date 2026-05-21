import { useEffect, useMemo, useState } from "react";

import request from "../../api/request";
import { weeklyGoalsMock } from "./goalsMock";

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
    type: newGoal.type || "Learning",
    current: Number(newGoal.current) || 0,
    total: Number(newGoal.total),
    achieved: false,
    achievedDay: null,
    dueDay: newGoal.dueDay || "Friday",
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

export function useWeeklyGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadWeeklyGoals() {
      try {
        setLoading(true);
        setError(null);

        const weeklyGoals = await getWeeklyGoals();

        if (!ignore) {
          setGoals(weeklyGoals);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadWeeklyGoals();

    return () => {
      ignore = true;
    };
  }, []);

  const activeGoals = useMemo(
    () => goals.filter((goal) => !goal.achieved),
    [goals]
  );

  const achievedGoals = useMemo(
    () => goals.filter((goal) => goal.achieved),
    [goals]
  );

  const deleteGoal = async (id) => {
    await deleteWeeklyGoal(id);
    setGoals((currentGoals) => currentGoals.filter((goal) => goal.id !== id));
  };

  const addGoal = async (newGoal) => {
    const createdGoal = await addWeeklyGoal(newGoal);

    setGoals((currentGoals) => [createdGoal, ...currentGoals]);

    return createdGoal;
  };

  return {
    goals,
    activeGoals,
    achievedGoals,
    loading,
    error,
    addGoal,
    deleteGoal,
  };
}
