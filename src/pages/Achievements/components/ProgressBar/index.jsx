import styles from "./ProgressBar.module.css";

export default function ProgressBar({ progress, variant = "goal" }) {
  return (
    <div className={`${styles.progressTrack} ${styles[variant]}`}>
      <div className={styles.progressFill} style={{ width: `${progress}%` }} />
    </div>
  );
}
