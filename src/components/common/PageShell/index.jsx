import TopNav from "../TopNav";
import Navbar from "../Navbar";
import Footer from "../Footer";

import styles from "./PageShell.module.css";

export default function PageShell({ children, showSubNav = true }) {
  return (
    <div className={styles.shell}>
      <TopNav />

      {showSubNav && <Navbar />}

      <div className={styles.mainContent}>{children}</div>

      <Footer />
    </div>
  );
}
