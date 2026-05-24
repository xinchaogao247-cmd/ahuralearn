import { expiringPlansMock } from "./notificationsMock";

/**
 * localStorage 中保存“已确认通知 ID”的 key。
 *
 * 浏览器会通过这个 key
 * 存储用户已经查看过的通知。
 */
const acknowledgedKey = "acknowledgedExpiringPlanIds";

/**
 * 自定义通知更新事件名称。
 *
 * 当通知状态发生变化时，
 * 会通过 window.dispatchEvent 广播该事件，
 * 让其他组件同步更新通知状态。
 */
export const notificationsUpdatedEvent = "notifications-updated";

/**
 * 获取已确认（已读）的通知 ID。
 *
 * 数据来源：
 * localStorage
 *
 * 返回值：
 * 一个数组，例如：
 * [1, 2, 5]
 */
export function getAcknowledgedPlanIds() {

  /**
   * 从 localStorage 中读取已读通知数据。
   */
  const storedIds = localStorage.getItem(acknowledgedKey);

  /**
   * 如果没有存储数据，
   * 返回空数组。
   */
  if (!storedIds) {
    return [];
  }

  try {

    /**
     * localStorage 只能保存字符串，
     * 所以这里需要将 JSON 字符串
     * 转换回数组。
     */
    return JSON.parse(storedIds);

  } catch (error) {

    /**
     * 防止 JSON 数据损坏导致页面报错。
     *
     * 如果解析失败：
     * - 在控制台输出警告
     * - 返回空数组
     */
    console.warn(
      "Failed to parse acknowledged notifications",
      error
    );

    return [];
  }
}

/**
 * 获取未读的学习计划通知。
 *
 * 默认使用：
 * expiringPlansMock 中的通知数据。
 *
 * 逻辑：
 * 过滤掉已经确认（已读）的通知。
 */
export function getUnreadExpiringPlans(
  plans = expiringPlansMock
) {

  /**
   * 获取已读通知 ID 列表。
   */
  const acknowledgedIds = getAcknowledgedPlanIds();

  /**
   * filter:
   * 过滤出“未读通知”。
   *
   * includes():
   * 判断通知 ID 是否已经存在于
   * acknowledgedIds 中。
   */
  return plans.filter(
    (plan) => !acknowledgedIds.includes(plan.id)
  );
}

/**
 * 获取当前未读通知数量。
 *
 * 常用于：
 * - TopNav 红点数量
 * - Notification Badge
 * - 未读提示
 */
export function getUnreadNotificationCount() {

  /**
   * 返回未读通知数组长度。
   */
  return getUnreadExpiringPlans().length;
}

/**
 * 将某个通知标记为“已确认 / 已读”。
 *
 * 参数：
 * planId:
 * 当前通知的 ID。
 */
export function acknowledgeExpiringPlan(planId) {

  /**
   * 获取当前已读通知 ID。
   */
  const acknowledgedIds = getAcknowledgedPlanIds();

  /**
   * 防止重复保存相同 ID。
   */
  if (!acknowledgedIds.includes(planId)) {

    /**
     * 将新的已读 ID
     * 保存到 localStorage 中。
     *
     * JSON.stringify:
     * 将数组转换为字符串。
     */
    localStorage.setItem(
      acknowledgedKey,
      JSON.stringify([
        ...acknowledgedIds,
        planId,
      ])
    );
  }

  /**
   * 广播通知更新事件。
   *
   * 用于通知其他组件：
   * “通知状态已经发生变化”
   *
   * 例如：
   * - TopNav 红点同步更新
   * - Notification 页面同步刷新
   */
  window.dispatchEvent(
    new Event(notificationsUpdatedEvent)
  );
}
