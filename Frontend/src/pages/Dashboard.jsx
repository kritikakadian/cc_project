import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { api } from "../services/api";

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [modal, setModal] = useState({ open: false, task: null });
  const [error, setError] = useState("");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("taskorbit_user") || "null"));

  const filter = searchParams.get("filter") || "all";

  async function load() {
    try {
      setTasks(await api.getTasks());
      const me = await api.me();
      setUser(me.user);
      localStorage.setItem("taskorbit_user", JSON.stringify(me.user));
    } catch (err) {
      if (err.message.toLowerCase().includes("session") || err.message.toLowerCase().includes("authentication")) onLogout();
      else setError(err.message);
    }
  }

  useEffect(() => { load(); }, []);

  const counts = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }), [tasks]);

  const visibleTasks = useMemo(() => {
    let list = tasks.filter((task) => {
      const matchesFilter = filter === "all" || task.status === filter;
      const q = search.toLowerCase();
      const matchesSearch = !q || task.title.toLowerCase().includes(q) || (task.description || "").toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

    return [...list].sort((a, b) => {
      if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, filter, search, sort]);

  async function saveTask(payload) {
    try {
      if (modal.task) {
        const updated = await api.updateTask(modal.task._id, payload);
        setTasks((old) => old.map((t) => t._id === updated._id ? updated : t));
      } else {
        const created = await api.createTask(payload);
        setTasks((old) => [created, ...old]);
      }
      setModal({ open: false, task: null });
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggle(task) {
    try {
      const updated = await api.updateTask(task._id, {
        status: task.status === "completed" ? "pending" : "completed"
      });
      setTasks((old) => old.map((t) => t._id === updated._id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.deleteTask(id);
      setTasks((old) => old.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const title = filter === "pending" ? "Pending tasks" : filter === "completed" ? "Completed tasks" : "All tasks";

  return (
    <div className="app-shell">
      <Sidebar user={user} onLogout={onLogout} />

      <main className="workspace">
        <header className="workspace-head">
          <div>
            <span className="eyebrow">MY WORKSPACE</span>
            <h1>{filter === "all" ? `Good day, ${user?.name?.split(" ")[0] || "there"}.` : title}</h1>
            <p>{filter === "all" ? "Here is what's happening with your tasks." : "Keep the list focused and move things forward."}</p>
          </div>
          <button className="button primary" onClick={() => setModal({ open: true, task: null })}>＋ New task</button>
        </header>

        {error && <div className="error-box workspace-error">{error}<button onClick={() => setError("")}>×</button></div>}

        {filter === "all" && (
          <section className="stats-grid">
            <div className="stat-card"><span>Total tasks</span><strong>{counts.total}</strong><small>Across your workspace</small></div>
            <div className="stat-card"><span>Pending</span><strong>{counts.pending}</strong><small>Still on your list</small></div>
            <div className="stat-card"><span>Completed</span><strong>{counts.completed}</strong><small>Already finished</small></div>
            <div className="stat-card accent"><span>Active today</span><strong>{counts.pending}</strong><small>Tasks still to finish</small></div>
          </section>
        )}

        <section className="task-section">
          <div className="toolbar">
            <div className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." /></div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          {visibleTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">○</div>
              <h2>{search ? "No matching tasks" : "Nothing here yet"}</h2>
              <p>{search ? "Try another search term." : "Create a task and it will appear in this workspace."}</p>
              {!search && <button className="button primary" onClick={() => setModal({ open: true, task: null })}>Create your first task</button>}
            </div>
          ) : (
            <div className="task-list">
              {visibleTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={toggle}
                  onEdit={(item) => setModal({ open: true, task: item })}
                  onDelete={remove}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <TaskModal
        open={modal.open}
        task={modal.task}
        onClose={() => setModal({ open: false, task: null })}
        onSave={saveTask}
      />
    </div>
  );
}
