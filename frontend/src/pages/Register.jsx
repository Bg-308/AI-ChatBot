
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(username, password);
    alert("Registered! Please login.");
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#343541]">
      <form className="bg-[#444654] p-8 rounded text-white" onSubmit={handleRegister}>
        <h2 className="text-xl mb-4">Register</h2>

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

        <button className="w-full bg-blue-600 p-2 rounded">
          Register
        </button>

        <p className="mt-3">
          Already have account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}
