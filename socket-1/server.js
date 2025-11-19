const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.broadcast.emit('message', `🟢 User ${socket.id} joined`);

    socket.on('chatMessage', (msg) => {
        io.emit('message', `${socket.id}: ${msg}`);
    });

    socket.on('disconnect', () => {
        io.emit('message', `🔴 User ${socket.id} left`);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
