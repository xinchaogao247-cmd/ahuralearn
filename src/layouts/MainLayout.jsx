import { useLocation } from "react-router-dom";

import Topbar from "../components/layout/Topbar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  const location = useLocation();
  const hideSubNav = location.pathname === "/ai-study-plan";

  return (
    <div className={styles.layout}>
      <Topbar />

      {!hideSubNav && <Navbar />}

      <div className={styles.mainContent}>{children}</div>

      <Footer />
    </div>
  );
}
