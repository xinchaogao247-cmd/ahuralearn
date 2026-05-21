import { useEffect, useState } from "react";

import { getDashboardData } from "../../../api/learning/dashboardApi";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadDashboardData() {
      try {
        setLoading(true);
        setError(null);

        const dashboardData = await getDashboardData();

        if (!ignore) {
          setData(dashboardData);
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

    loadDashboardData();

    return () => {
      ignore = true;
    };
  }, []);

  const empty =
    !loading &&
    !error &&
    (!data ||
      ((data.ongoingCourses?.length ?? 0) === 0 &&
        (data.achievementStats?.length ?? 0) === 0));

  return {
    data,
    loading,
    error,
    empty,
  };
}
