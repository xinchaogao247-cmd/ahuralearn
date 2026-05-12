import LearningSummary from "./components/LearningSummary";
import StudyStats from "./components/StudyStats";
import { useLearningPlan } from "./hooks/useLearningPlan";
import styles from "./LearningPlan.module.css";

export default function LearningPlan() {
  const { data: learningPlanData, loading, error, empty } = useLearningPlan();

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
      <LearningSummary progress={learningPlanData.progress} />
      <StudyStats planner={learningPlanData.planner} />
    </main>
  );
}
