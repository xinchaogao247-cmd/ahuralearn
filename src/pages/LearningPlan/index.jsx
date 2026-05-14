import LearningSummary from "./components/LearningSummary";
import StudyStats from "./components/StudyStats";
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
    return <main className={styles.learningPage}>Loading...</main>;
  }

  if (error) {
    return <main className={styles.learningPage}>Failed to load data</main>;
  }

  if (empty) {
    return <main className={styles.learningPage}>No learning tasks found</main>;
  }

  return (
    <main className={styles.learningPage}>
      <LearningSummary progress={progress} />
      <StudyStats planner={learningPlanData.planner} />
    </main>
  );
}
