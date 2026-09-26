
import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { sendMessage, getHistory } from "../api";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const loadHistory = async () => {
    const data = await getHistory(token);

    const formatted = data.flatMap(chat => [
      { sender: "user", text: chat.message },
      { sender: "ai", text: chat.response }
    ]);

    setChatHistory(formatted);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message) return;

    setChatHistory(prev => [...prev, { sender: "user", text: message }]);
    setLoading(true);

    const data = await sendMessage(message, token);

    setChatHistory(prev => [...prev, { sender: "ai", text: data.response }]);
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-[#343541] h-screen">
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded ${
                msg.sender === "user"
                  ? "bg-[#444654]"
                  : "bg-[#40414f]"
              } text-white`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="text-gray-300">AI is typing...</div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-[#40414f] flex">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 bg-[#40414f] text-white border border-gray-600 rounded"
            placeholder="Send a message..."
          />
          <button className="ml-2 bg-green-600 px-4 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
