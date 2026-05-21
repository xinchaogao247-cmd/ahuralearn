import { Route, Routes } from "react-router-dom";

import AIStudyPlan from "./pages/aiStudyPlan";
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
      <Route path="/courses" element={<Courses />} />
      <Route path="/learning-plan" element={<LearningPlan />} />
      <Route path="/ai-study-plan" element={<AIStudyPlan />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/my-exam" element={<MyExam />} />
      <Route path="/my-information" element={<MyInformation />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;
