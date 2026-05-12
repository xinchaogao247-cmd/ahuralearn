import styles from "./PlanHeader.module.css";

export default function PlanHeader({ title, actions }) {
  return (
    <div className={styles.header}>
      <h2>{title}</h2>

      <div className={styles.actions}>
        <button className={styles.manualBtn}>{actions[0]}</button>

        <button className={styles.aiBtn}>{actions[1]}</button>
      </div>
    </div>
  );
}
