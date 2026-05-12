import AchievementStats from "../AchievementStats";
import ProgressBar from "../ProgressBar";
import TrophyCard from "../TrophyCard";
import styles from "./AchievementSummary.module.css";

export default function AchievementSummary({ summary, trophy }) {
  const stats = [
    {
      label: "TOTAL BADGES",
      value: summary.totalBadges,
    },
    {
      label: "CURRENT STREAK",
      value: summary.currentStreak,
      accent: true,
      icon: "flame",
    },
    {
      label: "GLOBAL RANK",
      value: summary.globalRank,
    },
  ];

  return (
    <section className={styles.summaryCard}>
      <div className={styles.summaryContent}>
        <div className={styles.summaryLeft}>
          <h1>My Achievements Summary</h1>
          <p className={styles.lead}>
            Your learning journey is reaching new heights. Keep up the momentum!
          </p>

          <AchievementStats stats={stats} />

          <div className={styles.milestoneRow}>
            <p>
              Next Milestone: <span>{summary.nextMilestone}</span>
            </p>
            <strong>{summary.progress}%</strong>
          </div>

          <ProgressBar progress={summary.progress} variant="summary" />

          <p className={styles.xpText}>
            {summary.currentXP}/{summary.targetXP} XP to reach Level {summary.level}
          </p>
        </div>

        <TrophyCard trophy={trophy} />
      </div>
    </section>
  );
}
