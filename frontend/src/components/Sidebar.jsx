
export default function Sidebar() {
  return (
    <div className="w-64 bg-[#202123] text-white h-screen p-4">
      <h2 className="text-xl mb-6">AI Chatbot</h2>

      <button className="w-full bg-gray-700 p-2 rounded mb-4">
        + New Chat
      </button>

      <div className="mt-4 text-sm text-gray-400">
        Chat History
      </div>

      <button
        className="mt-6 bg-red-600 w-full p-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
