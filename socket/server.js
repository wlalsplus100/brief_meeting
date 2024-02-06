"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const expressApp = (0, express_1.default)();
const server = http_1.default.createServer(expressApp);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: true,
    },
});
const roomUsers = {};
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
expressApp.use(express_1.default.static('public'));
expressApp.use((0, cors_1.default)());
server.listen(3000, () => {
    console.log('socket server listening on port 3000');
});
