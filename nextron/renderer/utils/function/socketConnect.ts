import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000');
socket.emit('joinRoom', 'room1');
socket.on('roomUsers', (users: string[]) => {
  console.log('방에 속한 유저 목록:', users);
  // 받아온 유저 목록을 표시하거나 필요한 작업을 수행
});
