import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="sidebar">
      <Logo />
      <div className="side-section">
        <span className="side-label">WORKSPACE</span>
        <NavLink to="/app" end>Overview</NavLink>
        <NavLink to="/app/tasks">All tasks</NavLink>
        <NavLink to="/app/tasks?filter=pending">Pending</NavLink>
        <NavLink to="/app/tasks?filter=completed">Completed</NavLink>
      </div>

      <div className="side-bottom">
        <div className="profile-mini">
          <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
        <button className="logout" onClick={onLogout}>Sign out</button>
      </div>
    </aside>
  );
}
