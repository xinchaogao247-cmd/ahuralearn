import { useEffect, useState } from "react";

import { getLearningPlanData } from "../api/learningPlanApi";

export function useLearningPlan() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadLearningPlanData() {
      try {
        setLoading(true);
        setError(null);

        const learningPlanData = await getLearningPlanData();

        if (!ignore) {
          setData(learningPlanData);
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

    loadLearningPlanData();

    return () => {
      ignore = true;
    };
  }, []);

  const empty =
    !loading && !error && (!data || (data.planner?.tasks?.length ?? 0) === 0);

  return {
    data,
    loading,
    error,
    empty,
  };
}
