import { Check } from "lucide-react";
import ProgressBar from "../ProgressBar";

import styles from "./GoalItem.module.css";

export default function GoalItem({ goal }) {
  const showProgress = !goal.achieved && goal.progress > 0;

  return (
    <div className={`${styles.goalItem} ${showProgress ? styles.active : ""} ${goal.progress === 0 ? styles.muted : ""}`}>
      <div className={`${styles.checkBox} ${goal.achieved ? styles.achieved : ""}`}>
        {goal.achieved ? <Check size={16} strokeWidth={3} /> : null}
      </div>

      <div className={styles.goalHeader}>
        <div>
          <h3>{goal.title}</h3>
          {goal.achieved ? <span>ACHIEVED {goal.achievedDate}</span> : null}
        </div>

        {showProgress ? <ProgressBar progress={goal.progress} /> : null}
      </div>
    </div>
  );
}
