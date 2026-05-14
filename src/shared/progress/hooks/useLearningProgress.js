import { useEffect, useState } from "react";

import { getLearningProgress } from "../api/learningProgressApi";

export function useLearningProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadLearningProgress() {
      try {
        setLoading(true);
        setError(null);

        const learningProgress = await getLearningProgress();

        if (!ignore) {
          setProgress(learningProgress);
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

    loadLearningProgress();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    progress,
    loading,
    error,
  };
}
