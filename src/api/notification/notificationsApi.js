import request from "../request";
import { notificationsMock } from "./notificationsMock";

import {
  acknowledgeExpiringPlan,
  deleteExpiringPlan,
  getVisibleExpiringPlans,
} from "./notificationStorage";

/**
 * 是否使用 Mock API 数据。
 *
 * 当 VITE_USE_MOCK_API 不等于 "false" 时，
 * 系统会默认使用本地 mock 数据，
 * 而不是请求真实后端接口。
 */
const useMockApi =
  import.meta.env.VITE_USE_MOCK_API !== "false";

/**
 * 模拟 API 请求延迟时间（毫秒）。
 *
 * 用于模拟真实网络请求加载效果。
 */
const mockDelay = 300;

/**
 * 通知优先级排序规则。
 *
 * 数字越小：
 * 优先级越高。
 *
 * High:
 * 最高优先级。
 *
 * Medium:
 * 中等优先级。
 *
 * Low:
 * 最低优先级。
 */
const priorityRank = {
  High: 0,
  Medium: 1,
  Low: 2,
};

/**
 * 对通知数据进行排序。
 *
 * 排序规则：
 * 1. 优先按到期日期排序
 * 2. 如果日期相同，再按优先级排序
 */
function sortNotifications(plans) {

  /**
   * [...plans]&#58;    * 复制数组，
   * 防止直接修改原始数据。
   */
  return [...plans].sort(
    (firstPlan, secondPlan) => {

      /**
       * 计算两个通知之间的日期差值。
       *
       * new Date().getTime():
       * 将日期转换为时间戳，
       * 方便进行数值比较。
       */
      const dateDifference =
        new Date(firstPlan.dueDate).getTime() -
        new Date(secondPlan.dueDate).getTime();

      /**
       * 如果日期不同：
       * 优先按日期排序。
       *
       * 日期越早：
       * 排序越靠前。
       */
      if (dateDifference !== 0) {
        return dateDifference;
      }

      /**
       * 如果日期相同：
       * 再按优先级排序。
       *
       * High:
       * 会排在最前面。
       */
      return (
        (priorityRank[firstPlan.priority] ?? 99) -
        (priorityRank[secondPlan.priority] ?? 99)
      );
    }
  );
}

/**
 * 获取 Notifications 页面数据。
 *
 * 功能：
 * - 获取通知数据
 * - 过滤已读通知
 * - 对通知进行排序
 * - 支持 mock 数据
 * - 支持真实后端接口
 */
export async function getNotificationsData() {

  /**
   * ==============================
   * 开发阶段：使用本地 mock 数据
   * ==============================
   */
  if (useMockApi) {

    /**
     * Promise:
     * 模拟真实 API 请求。
     */
    return new Promise((resolve) => {

      /**
       * setTimeout:
       * 模拟网络请求延迟。
       */
      setTimeout(() => {

        /**
         * resolve():
         * 返回最终通知数据。
         */
        resolve({

          /**
           * 展开 notificationsMock 中的原始数据。
           */
          ...notificationsMock,

          /**
           * expiringPlans:
           * 即将过期的学习计划通知。
           *
           * 处理流程：
           * 1. 获取未读通知
           * 2. 对通知进行排序
           */
          expiringPlans: sortNotifications(
            getVisibleExpiringPlans(
              notificationsMock.expiringPlans
            )
          ),
        });

      }, mockDelay);
    });
  }

  /**
   * ==============================
   * 后期接入真实后端
   * ==============================
   */

  /**
   * 请求真实后端接口。
   */
  const response =
    await request.get("/notifications");

  /**
   * 返回处理后的通知数据。
   *
   * 对真实接口返回的数据：
   * 继续进行排序处理。
   */
  return {

    /**
     * 展开后端返回的数据。
     */
    ...response,

    /**
     * 对通知数据进行排序。
     */
    expiringPlans: sortNotifications(
      response.expiringPlans ?? []
    ),
  };
}

/**
 * 将某个通知标记为“已读 / 已确认”。
 *
 * 参数：
 * planId:
 * 当前通知 ID。
 */
export async function acknowledgeNotification(
  planId
) {

  /**
   * ==============================
   * 开发阶段：使用 localStorage
   * ==============================
   */
  if (useMockApi) {

    /**
     * 调用本地存储逻辑，
     * 将通知保存为已读状态。
     */
    acknowledgeExpiringPlan(planId);

    /**
     * 返回简单响应结果。
     */
    return {
      id: planId,
    };
  }

  /**
   * ==============================
   * 后期接入真实后端
   * ==============================
   *
   * PATCH:
   * 更新服务器中的通知状态。
   *
   * acknowledge:
   * 表示“确认通知 / 标记已读”。
   */
  return request.patch(
    `/notifications/${planId}/acknowledge`
  );
}

export async function deleteNotification(planId) {
  if (useMockApi) {
    deleteExpiringPlan(planId);

    return {
      id: planId,
    };
  }

  return request.delete(
    `/notifications/${planId}`
  );
}
