import { Check, Trash2 } from "lucide-react";
import ProgressBar from "../ProgressBar";

import styles from "./GoalItem.module.css";

export default function GoalItem({ goal, onComplete, onDelete, onIncrement }) {
  const progress =
    goal.total > 0 ? Math.round((goal.current / goal.total) * 100) : 0;
  const isAchieved = goal.achieved || progress >= 100;
  const showProgress = !isAchieved && progress > 0;

  return (
    <div
      className={`${styles.goalItem} ${showProgress ? styles.active : ""} ${
        progress === 0 ? styles.muted : ""
      }`}
    >
      <button
        className={`${styles.checkBox} ${isAchieved ? styles.achieved : ""}`}
        type="button"
        aria-label={isAchieved ? "Goal achieved" : "Complete goal"}
        disabled={isAchieved}
        onClick={() => onComplete(goal.id)}
      >
        {isAchieved ? <Check size={16} strokeWidth={3} /> : null}
      </button>

      <div className={styles.goalHeader}>
        <div className={styles.titleRow}>
          <div>
            <h3>{goal.title}</h3>
            <div className={styles.metaRow}>
              <span>{goal.type || "Learning"}</span>
              <span>{isAchieved ? `Achieved ${goal.achievedDay}` : `Due ${goal.dueDay}`}</span>
              <span>
                {goal.current}/{goal.total}
              </span>
            </div>
          </div>

          <div className={styles.goalActions}>
            {!isAchieved && (
              <>
                <button type="button" onClick={() => onIncrement(goal.id)}>
                  +1
                </button>
                <button type="button" onClick={() => onComplete(goal.id)}>
                  Complete
                </button>
              </>
            )}
            <button type="button" onClick={() => onDelete(goal.id)}>
              <Trash2 size={15} strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className={styles.progressRow}>
          <ProgressBar progress={progress} />
          <strong>{progress}%</strong>
        </div>
      </div>
    </div>
  );
}
