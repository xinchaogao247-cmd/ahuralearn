import { Route, Routes } from "react-router-dom";

import AIStudyPlan from "./pages/AIStudyPlan";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import LearningPlan from "./pages/LearningPlan";
import Achievements from "./pages/Achievements";
import MyExam from "./pages/MyExam";
import MyInformation from "./pages/MyInformation";
import Notifications from "./pages/Notifications";

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
