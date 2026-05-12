import PlanHeader from "../PlanHeader";
import TaskCard from "../TaskCard";
import styles from "./StudyStats.module.css";

export default function StudyStats({ planner }) {
  return (
    <div className={styles.card}>
      <PlanHeader title={planner.title} actions={planner.actions} />

      <div className={styles.taskList}>
        {planner.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
