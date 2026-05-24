import AchievementSummary from "../../components/achievements/AchievementSummary";
import WeeklyGoals from "../../components/achievements/WeeklyGoals";

import PageShell from "../../components/common/PageShell";

import { useWeeklyGoals } from "../../shared/goals/goalsApi";
import { useAchievements } from "./hooks/useAchievements";

import styles from "./Achievements.module.css";

/**
 * Achievements 页面
 *
 * 用于展示：
 * - 用户学习成就概览
 * - Weekly Goals
 * - 已完成目标
 * - 成就统计信息
 *
 * 页面结构：
 * PageShell
 * ├─ AchievementSummary
 * └─ WeeklyGoals
 */
function Achievements() {

  /**
   * useAchievements:
   * 获取成就页面 summary 数据。
   *
   * 包含：
   * - data
   * - loading
   * - error
   * - empty
   */
  const {
    data,

    /**
     * achievementsLoading:
     * 成就 summary 是否正在加载。
     */
    loading: achievementsLoading,

    /**
     * achievementsError:
     * 成就 summary 请求错误状态。
     */
    error: achievementsError,

    /**
     * achievementsEmpty:
     * 成就 summary 是否为空。
     */
    empty: achievementsEmpty,

  } = useAchievements();

  /**
   * useWeeklyGoals:
   * 获取共享 Weekly Goals 数据。
   *
   * goals:
   * 当前目标列表。
   *
   * achievedGoals:
   * 已完成目标列表。
   *
   * addGoal:
   * 添加目标方法。
   *
   * deleteGoal:
   * 删除目标方法。
   */
  const {
    goals,
    achievedGoals,

    /**
     * goalsLoading:
     * Weekly Goals 是否正在加载。
     */
    loading: goalsLoading,

    /**
     * goalsError:
     * Weekly Goals 请求错误状态。
     */
    error: goalsError,

    /**
     * addGoal:
     * 添加新的 Weekly Goal。
     */
    addGoal,

    /**
     * deleteGoal:
     * 删除 Weekly Goal。
     */
    deleteGoal,

  } = useWeeklyGoals();

  /**
   * 合并页面 loading 状态。
   *
   * 只要：
   * - achievements 正在加载
   * 或
   * - goals 正在加载
   *
   * 页面就保持 loading。
   */
  const loading =
    achievementsLoading || goalsLoading;

  /**
   * 合并页面 error 状态。
   *
   * 任意一个模块请求失败：
   * 页面都会进入 error 状态。
   */
  const error =
    achievementsError || goalsError;

  /**
   * 页面空状态判断。
   *
   * 满足以下条件时：
   * empty = true
   *
   * 1. 成就 summary 为空
   * 2. 本周没有已完成目标
   */
  const empty =
    achievementsEmpty &&
    achievedGoals.length === 0;

  /**
   * ==============================
   * Loading 状态页面
   * ==============================
   */
  if (loading) {
    return (
      <PageShell>

        <main className={styles.achievementsPage}>
          Loading achievements...
        </main>

      </PageShell>
    );
  }

  /**
   * ==============================
   * Error 状态页面
   * ==============================
   */
  if (error) {
    return (
      <PageShell>

        <main className={styles.achievementsPage}>
          Failed to load achievements
        </main>

      </PageShell>
    );
  }

  /**
   * ==============================
   * Empty 状态页面
   * ==============================
   */
  if (empty) {
    return (
      <PageShell>

        <main className={styles.achievementsPage}>
          No achievements yet
        </main>

      </PageShell>
    );
  }

  /**
   * ==============================
   * 正常页面内容
   * ==============================
   */
  return (
    <PageShell>

      <main className={styles.achievementsPage}>

        {/**
         * AchievementSummary:
         * 成就概览组件。
         *
         * summary:
         * 成就统计数据。
         *
         * trophy:
         * 奖杯 / 成就图标数据。
         */}
        <AchievementSummary
          summary={data.summary}
          trophy={data.trophy}
        />

        {/**
         * WeeklyGoals:
         * Weekly Goals 组件。
         *
         * goals:
         * 当前目标数据。
         *
         * onAddGoal:
         * 添加目标方法。
         *
         * onDeleteGoal:
         * 删除目标方法。
         */}
        <WeeklyGoals
          goals={goals}
          onAddGoal={addGoal}
          onDeleteGoal={deleteGoal}
        />

      </main>
    </PageShell>
  );
}

/**
 * 导出 Achievements 页面组件。
 */
export default Achievements;