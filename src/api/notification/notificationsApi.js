import request from "../request";
import { notificationsMock } from "./notificationsMock";
import {
  acknowledgeExpiringPlan,
  getUnreadExpiringPlans,
} from "./notificationStorage";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;
const priorityRank = {
  High: 0,
  Medium: 1,
  Low: 2,
};

function sortNotifications(plans) {
  return [...plans].sort((firstPlan, secondPlan) => {
    const dateDifference =
      new Date(firstPlan.dueDate).getTime() -
      new Date(secondPlan.dueDate).getTime();

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return (
      (priorityRank[firstPlan.priority] ?? 99) -
      (priorityRank[secondPlan.priority] ?? 99)
    );
  });
}

export async function getNotificationsData() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...notificationsMock,
          expiringPlans: sortNotifications(
            getUnreadExpiringPlans(notificationsMock.expiringPlans)
          ),
        });
      }, mockDelay);
    });
  }

  const response = await request.get("/notifications");

  return {
    ...response,
    expiringPlans: sortNotifications(response.expiringPlans ?? []),
  };
}

export async function acknowledgeNotification(planId) {
  if (useMockApi) {
    acknowledgeExpiringPlan(planId);

    return { id: planId };
  }

  return request.patch(`/notifications/${planId}/acknowledge`);
}
