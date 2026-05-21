import AchievementSummary from "./components/AchievementSummary";
import WeeklyGoals from "./components/WeeklyGoals";
import MainLayout from "../../layouts/MainLayout";
import { useWeeklyGoals } from "../../shared/goals/hooks/useWeeklyGoals";
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
      <MainLayout>
        <main className={styles.achievementsPage}>Loading achievements...</main>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <main className={styles.achievementsPage}>Failed to load achievements</main>
      </MainLayout>
    );
  }

  if (empty) {
    return (
      <MainLayout>
        <main className={styles.achievementsPage}>No achievements yet</main>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className={styles.achievementsPage}>
        <AchievementSummary summary={data.summary} trophy={data.trophy} />
        <WeeklyGoals
          goals={goals}
          onAddGoal={addGoal}
          onDeleteGoal={deleteGoal}
        />
      </main>
    </MainLayout>
  );
}

export default Achievements;
