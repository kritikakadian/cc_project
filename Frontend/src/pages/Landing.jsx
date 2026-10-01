import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Landing() {
  return (
    <div className="landing">
      <header className="public-nav">
        <Logo />
        <div className="nav-links">
          <Link to="/login">Sign in</Link>
          <Link className="button primary small" to="/register">Get started</Link>
        </div>
      </header>

      <main className="hero">
        <div className="hero-copy">
          <span className="pill">PERSONAL TASK CONTROL</span>
          <h1>Turn scattered tasks into a clear <em>daily orbit.</em></h1>
          <p>TaskOrbit keeps your priorities, deadlines and completed work in one focused workspace.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/register">Start organizing</Link>
            <Link className="text-link" to="/login">I already have an account →</Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="mock-top"><span>Today</span><span>•••</span></div>
          <div className="mock-stat"><strong>08</strong><span>tasks planned</span></div>
          <div className="mock-task completed"><span>✓</span><div><b>Finish project documentation</b><small>Completed</small></div></div>
          <div className="mock-task"><span></span><div><b>Review database queries</b><small>Pending</small></div></div>
          <div className="mock-task"><span></span><div><b>Prepare CN revision</b><small>Pending</small></div></div>
        </div>
      </main>
    </div>
  );
}
