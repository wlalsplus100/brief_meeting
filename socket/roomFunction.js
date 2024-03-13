"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomConnect = exports.roomCreate = void 0;
function roomCreate(rooms) {
    const availableRoom = rooms.filter(item => item.length !== 2);
    if (!availableRoom.length)
        rooms.push([]);
}
exports.roomCreate = roomCreate;
function roomConnect(socket, rooms) {
    const indexs = [];
    const availableRoom = rooms.filter((item, index) => {
        if (item.length === 1)
            indexs.push(index);
        return item.length === 1;
    });
    let index;
    if (!availableRoom.length) {
        roomCreate(rooms);
        const indexs = [];
        const randomIndex = Math.floor(Math.random() *
            rooms.filter((room, index) => {
                if (room.length === 0)
                    indexs.push(index);
                return room.length === 0;
            }).length);
        index = indexs[randomIndex];
    }
    else {
        const randomIndex = Math.floor(Math.random() * availableRoom.length);
        index = indexs[randomIndex];
    }
    socket.join(`room${index}`);
    return index;
}
exports.roomConnect = roomConnect;
