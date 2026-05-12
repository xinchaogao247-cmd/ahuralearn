import styles from "./CourseStats.module.css";

export default function CourseStats({ categories, goal }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarCard}>
        <h3>Course Categories</h3>

        {categories.map((category) => (
          <div key={category.id} className={styles.categoryItem}>
            <img src={category.icon} alt="" className={styles.categoryIcon} />
            <span>{category.title}</span>
            <span>{category.count}</span>
          </div>
        ))}
      </div>

      <div className={styles.goalCard}>
        <div className={styles.goalTop}>
          <img src={goal.icon} alt="" className={styles.goalImage} />
          <p className={styles.goalLabel}>{goal.label}</p>
        </div>

        <h4>{goal.title}</h4>

        <div className={styles.goalLine}>
          <div className={styles.goalFill}></div>
        </div>

        <span>{goal.progress}</span>
      </div>
    </aside>
  );
}
