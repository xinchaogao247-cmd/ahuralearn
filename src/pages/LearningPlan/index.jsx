import LearningSummary from "../../components/learningPlan/LearningSummary";
import StudyStats from "../../components/learningPlan/StudyStats";
import PageShell from "../../components/common/PageShell";
import { useLearningProgress } from "../../shared/progress/progressApi";
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
      <PageShell>
        <main className={styles.learningPage}>Loading...</main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <main className={styles.learningPage}>Failed to load data</main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell>
        <main className={styles.learningPage}>No learning tasks found</main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className={styles.learningPage}>
        <LearningSummary progress={progress} />
        <StudyStats planner={learningPlanData.planner} />
      </main>
    </PageShell>
  );
}
