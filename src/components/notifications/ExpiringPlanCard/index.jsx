import { useState } from "react";
import { AlertCircle, CalendarDays, ChevronDown } from "lucide-react";

import styles from "./ExpiringPlanCard.module.css";

export default function ExpiringPlanCard({ onAcknowledge, plan }) {
  const [expanded, setExpanded] = useState(false);

  const handleAcknowledge = (event) => {
    event.stopPropagation();
    onAcknowledge(plan.id);
  };

  return (
    <article
      className={`${styles.card} ${expanded ? styles.expandedCard : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={() => setExpanded((current) => !current)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setExpanded((current) => !current);
        }
      }}
    >
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

        {expanded && (
          <div className={styles.detailsPanel}>
            <p className={styles.description}>{plan.description}</p>

            <div className={styles.detailGrid}>
              <div>
                <span>Progress</span>
                <strong>{plan.progress}%</strong>
              </div>
              <div>
                <span>Estimated time</span>
                <strong>{plan.estimatedTime}</strong>
              </div>
              <div>
                <span>Track</span>
                <strong>{plan.owner}</strong>
              </div>
              <div>
                <span>Last updated</span>
                <strong>{plan.lastUpdated}</strong>
              </div>
            </div>

            <div className={styles.nextSteps}>
              <h3>Next steps</h3>
              <ul>
                {plan.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className={styles.actionRow}>
          <span className={styles.expandHint}>
            <ChevronDown
              className={expanded ? styles.chevronOpen : ""}
              size={16}
              strokeWidth={2.4}
            />
            {expanded ? "Hide details" : "View details"}
          </span>

        <button
          className={styles.ackButton}
          type="button"
          onClick={handleAcknowledge}
        >
          Got it
        </button>
        </div>
      </div>
    </article>
  );
}
