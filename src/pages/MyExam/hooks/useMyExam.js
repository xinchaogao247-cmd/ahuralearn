import { useEffect, useState } from "react";

import { getMyExamPageData } from "../api/myExamApi";

export function useMyExam() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadMyExamData() {
      try {
        setLoading(true);
        setError(null);

        const myExamData = await getMyExamPageData();

        if (!ignore) {
          setData(myExamData);
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

    loadMyExamData();

    return () => {
      ignore = true;
    };
  }, []);

  const empty =
    !loading &&
    !error &&
    (!data ||
      !data.result ||
      (data.subjects?.length ?? 0) === 0 ||
      (data.recentExams?.length ?? 0) === 0);

  return {
    data,
    loading,
    error,
    empty,
  };
}