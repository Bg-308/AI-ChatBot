
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(username, password);

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      navigate("/chat");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#343541]">
      <form onSubmit={handleLogin} className="bg-[#444654] p-8 rounded text-white">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="w-full p-2 mb-3 bg-gray-700"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-gray-700"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 p-2 rounded">
          Login
        </button>

        <p className="mt-3">
          New user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
