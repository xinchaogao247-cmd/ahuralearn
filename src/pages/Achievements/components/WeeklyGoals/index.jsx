import { useEffect, useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import GoalItem from "../GoalItem";

import styles from "./WeeklyGoals.module.css";

const emptyGoalForm = {
  title: "",
  type: "Course",
  current: "0",
  total: "",
  dueDay: "Friday",
};

export default function WeeklyGoals({ goals, onAddGoal, onDeleteGoal }) {
  const [localGoals, setLocalGoals] = useState(goals);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [goalForm, setGoalForm] = useState(emptyGoalForm);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const goalStats = useMemo(() => {
    const achievedCount = localGoals.filter((goal) => goal.achieved).length;

    return {
      achievedCount,
      totalCount: localGoals.length,
    };
  }, [localGoals]);

  const updateGoalForm = (field, value) => {
    setGoalForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setGoalForm(emptyGoalForm);
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const goalTitle = goalForm.title.trim();
    const totalTarget = Number(goalForm.total);
    const currentProgress = Number(goalForm.current);

    if (!goalTitle || totalTarget <= 0 || currentProgress < 0) {
      setFormError("Enter a title, valid progress, and a target greater than 0.");
      return;
    }

    if (currentProgress > totalTarget) {
      setFormError("Current progress cannot be greater than the total target.");
      return;
    }

    try {
      setIsSaving(true);
      setFormError("");
      await onAddGoal({
        title: goalTitle,
        type: goalForm.type,
        current: currentProgress,
        total: totalTarget,
        dueDay: goalForm.dueDay,
      });
      closeForm();
    } catch {
      setFormError("Could not add weekly goal.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleIncrementGoal = (goalId) => {
    setLocalGoals((currentGoals) =>
      currentGoals.map((goal) => {
        if (goal.id !== goalId || goal.achieved) {
          return goal;
        }

        const nextCurrent = Math.min(goal.current + 1, goal.total);
        const achieved = nextCurrent >= goal.total;

        return {
          ...goal,
          current: nextCurrent,
          achieved,
          achievedDay: achieved ? "Today" : goal.achievedDay,
        };
      })
    );
  };

  const handleCompleteGoal = (goalId) => {
    setLocalGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              current: goal.total,
              achieved: true,
              achievedDay: "Today",
            }
          : goal
      )
    );
  };

  const handleDeleteGoal = async (goalId) => {
    setLocalGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId)
    );
    await onDeleteGoal?.(goalId);
  };

  return (
    <section className={styles.weeklyGoals}>
      <div className={styles.header}>
        <div>
          <h2>Weekly Goals</h2>
          <p>
            {goalStats.achievedCount}/{goalStats.totalCount} goals achieved this week
          </p>
        </div>

        <button
          type="button"
          aria-label={isFormOpen ? "Close weekly goal form" : "Add weekly goal"}
          onClick={() => setIsFormOpen((current) => !current)}
        >
          {isFormOpen ? <X size={21} strokeWidth={2.3} /> : <Plus size={22} strokeWidth={2.3} />}
        </button>
      </div>

      {isFormOpen ? (
        <div className={styles.formPanel}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <label className={styles.titleField}>
                Goal title
                <input
                  type="text"
                  value={goalForm.title}
                  onChange={(event) => updateGoalForm("title", event.target.value)}
                  placeholder="Complete 5 React lessons"
                />
              </label>

              <label>
                Goal type
                <select
                  value={goalForm.type}
                  onChange={(event) => updateGoalForm("type", event.target.value)}
                >
                  <option>Course</option>
                  <option>Practice</option>
                  <option>Exam</option>
                  <option>Streak</option>
                  <option>Project</option>
                </select>
              </label>

              <label>
                Current
                <input
                  type="number"
                  min="0"
                  value={goalForm.current}
                  onChange={(event) => updateGoalForm("current", event.target.value)}
                />
              </label>

              <label>
                Target
                <input
                  type="number"
                  min="1"
                  value={goalForm.total}
                  onChange={(event) => updateGoalForm("total", event.target.value)}
                  placeholder="5"
                />
              </label>

              <label>
                Due day
                <select
                  value={goalForm.dueDay}
                  onChange={(event) => updateGoalForm("dueDay", event.target.value)}
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </label>
            </div>

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
        {localGoals.map((goal) => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onComplete={handleCompleteGoal}
            onDelete={handleDeleteGoal}
            onIncrement={handleIncrementGoal}
          />
        ))}
      </div>
    </section>
  );
}
