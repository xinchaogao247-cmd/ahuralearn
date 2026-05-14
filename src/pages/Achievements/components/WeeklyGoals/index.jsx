import { useState } from "react";
import { Plus } from "lucide-react";
import GoalItem from "../GoalItem";

import styles from "./WeeklyGoals.module.css";

export default function WeeklyGoals({ goals, onAddGoal }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [total, setTotal] = useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const closeForm = () => {
    setIsFormOpen(false);
    setTitle("");
    setTotal("");
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const goalTitle = title.trim();
    const totalTarget = Number(total);

    if (!goalTitle || totalTarget <= 0) {
      setFormError("Enter a title and a target greater than 0.");
      return;
    }

    try {
      setIsSaving(true);
      setFormError("");
      await onAddGoal({
        title: goalTitle,
        total: totalTarget,
      });
      closeForm();
    } catch {
      setFormError("Could not add weekly goal.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={styles.weeklyGoals}>
      <div className={styles.header}>
        <h2>Weekly Goals</h2>
        <button
          type="button"
          aria-label="Add weekly goal"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={22} strokeWidth={2.3} />
        </button>
      </div>

      {isFormOpen ? (
        <div className={styles.formPanel}>
          <form onSubmit={handleSubmit}>
            <label>
              Goal title
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Read 5 lessons"
              />
            </label>

            <label>
              Total target number
              <input
                type="number"
                min="1"
                value={total}
                onChange={(event) => setTotal(event.target.value)}
                placeholder="5"
              />
            </label>

            {formError ? <p className={styles.formError}>{formError}</p> : null}

            <div className={styles.formActions}>
              <button type="button" onClick={closeForm}>
                Cancel
              </button>
              <button type="submit" disabled={isSaving}>
                {isSaving ? "Adding..." : "Add Goal"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className={styles.goalList}>
        {goals.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
    </section>
  );
}
