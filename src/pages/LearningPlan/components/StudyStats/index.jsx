import { useMemo, useState } from "react";

import PlanHeader from "../PlanHeader";
import TaskCard from "../TaskCard";
import styles from "./StudyStats.module.css";

const emptyManualPlan = {
  title: "",
  dueText: "This Week",
  studyTime: "1h",
  priority: "Medium",
  note: "",
};

export default function StudyStats({ planner }) {
  const [mode, setMode] = useState("none");
  const [tasks, setTasks] = useState(planner.tasks);
  const [manualPlan, setManualPlan] = useState(emptyManualPlan);
  const [editingTaskId, setEditingTaskId] = useState(null);

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

  const updateManualPlan = (field, value) => {
    setManualPlan((currentPlan) => ({
      ...currentPlan,
      [field]: value,
    }));
  };

  const resetManualPlan = () => {
    setManualPlan(emptyManualPlan);
    setEditingTaskId(null);
  };

  const handleEditTask = (task) => {
    setMode("manual");
    setEditingTaskId(task.id);
    setManualPlan({
      title: task.title,
      dueText: task.dueText === "Finished" ? "This Week" : task.dueText,
      studyTime: task.studyTime || "1h",
      priority: task.priority || "Medium",
      note: task.note || "",
    });
  };

  const handleModeChange = (nextMode) => {
    setMode((currentMode) => (currentMode === nextMode ? "none" : nextMode));

    if (nextMode !== "manual") {
      resetManualPlan();
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );

    if (editingTaskId === taskId) {
      resetManualPlan();
    }
  };

  const handleSubmitManualTask = (event) => {
    event.preventDefault();

    const title = manualPlan.title.trim();

    if (!title) {
      return;
    }

    const nextTask = {
      title,
      completed: false,
      subtitle: "Manual Entry",
      dueText: manualPlan.dueText,
      studyTime: manualPlan.studyTime,
      priority: manualPlan.priority,
      note: manualPlan.note.trim(),
    };

    if (editingTaskId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                ...nextTask,
              }
            : task
        )
      );
    } else {
      setTasks((currentTasks) => [
        {
          id: Date.now(),
          ...nextTask,
        },
        ...currentTasks,
      ]);
    }

    resetManualPlan();
  };

  return (
    <div className={styles.card}>
      <PlanHeader
        title={planner.title}
        actions={planner.actions}
        activeMode={mode}
        onModeChange={handleModeChange}
      />

      {mode === "manual" && (
        <form className={styles.manualCard} onSubmit={handleSubmitManualTask}>
          <div className={styles.formHeader}>
            <div>
              <h3>{editingTaskId ? "Edit Study Plan" : "Create Study Plan"}</h3>
              <p>Customize the task, time, priority, and study note.</p>
            </div>

            {editingTaskId && (
              <button
                className={styles.ghostButton}
                type="button"
                onClick={resetManualPlan}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className={styles.formGrid}>
            <label className={styles.titleField}>
              Plan Title
              <input
                type="text"
                value={manualPlan.title}
                onChange={(event) =>
                  updateManualPlan("title", event.target.value)
                }
                placeholder="Write a new study plan"
                aria-label="New study plan title"
              />
            </label>

            <label>
              Due
              <select
                value={manualPlan.dueText}
                onChange={(event) =>
                  updateManualPlan("dueText", event.target.value)
                }
                aria-label="New study plan due date"
              >
                <option>This Week</option>
                <option>Due Today</option>
                <option>Tomorrow</option>
                <option>Next Week</option>
              </select>
            </label>

            <label>
              Study Time
              <select
                value={manualPlan.studyTime}
                onChange={(event) =>
                  updateManualPlan("studyTime", event.target.value)
                }
              >
                <option>30m</option>
                <option>1h</option>
                <option>1.5h</option>
                <option>2h</option>
                <option>3h</option>
              </select>
            </label>

            <label>
              Priority
              <select
                value={manualPlan.priority}
                onChange={(event) =>
                  updateManualPlan("priority", event.target.value)
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>

            <label className={styles.noteField}>
              Study Note
              <textarea
                rows="3"
                value={manualPlan.note}
                onChange={(event) =>
                  updateManualPlan("note", event.target.value)
                }
                placeholder="Add chapters, resources, or review goals"
              />
            </label>
          </div>

          <button className={styles.submitButton} type="submit">
            {editingTaskId ? "Save Plan" : "Add Plan"}
          </button>
        </form>
      )}

      <div className={styles.taskList}>
        {visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
