import DashboardStats from "../../components/dashboard/DashboardStats";
import LearningCard from "../../components/dashboard/LearningCard";
import PageShell from "../../components/common/PageShell";
import { useLearningProgress } from "../../shared/progress/progressApi";
import { useDashboard } from "./hooks/useDashboard";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
    empty: dashboardEmpty,
  } = useDashboard();
  const {
    progress,
    loading: progressLoading,
    error: progressError,
  } = useLearningProgress();

  const loading = dashboardLoading || progressLoading;
  const error = dashboardError || progressError;
  const empty = dashboardEmpty || !progress;

  if (loading) {
    return (
      <PageShell>
        <main className={styles.dashboard}>Loading...</main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <main className={styles.dashboard}>Failed to load data</main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell>
        <main className={styles.dashboard}>No dashboard data found</main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className={styles.dashboard}>
        <section className={styles.leftSection}>
          <LearningCard progress={progress} />
        </section>

        <section className={styles.rightSection}>
          <DashboardStats
            courses={dashboardData.ongoingCourses}
            stats={dashboardData.achievementStats}
          />
        </section>
      </main>
    </PageShell>
  );
}
