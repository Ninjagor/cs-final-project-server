"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRoomChat = exports.sendDirectChat = exports.sendGlobalChat = void 0;
function sendGlobalChat(io, message) {
    io.emit("global_chat", message);
}
exports.sendGlobalChat = sendGlobalChat;
function sendDirectChat(socket, message) {
    socket.emit("direct_chat", message);
}
exports.sendDirectChat = sendDirectChat;
function sendRoomChat(io, message) {
    io.emit("room_chat", message);
}
exports.sendRoomChat = sendRoomChat;
//# sourceMappingURL=sendMessage.js.map