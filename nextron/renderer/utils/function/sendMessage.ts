import { socket } from './socketConnect';

export const sendMessage = async (msg: string) => {
  console.log('메세지 보냄');
  socket.emit('sendMessage', { message: msg, room: 'room1' });
};