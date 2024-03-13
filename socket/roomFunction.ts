import { Socket } from 'socket.io';

export function roomCreate(rooms: Array<string[]>) {
  const availableRoom = rooms.filter(item => item.length !== 2);
  if (!availableRoom.length) rooms.push([]);
}

export function roomConnect(socket: Socket, rooms: Array<string[]>): number {
  const indexs: Array<number> = [];
  const availableRoom = rooms.filter((item, index) => {
    if (item.length === 1) indexs.push(index);
    return item.length === 1;
  });

  let index;

  if (!availableRoom.length) {
    roomCreate(rooms);
    const indexs: Array<number> = [];
    const randomIndex = Math.floor(
      Math.random() *
        rooms.filter((room, index) => {
          if (room.length === 0) indexs.push(index);
          return room.length === 0;
        }).length,
    );
    index = indexs[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * availableRoom.length);
    index = indexs[randomIndex];
  }

  socket.join(`room${index}`);
  return index;
}
