import AchievementSummary from "../../components/achievements/AchievementSummary";
import WeeklyGoals from "../../components/achievements/WeeklyGoals";
import PageShell from "../../components/common/PageShell";
import { useWeeklyGoals } from "../../shared/goals/goalsApi";
import { useAchievements } from "./hooks/useAchievements";
import styles from "./Achievements.module.css";

function Achievements() {
  const {
    data,
    loading: achievementsLoading,
    error: achievementsError,
    empty: achievementsEmpty,
  } = useAchievements();
  const {
    goals,
    achievedGoals,
    loading: goalsLoading,
    error: goalsError,
    addGoal,
    deleteGoal,
  } = useWeeklyGoals();

  const loading = achievementsLoading || goalsLoading;
  const error = achievementsError || goalsError;
  const empty = achievementsEmpty && achievedGoals.length === 0;

  if (loading) {
    return (
      <PageShell>
        <main className={styles.achievementsPage}>Loading achievements...</main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <main className={styles.achievementsPage}>Failed to load achievements</main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell>
        <main className={styles.achievementsPage}>No achievements yet</main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className={styles.achievementsPage}>
        <AchievementSummary summary={data.summary} trophy={data.trophy} />
        <WeeklyGoals
          goals={goals}
          onAddGoal={addGoal}
          onDeleteGoal={deleteGoal}
        />
      </main>
    </PageShell>
  );
}

export default Achievements;
