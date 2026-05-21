import { useMemo, useState } from "react";

import ContinueLearning from "./components/ContinueLearning";
import CourseHeader from "./components/CourseHeader";
import CourseStats from "./components/CourseStats";
import MainLayout from "../../layouts/MainLayout";
import { useWeeklyGoals } from "../../shared/goals/hooks/useWeeklyGoals";
import { useCourses } from "./hooks/useCourses";
import styles from "./Courses.module.css";

export default function Courses() {
  const {
    data: coursesData,
    loading: coursesLoading,
    error: coursesError,
    empty,
  } = useCourses();
  const {
    activeGoals,
    loading: goalsLoading,
    error: goalsError,
    deleteGoal,
  } = useWeeklyGoals();
  const [activeFilter, setActiveFilter] = useState("All");
  const loading = coursesLoading || goalsLoading;
  const error = coursesError || goalsError;

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
    return (
      <MainLayout>
        <main className={styles.coursesPage}>Loading...</main>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <main className={styles.coursesPage}>Failed to load data</main>
      </MainLayout>
    );
  }

  if (empty) {
    return (
      <MainLayout>
        <main className={styles.coursesPage}>No courses found</main>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className={styles.coursesPage}>
        <CourseHeader
          summary={coursesData.summary}
          filters={coursesData.filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className={styles.coursesLayout}>
          <ContinueLearning courses={filteredCourses} />
          <CourseStats
            categories={coursesData.categories}
            goal={coursesData.goal}
            goals={activeGoals}
            onDeleteGoal={deleteGoal}
          />
        </div>
      </main>
    </MainLayout>
  );
}
