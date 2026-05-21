import styles from "./MyInformation.module.css";

import MainLayout from "../../layouts/MainLayout";
import { useMyInformation } from "./hooks/useMyInformation";

import ProfileCard from "./components/ProfileCard";
import LearningStats from "./components/LearningStats";
import LearningProfile from "./components/LearningProfile";

export default function MyInformation() {
  const { data, loading, error, empty } = useMyInformation();

  if (loading) {
    return (
      <MainLayout>
        <main className={`${styles.myInformationPage} ${styles.pageStatus}`}>
          Loading...
        </main>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <main className={`${styles.myInformationPage} ${styles.pageStatus}`}>
          Failed to load profile data.
        </main>
      </MainLayout>
    );
  }

  if (empty) {
    return (
      <MainLayout>
        <main className={`${styles.myInformationPage} ${styles.pageStatus}`}>
          No profile data found.
        </main>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className={styles.myInformationPage}>
        <ProfileCard profile={data.profile} />

        <LearningStats stats={data.stats} />

        <LearningProfile learningProfile={data.learningProfile} />
      </main>
    </MainLayout>
  );
}
