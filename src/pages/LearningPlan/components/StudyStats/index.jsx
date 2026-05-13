import { useMemo, useState } from "react";

import PlanHeader from "../PlanHeader";
import TaskCard from "../TaskCard";
import styles from "./StudyStats.module.css";

export default function StudyStats({ planner }) {
  const [mode, setMode] = useState("manual");
  const [tasks, setTasks] = useState(planner.tasks);
  const [manualTitle, setManualTitle] = useState("");
  const [manualDueText, setManualDueText] = useState("This Week");

  const visibleTasks = useMemo(() => {
    if (mode === "ai") {
      return tasks.filter((task) =>
        task.tags?.some((tag) => tag.label.toLowerCase().includes("ai"))
      );
    }

    return tasks;
  }, [mode, tasks]);

  const handleToggleComplete = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const isDone = task.done || task.completed;

        return {
          ...task,
          completed: !isDone,
          done: !isDone,
          finished: !isDone,
          subtitle: !isDone
            ? "Completed just now"
            : task.tags
              ? task.subtitle
              : "Manual Entry",
          dueText: !isDone
            ? "Finished"
            : task.dueText === "Finished"
              ? "This Week"
              : task.dueText,
        };
      })
    );
  };

  const handleAddManualTask = (event) => {
    event.preventDefault();

    const title = manualTitle.trim();

    if (!title) {
      return;
    }

    setTasks((currentTasks) => [
      {
        id: Date.now(),
        title,
        completed: false,
        subtitle: "Manual Entry",
        dueText: manualDueText.trim() || "This Week",
      },
      ...currentTasks,
    ]);
    setManualTitle("");
    setManualDueText("This Week");
  };

  return (
    <div className={styles.card}>
      <PlanHeader
        title={planner.title}
        actions={planner.actions}
        activeMode={mode}
        onModeChange={setMode}
      />

      {mode === "manual" && (
        <form className={styles.manualCard} onSubmit={handleAddManualTask}>
          <input
            type="text"
            value={manualTitle}
            onChange={(event) => setManualTitle(event.target.value)}
            placeholder="Write a new study plan"
            aria-label="New study plan title"
          />

          <input
            type="text"
            value={manualDueText}
            onChange={(event) => setManualDueText(event.target.value)}
            placeholder="Due date"
            aria-label="New study plan due date"
          />

          <button type="submit">Add Plan</button>
        </form>
      )}

      <div className={styles.taskList}>
        {visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
