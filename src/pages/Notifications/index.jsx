import ExpiringPlanCard from "./components/ExpiringPlanCard";
import MainLayout from "../../layouts/MainLayout";
import { useNotifications } from "./hooks/useNotifications";
import styles from "./Notifications.module.css";

export default function Notifications() {
  const { acknowledgePlan, expiringPlans, loading, error, empty } =
    useNotifications();

  if (loading) {
    return (
      <MainLayout>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          Loading notifications...
        </main>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          Failed to load notifications
        </main>
      </MainLayout>
    );
  }

  if (empty) {
    return (
      <MainLayout>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          No expiring study plans
        </main>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
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
              plan={plan}
            />
          ))}
        </section>
      </main>
    </MainLayout>
  );
}
