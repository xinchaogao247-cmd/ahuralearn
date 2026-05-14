import { useEffect, useMemo, useState } from "react";

import { deleteWeeklyGoal, getWeeklyGoals } from "../api/weeklyGoalsApi";

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

  return {
    goals,
    activeGoals,
    achievedGoals,
    loading,
    error,
    deleteGoal,
  };
}
