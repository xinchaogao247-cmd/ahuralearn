import styles from "./MyExam.module.css";

import MainLayout from "../../layouts/MainLayout";
import { useMyExam } from "./hooks/useMyExam";

import ExamResultCard from "./components/ExamResultCard";
import SubjectBreakdown from "./components/SubjectBreakdown";
import RecentExams from "./components/RecentExams";

export default function MyExam() {
  const { data, loading, error, empty } = useMyExam();

  if (loading) {
    return (
      <MainLayout>
        <main className={`${styles.myExamPage} ${styles.pageStatus}`}>
          Loading...
        </main>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <main className={`${styles.myExamPage} ${styles.pageStatus}`}>
          Failed to load exam data.
        </main>
      </MainLayout>
    );
  }

  if (empty) {
    return (
      <MainLayout>
        <main className={`${styles.myExamPage} ${styles.pageStatus}`}>
          No exam data found.
        </main>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className={styles.myExamPage}>
        <ExamResultCard result={data.result} />

        <section className={styles.examGrid}>
          <SubjectBreakdown subjects={data.subjects} />
          <RecentExams exams={data.recentExams} />
        </section>
      </main>
    </MainLayout>
  );
}
