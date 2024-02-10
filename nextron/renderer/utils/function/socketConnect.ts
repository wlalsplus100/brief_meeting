import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (!socket) {
    // 소켓 연결
    socket = io('http://localhost:3000');

    // 연결된 소켓 반환
    return socket;
  }

  return socket;
};
