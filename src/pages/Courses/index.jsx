import { useMemo, useState } from "react";

import ContinueLearning from "./components/ContinueLearning";
import CourseHeader from "./components/CourseHeader";
import CourseStats from "./components/CourseStats";
import { useCourses } from "./hooks/useCourses";
import styles from "./Courses.module.css";

export default function Courses() {
  const { data: coursesData, loading, error, empty } = useCourses();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCourses = useMemo(() => {
    if (!coursesData) {
      return [];
    }

    if (activeFilter === "All") {
      return coursesData.courses;
    }

    return coursesData.courses.filter(
      (course) => course.status.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, coursesData]);

  if (loading) {
    return <main className={styles.coursesPage}>Loading...</main>;
  }

  if (error) {
    return <main className={styles.coursesPage}>Failed to load data</main>;
  }

  if (empty) {
    return <main className={styles.coursesPage}>No courses found</main>;
  }

  return (
    <main className={styles.coursesPage}>
      <CourseHeader
        summary={coursesData.summary}
        filters={coursesData.filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className={styles.coursesLayout}>
        <ContinueLearning courses={filteredCourses} />
        <CourseStats categories={coursesData.categories} goal={coursesData.goal} />
      </div>
    </main>
  );
}
