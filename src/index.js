const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const options = {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
};
const io = require("socket.io")(server, options);

const users = [];

io.on("connection", socket => {
  const { userId } = socket.handshake.query;
  if (!Object.keys(users).find(id => id === userId)) {
    users.push({[userId]: socket.id});
  }
  socket.on('sendMessage', (msg) => {
    io.emit('sendMessage', msg);
  });
});

app.get('/', (req, res) => {
  res.json([
    {id: 1, name: 'Maria'},
    {id: 2, name: 'Mauricio'},
  ]);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});