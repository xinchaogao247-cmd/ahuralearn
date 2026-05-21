import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

export default function SubNav() {
  return (
    <div className={styles.subnav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${styles.navLink} ${
            isActive ? styles.active : ""
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/courses"
        className={({ isActive }) =>
          `${styles.navLink} ${
            isActive ? styles.active : ""
          }`
        }
      >
        Courses
      </NavLink>

      <NavLink
        to="/learning-plan"
        className={({ isActive }) =>
          `${styles.navLink} ${
            isActive ? styles.active : ""
          }`
        }
      >
        Learning Plan
      </NavLink>

      <NavLink
        to="/achievements"
        className={({ isActive }) =>
          `${styles.navLink} ${
            isActive ? styles.active : ""
          }`
        }
      >
        Achievements
      </NavLink>

      <NavLink
        to="/my-exam"
        className={({ isActive }) =>
          `${styles.navLink} ${
            isActive ? styles.active : ""
          }`
        }
      >
        My Exam
      </NavLink>

      <NavLink
        to="/my-information"
        className={({ isActive }) =>
          `${styles.navLink} ${
            isActive ? styles.active : ""
          }`
        }
      >
        My Information
      </NavLink>
    </div>
  );
}
