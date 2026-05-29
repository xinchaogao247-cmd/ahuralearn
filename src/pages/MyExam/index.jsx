import styles from "./MyExam.module.css";

import PageShell from "../../components/profileLayout/PageShell";
import { useMyExam } from "./hooks/useMyExam";

import ExamResultCard from "../../components/myExam/ExamResultCard";
import SubjectBreakdown from "../../components/myExam/SubjectBreakdown";
import RecentExams from "../../components/myExam/RecentExams";

export default function MyExam() {
  const { data, loading, error, empty } = useMyExam();

  if (loading) {
    return (
      <PageShell>
        <main className={`${styles.myExamPage} ${styles.pageStatus}`}>
          Loading...
        </main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <main className={`${styles.myExamPage} ${styles.pageStatus}`}>
          Failed to load exam data.
        </main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell>
        <main className={`${styles.myExamPage} ${styles.pageStatus}`}>
          No exam data found.
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className={styles.myExamPage}>
        <ExamResultCard result={data.result} />

        <section className={styles.examGrid}>
          <SubjectBreakdown subjects={data.subjects} />
          <RecentExams exams={data.recentExams} />
        </section>
      </main>
    </PageShell>
  );
}
