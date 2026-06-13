import { Route, Routes } from "react-router-dom";

import AiStudyPlan from "./pages/aiStudyPlan";
import CourseDetail from "./pages/courseDetail";
import CourseGame from "./pages/courseGame";
import Dashboard from "./pages/dashboard";
import Courses from "./pages/courses";
import LearningPlan from "./pages/learningPlan";
import Achievements from "./pages/achievements";
import MyExam from "./pages/myExam";
import MyInformation from "./pages/myInformation";
import Notifications from "./pages/notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:courseId" element={<CourseDetail />} />
      <Route path="/courses/:courseId/game" element={<CourseGame />} />
      <Route path="/learningPlan" element={<LearningPlan />} />
      <Route path="/aiStudyPlan" element={<AiStudyPlan />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/myExam" element={<MyExam />} />
      <Route path="/myInformation" element={<MyInformation />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;
