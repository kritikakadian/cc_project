const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("taskorbit_token");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  me: () => request("/auth/me"),

 getTasks: () => request("/todos"),

createTask: (payload) =>
  request("/todos", {
    method: "POST",
    body: JSON.stringify(payload)
  }),

updateTask: (id, payload) =>
  request(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  }),

deleteTask: (id) =>
  request(`/todos/${id}`, {
    method: "DELETE"
  })
};