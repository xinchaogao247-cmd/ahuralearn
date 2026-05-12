import { Plus } from "lucide-react";
import GoalItem from "../GoalItem";

import styles from "./WeeklyGoals.module.css";

export default function WeeklyGoals({ goals }) {
  return (
    <section className={styles.weeklyGoals}>
      <div className={styles.header}>
        <h2>Weekly Goals</h2>
        <button type="button" aria-label="Add weekly goal">
          <Plus size={22} strokeWidth={2.3} />
        </button>
      </div>

      <div className={styles.goalList}>
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
    </section>
  );
}
