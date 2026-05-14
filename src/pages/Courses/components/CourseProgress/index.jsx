import styles from "./CourseProgress.module.css";

const cx = (...names) => names.map((name) => styles[name]).filter(Boolean).join(" ");

export default function CourseProgress({ progress, progressClass }) {
  return (
    <div className={`${styles.progress} course-progress`}>
      <div className={`${styles.line} progress-line`}>
        <div
          className={`${cx("fill", progressClass)} progress-fill ${progressClass || ""}`}
          style={{ "--progress-target": `${progress}%` }}
        ></div>
      </div>
      <span>{progress}%</span>
    </div>
  );
}
