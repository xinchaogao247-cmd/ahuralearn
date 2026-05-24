import { useEffect, useState } from "react";

import { getAchievementsData } from "../../../api/user/achievementsApi";

/**
 * useAchievements 自定义 Hook
 *
 * 用于：
 * - 获取 Achievements 页面数据
 * - 管理 loading 状态
 * - 管理 error 状态
 * - 判断页面是否为空状态
 *
 * 页面组件可以通过：
 * const { data, loading, error, empty } = useAchievements();
 *
 * 获取对应状态与数据。
 */
export function useAchievements() {

  /**
   * data:
   * 保存 Achievements 页面数据。
   *
   * 初始值：
   * null
   */
  const [data, setData] = useState(null);

  /**
   * loading:
   * 表示当前是否正在加载数据。
   *
   * true:
   * 正在请求数据。
   *
   * false:
   * 数据加载完成。
   */
  const [loading, setLoading] = useState(true);

  /**
   * error:
   * 保存请求错误信息。
   *
   * 初始值：
   * null
   */
  const [error, setError] = useState(null);

  /**
   * useEffect:
   * 页面首次加载时自动执行。
   *
   * []:
   * 空依赖数组，
   * 表示只在组件首次渲染时执行一次。
   */
  useEffect(() => {

    /**
     * ignore:
     * 用于防止组件卸载后，
     * 仍然更新 React 状态。
     *
     * 避免：
     * "Can't perform a React state update on an unmounted component"
     * 警告。
     */
    let ignore = false;

    /**
     * 加载 Achievements 页面数据。
     */
    async function loadAchievementsData() {

      try {

        /**
         * 开始请求数据时：
         * 设置 loading 为 true。
         */
        setLoading(true);

        /**
         * 每次重新请求时：
         * 清空之前的错误状态。
         */
        setError(null);

        /**
         * 调用 API 获取成就页面数据。
         *
         * 当前：
         * 使用 mock 数据或本地模拟 API。
         *
         * 后期：
         * 可以直接连接真实后端接口。
         */
        const achievementsData =
          await getAchievementsData();

        /**
         * 如果组件仍然存在：
         * 更新 data 状态。
         */
        if (!ignore) {
          setData(achievementsData);
        }

      } catch (err) {

        /**
         * 如果请求失败：
         * 保存错误信息。
         */
        if (!ignore) {
          setError(err);
        }

      } finally {

        /**
         * 无论成功还是失败：
         * 最终都结束 loading 状态。
         */
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    /**
     * 执行数据加载函数。
     */
    loadAchievementsData();

    /**
     * cleanup function:
     * 组件卸载时执行。
     *
     * 将 ignore 设置为 true，
     * 防止异步请求完成后继续更新状态。
     */
    return () => {
      ignore = true;
    };

  }, []);

  /**
   * 判断页面是否为空状态。
   *
   * 满足以下条件时：
   * empty = true
   *
   * 1. 当前不在 loading
   * 2. 当前没有 error
   * 3. data 不存在
   *    或
   *    totalAchievements 为 0
   */
  const empty =
    !loading &&
    !error &&
    (
      !data ||
      !data.summary ||
      (data.summary.totalAchievements ?? 0) === 0
    );

  /**
   * 返回 Hook 状态与数据。
   *
   * data:
   * 页面数据。
   *
   * loading:
   * 加载状态。
   *
   * error:
   * 错误状态。
   *
   * empty:
   * 页面是否为空。
   */
  return {
    data,
    loading,
    error,
    empty,
  };
}
