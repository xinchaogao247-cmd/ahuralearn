import { useEffect, useState } from "react";

import { getAIStudyPlanData } from "../../../api/ai/aiStudyPlanApi";

export function useAIStudyPlan() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadAIStudyPlanData() {
      try {
        setLoading(true);
        setError(null);

        const aiStudyPlanData = await getAIStudyPlanData();

        if (!ignore) {
          setData(aiStudyPlanData);
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

    loadAIStudyPlanData();

    return () => {
      ignore = true;
    };
  }, []);

  const empty =
    !loading &&
    !error &&
    (!data || (data.recommendedModules?.length ?? 0) === 0);

  return {
    data,
    loading,
    error,
    empty,
  };
}
