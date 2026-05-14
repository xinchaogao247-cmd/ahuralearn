import DashboardStats from "./components/DashboardStats";
import LearningCard from "./components/LearningCard";
import { useLearningProgress } from "../../shared/progress/hooks/useLearningProgress";
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
    return <main className={styles.dashboard}>Loading...</main>;
  }

  if (error) {
    return <main className={styles.dashboard}>Failed to load data</main>;
  }

  if (empty) {
    return <main className={styles.dashboard}>No dashboard data found</main>;
  }

  return (
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
  );
}
