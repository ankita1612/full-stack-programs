import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
   x = 10; 
  console.log("Value of x:", x);

  const obj = {
    name: "Ankita",
    name: "Amit" // allowed!
  };
  // const a={1:"h",2:"n",3:'sss'}
  // console.log(Object.values(a));
 
  // const x={1:"h",2:"n",3:'sss'}
  // console.log(x.at );
  // const d=[100,1001]
  // console.log(d)

  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Receive room messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const joinRoom = () => {
    if (room.trim() === "") return;

    socket.emit("join_room", room);
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.length) return;

    socket.emit("send_message", {
      room,
      message,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat Rooms</h1>

      {/* Join Room */}
      {!joined && (
        <div>
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      )}

      {/* Chat Box */}
      {joined && (
        <>
          <h3>Room: {room}</h3>

          <div
            style={{
              border: "1px solid #ccc",
              height: 250,
              overflowY: "scroll",
              padding: 10,
              marginBottom: 10,
            }}
          >
            {chat.map((c, i) => (
              <p key={i}>
                <b>{c.user}:</b> {c.text}
              </p>
            ))}
          </div>

          <input
            type="text"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>
        </>
      )}
    </div>
  );
}

export default App;
