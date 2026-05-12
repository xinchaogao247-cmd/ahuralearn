import styles from "./TaskCard.module.css";

const cx = (...names) => names.map((name) => styles[name]).filter(Boolean).join(" ");

export default function TaskCard({ task }) {
  return (
    <div className={cx("taskItem", task.active && "active", task.finished && "finished")}>
      <div className={styles.taskLeft}>
        <div className={cx("taskCheck", task.done && "done")}></div>

        <div>
          <h3>{task.title}</h3>

          {task.tags ? (
            <div className={styles.taskTags}>
              {task.tags.map((tag) => (
                <span key={tag.label} className={styles[tag.className]}>
                  {tag.label}
                </span>
              ))}
            </div>
          ) : (
            <p>{task.subtitle}</p>
          )}
        </div>
      </div>

      <span className={task.active ? styles.dueText : styles.taskGray}>
        {task.dueText}
      </span>
    </div>
  );
}
