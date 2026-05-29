import ExpiringPlanCard from "../../components/notifications/ExpiringPlanCard";
import PageShell from "../../components/common/PageShell";
import { useNotifications } from "./hooks/useNotifications";
import styles from "./Notifications.module.css";

export default function Notifications() {
  const {
    acknowledgePlan,
    deletePlan,
    empty,
    error,
    expiringPlans,
    loading,
  } = useNotifications();

  if (loading) {
    return (
      <PageShell>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          Loading notifications...
        </main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          Failed to load notifications
        </main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          No expiring study plans
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className={styles.notificationsPage}>
        <section className={styles.header}>
          <div>
            <h1>Notifications</h1>
            <p>Study plans that are getting close to their deadline.</p>
          </div>

          <span>{expiringPlans.length} expiring</span>
        </section>

        <section className={styles.planList}>
          {expiringPlans.map((plan) => (
            <ExpiringPlanCard
              key={plan.id}
              onAcknowledge={acknowledgePlan}
              onDelete={deletePlan}
              plan={plan}
            />
          ))}
        </section>
      </main>
    </PageShell>
  );
}
