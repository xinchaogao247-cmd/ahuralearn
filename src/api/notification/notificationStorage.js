import { expiringPlansMock } from "./notificationsMock";

let acknowledgedPlanIds = [];
let deletedPlanIds = [];

export const notificationsUpdatedEvent = "notifications-updated";

export function getAcknowledgedPlanIds() {
  return acknowledgedPlanIds;
}

export function getDeletedPlanIds() {
  return deletedPlanIds;
}

export function getVisibleExpiringPlans(plans = expiringPlansMock) {
  const acknowledgedIds = getAcknowledgedPlanIds();
  const deletedIds = getDeletedPlanIds();

  return plans
    .filter((plan) => !deletedIds.includes(plan.id))
    .map((plan) => ({
      ...plan,
      isAcknowledged: acknowledgedIds.includes(plan.id),
    }));
}

export function getUnreadExpiringPlans(plans = expiringPlansMock) {
  const acknowledgedIds = getAcknowledgedPlanIds();
  const deletedIds = getDeletedPlanIds();

  return plans.filter(
    (plan) =>
      !acknowledgedIds.includes(plan.id) && !deletedIds.includes(plan.id)
  );
}

export function getUnreadNotificationCount() {
  return getUnreadExpiringPlans().length;
}

export function acknowledgeExpiringPlan(planId) {
  if (!acknowledgedPlanIds.includes(planId)) {
    acknowledgedPlanIds = [...acknowledgedPlanIds, planId];
  }

  window.dispatchEvent(new Event(notificationsUpdatedEvent));
}

export function deleteExpiringPlan(planId) {
  if (!deletedPlanIds.includes(planId)) {
    deletedPlanIds = [...deletedPlanIds, planId];
  }

  window.dispatchEvent(new Event(notificationsUpdatedEvent));
}
