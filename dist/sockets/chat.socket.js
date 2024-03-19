"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomChatSocket = void 0;
const sessionStorage_1 = require("../storage/sessionStorage");
const sendMessage_1 = require("../services/chat/sendMessage");
function chatSocket(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.on('connection', (socket) => {
        socket.on('chat', (message) => {
            (0, sendMessage_1.sendGlobalChat)(io, `[${socket.username}]: ${message}`);
        });
    });
}
exports.default = chatSocket;
function roomChatSocket(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.on('connection', (socket) => {
        socket.on('room_chat', (message) => {
            if (socket.currentroom.roomname) {
                (0, sendMessage_1.sendRoomChat)(io, `room - [${socket.username}]: ${message}`);
            }
            else {
                return 0;
            }
        });
    });
}
exports.roomChatSocket = roomChatSocket;
//# sourceMappingURL=chat.socket.js.map