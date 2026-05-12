import { useEffect, useState } from "react";

import { getCoursesPageData } from "../api/coursesApi";

export function useCourses() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadCoursesData() {
      try {
        setLoading(true);
        setError(null);

        const coursesData = await getCoursesPageData();

        if (!ignore) {
          setData(coursesData);
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

    loadCoursesData();

    return () => {
      ignore = true;
    };
  }, []);

  const empty = !loading && !error && (!data || (data.courses?.length ?? 0) === 0);

  return {
    data,
    loading,
    error,
    empty,
  };
}
