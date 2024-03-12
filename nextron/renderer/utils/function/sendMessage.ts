import { connectSocket } from './socketConnect';

export const sendMessage = async (msg: string) => {
  const socket = connectSocket();
  socket.emit('sendMessage', { message: msg, room: 'room1' });
};
