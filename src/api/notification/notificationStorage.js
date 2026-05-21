import { expiringPlansMock } from "./notificationsMock";

const acknowledgedKey = "acknowledgedExpiringPlanIds";

export const notificationsUpdatedEvent = "notifications-updated";

export function getAcknowledgedPlanIds() {
  const storedIds = localStorage.getItem(acknowledgedKey);

  if (!storedIds) {
    return [];
  }

  try {
    return JSON.parse(storedIds);
  } catch (error) {
    console.warn("Failed to parse acknowledged notifications", error);
    return [];
  }
}

export function getUnreadExpiringPlans(plans = expiringPlansMock) {
  const acknowledgedIds = getAcknowledgedPlanIds();

  return plans.filter((plan) => !acknowledgedIds.includes(plan.id));
}

export function getUnreadNotificationCount() {
  return getUnreadExpiringPlans().length;
}

export function acknowledgeExpiringPlan(planId) {
  const acknowledgedIds = getAcknowledgedPlanIds();

  if (!acknowledgedIds.includes(planId)) {
    localStorage.setItem(
      acknowledgedKey,
      JSON.stringify([...acknowledgedIds, planId])
    );
  }

  window.dispatchEvent(new Event(notificationsUpdatedEvent));
}
