import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      text: message,
      time: new Date().toLocaleTimeString()
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat App</h2>

      <div
        style={{
          height: "300px",
          border: "1px solid #ccc",
          padding: 10,
          overflowY: "auto",
          marginBottom: 10
        }}
      >
        {chat.map((c, idx) => (
          <p key={idx}>
            <b>{c.time}:</b> {c.text}
          </p>
        ))}
      </div>

      <input
        style={{ width: "70%", padding: 10 }}
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        style={{ padding: 10, marginLeft: 10 }}
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default App;
