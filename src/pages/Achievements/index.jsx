import AchievementSummary from "./components/AchievementSummary";
import WeeklyGoals from "./components/WeeklyGoals";
import { addWeeklyGoal } from "../../shared/goals/api/weeklyGoalsApi";
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
    achievedGoals,
    loading: goalsLoading,
    error: goalsError,
  } = useWeeklyGoals();

  const loading = achievementsLoading || goalsLoading;
  const error = achievementsError || goalsError;
  const empty = achievementsEmpty && achievedGoals.length === 0;

  if (loading) {
    return <main className={styles.achievementsPage}>Loading achievements...</main>;
  }

  if (error) {
    return <main className={styles.achievementsPage}>Failed to load achievements</main>;
  }

  if (empty) {
    return <main className={styles.achievementsPage}>No achievements yet</main>;
  }

  return (
    <main className={styles.achievementsPage}>
      <AchievementSummary summary={data.summary} trophy={data.trophy} />
      <WeeklyGoals goals={achievedGoals} onAddGoal={addWeeklyGoal} />
    </main>
  );
}

export default Achievements;
