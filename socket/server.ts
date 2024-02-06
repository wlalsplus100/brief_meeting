import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const expressApp = express();
const server = http.createServer(expressApp);
const io = new Server(server, {
  cors: {
    origin: true,
  },
});

interface TroomUsers {
  [room: string]: string[];
}

const roomUsers: TroomUsers = {};

io.on('connection', socket => {
  console.log('user connection');

  socket.on('joinRoom', room => {
    socket.join(room);
    if (!roomUsers[room]) {
      roomUsers[room] = [];
    }
    roomUsers[room].push(socket.id);
    console.log(`user join room: ${room}`);
  });

  socket.on('sendMessage', data => {
    io.to(data.room).emit('message', data);
  });

  socket.on('disconnect', () => {
    Object.keys(roomUsers).forEach(room => {
      roomUsers[room] = roomUsers[room].filter(userId => userId !== socket.id);
    });
    console.log('user Disconnect');
  });
});

expressApp.use(express.static('public'));
expressApp.use(cors());

server.listen(3000, () => {
  console.log('socket server listening on port 3000');
});
