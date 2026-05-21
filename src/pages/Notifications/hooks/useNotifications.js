import { useEffect, useState } from "react";

import {
  acknowledgeNotification,
  getNotificationsData,
} from "../../../api/notification/notificationsApi";

export function useNotifications() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadNotificationsData() {
      try {
        setLoading(true);
        setError(null);

        const notificationsData = await getNotificationsData();

        if (!ignore) {
          setData(notificationsData);
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

    loadNotificationsData();

    return () => {
      ignore = true;
    };
  }, []);

  const expiringPlans = data?.expiringPlans ?? [];
  const empty = !loading && !error && expiringPlans.length === 0;
  const acknowledgePlan = async (planId) => {
    await acknowledgeNotification(planId);

    setData((currentData) => ({
      ...currentData,
      expiringPlans: currentData.expiringPlans.filter(
        (plan) => plan.id !== planId
      ),
    }));
  };

  return {
    data,
    expiringPlans,
    loading,
    error,
    empty,
    acknowledgePlan,
  };
}
