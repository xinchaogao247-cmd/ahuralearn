import AchievementStats from "../AchievementStats";
import ProgressBar from "../ProgressBar";
import TrophyCard from "../TrophyCard";
import styles from "./AchievementSummary.module.css";

export default function AchievementSummary({ summary, trophy }) {
  const stats = [
    {
      label: "TOTAL ACHIEVEMENTS",
      value: summary.totalAchievements,
    },
    {
      label: "CERTIFICATES EARNED",
      value: summary.certificatesEarned,
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
              Certification Progress: <span>{summary.certificationName}</span>
            </p>
            <strong>{summary.progress}%</strong>
          </div>

          <ProgressBar progress={summary.progress} variant="summary" />
        </div>

        <TrophyCard trophy={trophy} />
      </div>
    </section>
  );
}
