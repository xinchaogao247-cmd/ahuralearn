import request from "../../../api/request";
import { notificationsMock } from "../mock/notificationsMock";
import {
  acknowledgeExpiringPlan,
  getUnreadExpiringPlans,
} from "./notificationStorage";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getNotificationsData() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...notificationsMock,
          expiringPlans: getUnreadExpiringPlans(notificationsMock.expiringPlans),
        });
      }, mockDelay);
    });
  }

  return request.get("/notifications");
}

export async function acknowledgeNotification(planId) {
  if (useMockApi) {
    acknowledgeExpiringPlan(planId);

    return { id: planId };
  }

  return request.patch(`/notifications/${planId}/acknowledge`);
}
