import { Server } from "socket.io";
import configureSocket from "./connection.socket";
import chatSocket, { roomChatSocket } from "./chat.socket";
import userSocket from "./user.socket";
import roomSocket from "./room.socket";

export function startSockets(io: Server) {
    configureSocket(io);
    chatSocket(io);
    roomChatSocket(io);
    userSocket(io);
    roomSocket(io);
}
