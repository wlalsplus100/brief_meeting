import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { UserNames } from './userName';
import { roomConnect, roomCreate } from './roomFunction';

const expressApp = express();
const server = http.createServer(expressApp);
const io = new Server(server, {
  cors: {
    origin: true,
  },
});

const roomUsers: Array<string[]> = [];
const userNames = new UserNames();

io.on('connection', socket => {
  const userName = userNames.getRandomName(socket);
  let index = 0;
  console.log(`user ${userName} connection`);

  socket.on('joinRoom', () => {
    roomCreate(roomUsers);
    index = roomConnect(socket, roomUsers);
    console.log(index);
    roomUsers[index].push(userName);
    console.log(`user join room${index}: ${roomUsers[index]}`);
    socket.to(`room${index}`).emit('joinAnother', userName);
    socket.emit('roomUsers', { roomMember: roomUsers[index], roomName: `room${index}` });
  });

  socket.on('sendMessage', data => {
    socket.to(data.room).emit('message', data);
  });

  socket.on('disconnecting', () => {
    userNames.delUsedNames(socket);
  });

  socket.on('disconnect', () => {
    const userIndex = roomUsers[index].indexOf(userName);
    if (userIndex !== -1) {
      roomUsers[index].splice(userIndex, 1);
    } else {
      console.log('잉 못찾음');
    }
    console.log('user Disconnect');
  });
});

expressApp.use(express.static('public'));
expressApp.use(cors());

server.listen(3000, () => {
  console.log('socket server listening on port 3000');
});
