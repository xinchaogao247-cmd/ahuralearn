import styles from "./AchievementStats.module.css";

export default function AchievementStats({ stats }) {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.statCard}>
          <p>{stat.label}</p>
          <h2>{stat.value}</h2>
        </div>
      ))}
    </div>
  );
}
