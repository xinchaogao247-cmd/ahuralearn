import { Check } from "lucide-react";
import ProgressBar from "../ProgressBar";

import styles from "./GoalItem.module.css";

export default function GoalItem({ goal }) {
  const progress =
    goal.total > 0 ? Math.round((goal.current / goal.total) * 100) : 0;
  const showProgress = !goal.achieved && progress > 0;

  return (
    <div className={`${styles.goalItem} ${showProgress ? styles.active : ""} ${progress === 0 ? styles.muted : ""}`}>
      <div className={`${styles.checkBox} ${goal.achieved ? styles.achieved : ""}`}>
        {goal.achieved ? <Check size={16} strokeWidth={3} /> : null}
      </div>

      <div className={styles.goalHeader}>
        <div>
          <h3>{goal.title}</h3>
          {goal.achieved ? <span>ACHIEVED {goal.achievedDay}</span> : null}
        </div>

        {showProgress ? <ProgressBar progress={progress} /> : null}
      </div>
    </div>
  );
}
