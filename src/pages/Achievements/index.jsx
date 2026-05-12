import AchievementSummary from "./components/AchievementSummary";
import WeeklyGoals from "./components/WeeklyGoals";
import { useAchievements } from "./hooks/useAchievements";
import styles from "./Achievements.module.css";

function Achievements() {
  const { data, loading, error, empty } = useAchievements();

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
      <WeeklyGoals goals={data.weeklyGoals} />
    </main>
  );
}

export default Achievements;
