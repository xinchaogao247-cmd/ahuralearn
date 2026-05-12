import CourseCard from "../CourseCard";
import styles from "./ContinueLearning.module.css";

export default function ContinueLearning({ courses }) {
  if (courses.length === 0) {
    return <section className={styles.grid}>No courses found</section>;
  }

  return (
    <section className={styles.grid}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  );
}
