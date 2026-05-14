import { useEffect, useState } from "react";

import { getAchievementsData } from "../api/achievementsApi";

export function useAchievements() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadAchievementsData() {
      try {
        setLoading(true);
        setError(null);

        const achievementsData = await getAchievementsData();

        if (!ignore) {
          setData(achievementsData);
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

    loadAchievementsData();

    return () => {
      ignore = true;
    };
  }, []);

  const empty = !loading && !error && (!data || (data.badges?.length ?? 0) === 0);

  return {
    data,
    loading,
    error,
    empty,
  };
}
