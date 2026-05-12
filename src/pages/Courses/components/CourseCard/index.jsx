import CourseProgress from "../CourseProgress";
import styles from "./CourseCard.module.css";

const cx = (...names) => names.map((name) => styles[name]).filter(Boolean).join(" ");

export default function CourseCard({ course }) {
  return (
    <div className={`${styles.card} course-card-large`}>
      <div
        className={`${styles.image} course-image`}
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <div className={`${cx("badge", course.badgeClass)} course-badge ${course.badgeClass || ""}`}>
          {course.status}
        </div>
      </div>

      <div className={`${styles.content} course-content`}>
        <h3>{course.title}</h3>
        <p>{course.instructor}</p>

        <div className={`${styles.metaRow} course-meta-row`}>
          <div className={`${styles.meta} course-meta`}>
            <span>{course.rating}</span>
            <span>{course.reviews}</span>
          </div>

          <div className={`${styles.actionIcon} course-action-icon`}>
            <img src={course.actionIcon} alt="" className={`${styles.gameIcon} game-icon`} />
          </div>
        </div>

        <CourseProgress progress={course.progress} progressClass={course.progressClass} />
      </div>
    </div>
  );
}
