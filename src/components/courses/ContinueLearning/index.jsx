import { useEffect, useMemo, useState } from "react";

import CourseCard from "../CourseCard";
import styles from "./ContinueLearning.module.css";

const COURSES_PER_PAGE = 6;

export default function ContinueLearning({ courses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(courses.length / COURSES_PER_PAGE);
  const showPagination = totalPages > 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [courses]);

  const visibleCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;

    return courses.slice(startIndex, startIndex + COURSES_PER_PAGE);
  }, [courses, currentPage]);

  if (courses.length === 0) {
    return <section className={styles.grid}>No courses found</section>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {showPagination && (
        <div className={styles.pagination} aria-label="Course pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                type="button"
                className={page === currentPage ? styles.activePage : ""}
                key={page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
