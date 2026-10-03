import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { api } from "../services/api";

export default function Auth({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function change(e) {
    setForm((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = isRegister
        ? await api.register(form)
        : await api.login({ email: form.email, password: form.password });

      localStorage.setItem("taskorbit_token", data.token);
      localStorage.setItem("taskorbit_user", JSON.stringify(data.user));
      navigate(location.state?.from || "/app");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-brand"><Logo /></div>
      <div className="auth-card">
        <div className="auth-heading">
          <span className="pill">{isRegister ? "WELCOME" : "WELCOME BACK"}</span>
          <h1>{isRegister ? "Create your workspace" : "Sign in to TaskOrbit"}</h1>
          <p>{isRegister ? "A simple place to plan, prioritize and finish your work." : "Pick up where you left off."}</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={submit}>
          {isRegister && <label>Your name<input name="name" value={form.name} onChange={change} placeholder="kritika" required /></label>}
          <label>Email address<input name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required /></label>
          <label>Password<input name="password" type="password" value={form.password} onChange={change} placeholder="Minimum 6 characters" minLength="6" required /></label>
          <button className="button primary full" disabled={loading}>{loading ? "Please wait..." : isRegister ? "Create account" : "Sign in"}</button>
        </form>

        <p className="switch-auth">
          {isRegister ? "Already have an account?" : "New to TaskOrbit?"}{" "}
          <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create one"}</Link>
        </p>
      </div>
    </div>
  );
}
