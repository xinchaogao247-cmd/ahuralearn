import ExpiringPlanCard from "../../components/notifications/ExpiringPlanCard";
import PageShell from "../../components/common/PageShell";
import { useNotifications } from "./hooks/useNotifications";
import styles from "./Notifications.module.css";

// Notifications 页面组件
export default function Notifications() {

  // 从自定义 Hook 获取通知相关数据
  const {
    acknowledgePlan, // 确认通知的方法
    expiringPlans,   // 即将到期的学习计划数组
    loading,         // 是否正在加载
    error,           // 是否发生错误
    empty,           // 是否为空数据
  } = useNotifications();

  // =========================
  // 加载状态
  // =========================
  if (loading) {
    return (
      <PageShell>

        {/* 页面主体 */}
        <main
          className={`${styles.notificationsPage} ${styles.pageStatus}`}
        >
          Loading notifications...
        </main>

      </PageShell>
    );
  }

  // =========================
  // 错误状态
  // =========================
  if (error) {
    return (
      <PageShell>

        {/* 页面主体 */}
        <main
          className={`${styles.notificationsPage} ${styles.pageStatus}`}
        >
          Failed to load notifications
        </main>

      </PageShell>
    );
  }

  // =========================
  // 空数据状态
  // =========================
  if (empty) {
    return (
      <PageShell>

        {/* 页面主体 */}
        <main
          className={`${styles.notificationsPage} ${styles.pageStatus}`}
        >
          No expiring study plans
        </main>

      </PageShell>
    );
  }

  // =========================
  // 正常页面内容
  // =========================
  return (
    <PageShell>

      {/* 页面主区域 */}
      <main className={styles.notificationsPage}>

        {/* 页面顶部标题区域 */}
        <section className={styles.header}>

          <div>

            {/* 页面标题 */}
            <h1>Notifications</h1>

            {/* 页面说明 */}
            <p>
              Study plans that are getting close to their deadline.
            </p>
          </div>

          {/* 即将到期计划数量 */}
          <span>
            {expiringPlans.length} expiring
          </span>
        </section>

        {/* 学习计划列表 */}
        <section className={styles.planList}>

          {/* 遍历所有即将到期的计划 */}
          {expiringPlans.map((plan) => (

            <ExpiringPlanCard
              key={plan.id} // React 列表唯一 key

              // 点击 Got it 时触发的方法
              onAcknowledge={acknowledgePlan}

              // 当前计划数据
              plan={plan}
            />
          ))}
        </section>
      </main>
    </PageShell>
  );
}