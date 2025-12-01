const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join Room
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id} joined room: ${roomName}`);

    socket.to(roomName).emit("receive_message", {
      user: "SYSTEM",
      text: `${socket.id} joined room`,
    });
  });

  // Send message to room
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", {
      user: socket.id,
      text: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
