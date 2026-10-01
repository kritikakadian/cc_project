import { useEffect, useState } from "react";

const empty = {
  title: "",
  description: ""
};

export default function TaskModal({ open, onClose, onSave, task }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(task
      ? { title: task.title || "", description: task.description || "" }
      : empty
    );
  }, [task, open]);

  if (!open) return null;

  function change(e) {
    setForm((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    await onSave({ ...form, title: form.title.trim() });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="eyebrow">{task ? "UPDATE TASK" : "NEW TASK"}</p>
            <h2>{task ? "Edit your task" : "Create a task"}</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={submit}>
          <label>
            Task title
            <input name="title" value={form.title} onChange={change}
              placeholder="e.g. Complete DBMS notes" autoFocus />
          </label>

          <label>
            Description
            <textarea name="description" value={form.description}
              onChange={change} placeholder="Add a short note..." rows="4" />
          </label>

          <div className="modal-actions">
            <button type="button" className="button secondary" onClick={onClose}>Cancel</button>
            <button className="button primary">{task ? "Save changes" : "Create task"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
