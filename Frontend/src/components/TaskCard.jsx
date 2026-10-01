export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-card ${task.status === "completed" ? "done" : ""}`}>
      <button
        className={`check ${task.status === "completed" ? "checked" : ""}`}
        onClick={() => onToggle(task)}
        aria-label="Toggle task"
      >
        {task.status === "completed" ? "✓" : ""}
      </button>

      <div className="task-main">
        <div className="task-title-row">
          <h3>{task.title}</h3>
        </div>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta">
          <span>{task.status === "completed" ? "Completed" : "Pending"}</span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="danger-text" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </article>
  );
}
