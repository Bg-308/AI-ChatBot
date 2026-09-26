
const API_URL = "http://127.0.0.1:8000";

export const registerUser = async (username, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });
  return res.json();
};

export const loginUser = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });
  return res.json();
};

export const sendMessage = async (message, token) => {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  });
  return res.json();
};

export const getHistory = async (token) => {
  const res = await fetch(`${API_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

