import { Link, useParams } from "react-router-dom";

import PageShell from "../../components/profileLayout/PageShell";

export default function CourseGame() {
  const { courseId } = useParams();

  return (
    <PageShell>
      <main style={{ padding: "32px" }}>
        <Link to="/courses">Back to Courses</Link>
        <h1>Course Game</h1>
        <p>Course ID: {courseId}</p>
      </main>
    </PageShell>
  );
}
