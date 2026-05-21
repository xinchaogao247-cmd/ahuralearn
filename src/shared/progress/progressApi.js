import { useEffect, useState } from "react";

import request from "../../api/request";
import { learningProgressMock } from "./progressMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getLearningProgress() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(learningProgressMock);
      }, mockDelay);
    });
  }

  return request.get("/learning-progress");
}

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
