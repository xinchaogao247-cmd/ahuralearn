import { useEffect, useState } from "react";

import {
  // 获取通知数据接口方法
  getNotificationsData,

  // 确认通知接口方法
  acknowledgeNotification,
} from "../../../api/notification/notificationsApi";

// 自定义 Hook
// 用于管理通知页面的数据与业务逻辑
export function useNotifications() {

  // 存储完整通知数据
  const [data, setData] = useState(null);

  // 页面加载状态
  const [loading, setLoading] = useState(true);

  // 错误状态
  const [error, setError] = useState(null);

  // 组件首次渲染时执行
  useEffect(() => {

    // 防止组件卸载后继续更新 state
    let ignore = false;

    // 加载通知数据
    async function loadNotificationsData() {
      try {

        // 开始加载
        setLoading(true);

        // 清空旧错误
        setError(null);

        // =========================
        // 接口方法
        // =========================
        // 调用 API 获取通知数据
        const notificationsData = await getNotificationsData();

        // 如果组件没有被卸载
        if (!ignore) {

          // 保存数据到 state
          setData(notificationsData);
        }
      } catch (err) {

        // 捕获接口错误
        if (!ignore) {
          setError(err);
        }
      } finally {

        // 结束 loading
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    // 执行数据加载
    loadNotificationsData();

    // cleanup 函数
    // 组件卸载时执行
    return () => {
      ignore = true;
    };
  }, []);

  // 获取即将到期计划
  // 如果 data 为空则返回空数组
  const expiringPlans = data?.expiringPlans ?? [];

  // 判断是否为空状态
  const empty =
    !loading &&
    !error &&
    expiringPlans.length === 0;

  // 确认通知方法
  const acknowledgePlan = async (planId) => {

    // =========================
    // 接口方法
    // =========================
    // 调用 API 更新通知状态
    await acknowledgeNotification(planId);

    // 前端同步更新页面数据
    // 把已经确认的计划从列表移除
    setData((currentData) => ({
      ...currentData,

      expiringPlans:
        currentData.expiringPlans.filter(
          (plan) => plan.id !== planId
        ),
    }));
  };

  // 返回页面需要使用的数据与方法
  return {
    data,
    expiringPlans,
    loading,
    error,
    empty,
    acknowledgePlan,
  };
}