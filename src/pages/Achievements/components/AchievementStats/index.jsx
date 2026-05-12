import { Flame } from "lucide-react";
import styles from "./AchievementStats.module.css";

export default function AchievementStats({ stats }) {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.statCard}>
          <p>{stat.label}</p>
          <h2 className={stat.accent ? styles.accentValue : undefined}>
            {stat.value}
            {stat.icon === "flame" ? <Flame size={22} strokeWidth={2.6} /> : null}
          </h2>
        </div>
      ))}
    </div>
  );
}
