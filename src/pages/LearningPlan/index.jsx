import LearningSummary from "./components/LearningSummary";
import StudyStats from "./components/StudyStats";
import MainLayout from "../../layouts/MainLayout";
import { useLearningProgress } from "../../shared/progress/hooks/useLearningProgress";
import { useLearningPlan } from "./hooks/useLearningPlan";
import styles from "./LearningPlan.module.css";

export default function LearningPlan() {
  const {
    data: learningPlanData,
    loading: learningPlanLoading,
    error: learningPlanError,
    empty: learningPlanEmpty,
  } = useLearningPlan();
  const {
    progress,
    loading: progressLoading,
    error: progressError,
  } = useLearningProgress();

  const loading = learningPlanLoading || progressLoading;
  const error = learningPlanError || progressError;
  const empty = learningPlanEmpty || !progress;

  if (loading) {
    return (
      <MainLayout>
        <main className={styles.learningPage}>Loading...</main>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <main className={styles.learningPage}>Failed to load data</main>
      </MainLayout>
    );
  }

  if (empty) {
    return (
      <MainLayout>
        <main className={styles.learningPage}>No learning tasks found</main>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className={styles.learningPage}>
        <LearningSummary progress={progress} />
        <StudyStats planner={learningPlanData.planner} />
      </main>
    </MainLayout>
  );
}
