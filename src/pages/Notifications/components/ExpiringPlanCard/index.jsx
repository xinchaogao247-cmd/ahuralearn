import { AlertCircle, CalendarDays } from "lucide-react";

import styles from "./ExpiringPlanCard.module.css";

export default function ExpiringPlanCard({ onAcknowledge, plan }) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrap}>
        <AlertCircle size={24} strokeWidth={2.4} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <div>
            <h2>{plan.title}</h2>
            <p>{plan.courseName}</p>
          </div>

          <span className={styles.priority}>{plan.priority}</span>
        </div>

        <div className={styles.metaRow}>
          <span>
            <CalendarDays size={16} strokeWidth={2.3} />
            Due {plan.dueDate}
          </span>
          <strong>{plan.daysLeft} days left</strong>
          <span className={styles.status}>{plan.status}</span>
        </div>

        <button
          className={styles.ackButton}
          type="button"
          onClick={() => onAcknowledge(plan.id)}
        >
          Got it
        </button>
      </div>
    </article>
  );
}
