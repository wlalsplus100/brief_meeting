import { connectSocket } from './socketConnect';

export const sendMessage = async (msg: string, roomName: string) => {
  const socket = connectSocket();
  socket.emit('sendMessage', { message: msg, room: roomName });
};
