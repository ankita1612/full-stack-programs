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
    methods: ["GET", "POST"]
  }
});

// when a client connects
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  // Receive message from client
  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data); // Send to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
