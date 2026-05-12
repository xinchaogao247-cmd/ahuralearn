import { Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import LearningPlan from "../pages/LearningPlan";
import Achievements from "../pages/Achievements";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/learning-plan" element={<LearningPlan />} />
        <Route path="/achievements" element={<Achievements />} />
      </Route>
    </Routes>
  );
}
