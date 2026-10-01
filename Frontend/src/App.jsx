import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function Protected({ children }) {
  return localStorage.getItem("taskorbit_token") ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("taskorbit_token");
    localStorage.removeItem("taskorbit_user");
    navigate("/login");
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Auth mode="login" />} />
      <Route path="/register" element={<Auth mode="register" />} />
      <Route path="/app" element={<Protected><Dashboard onLogout={logout} /></Protected>} />
      <Route path="/app/tasks" element={<Protected><Dashboard onLogout={logout} /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
