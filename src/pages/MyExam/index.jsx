import styles from "./MyExam.module.css";

import { useMyExam } from "./hooks/useMyExam";

import ExamResultCard from "./components/ExamResultCard";
import SubjectBreakdown from "./components/SubjectBreakdown";
import RecentExams from "./components/RecentExams";

export default function MyExam() {
  const { data, loading, error, empty } = useMyExam();

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.status}>Failed to load exam data.</div>;
  }

  if (empty) {
    return <div className={styles.status}>No exam data found.</div>;
  }

  return (
    <main className={styles.myExamPage}>
      <ExamResultCard result={data.result} />

      <section className={styles.examGrid}>
        <SubjectBreakdown subjects={data.subjects} />
        <RecentExams exams={data.recentExams} />
      </section>
    </main>
  );
}