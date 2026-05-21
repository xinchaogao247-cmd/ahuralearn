import styles from "./MyInformation.module.css";

import PageShell from "../../components/common/PageShell";
import { useMyInformation } from "./hooks/useMyInformation";

import ProfileCard from "../../components/myInformation/ProfileCard";
import LearningStats from "../../components/myInformation/LearningStats";
import LearningProfile from "../../components/myInformation/LearningProfile";

export default function MyInformation() {
  const { data, loading, error, empty } = useMyInformation();

  if (loading) {
    return (
      <PageShell>
        <main className={`${styles.myInformationPage} ${styles.pageStatus}`}>
          Loading...
        </main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <main className={`${styles.myInformationPage} ${styles.pageStatus}`}>
          Failed to load profile data.
        </main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell>
        <main className={`${styles.myInformationPage} ${styles.pageStatus}`}>
          No profile data found.
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <main className={styles.myInformationPage}>
        <ProfileCard profile={data.profile} />

        <LearningStats stats={data.stats} />

        <LearningProfile learningProfile={data.learningProfile} />
      </main>
    </PageShell>
  );
}
