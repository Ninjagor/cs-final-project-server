import { Server } from "socket.io";
import { SessionSocket } from "../models/SessionSocket";
import { SessionStorage } from "../storage/sessionStorage";
import { sendGlobalChat, sendRoomChat } from "../services/chat/sendMessage";

export default function chatSocket(io: Server) {
    const storage = SessionStorage.getInstance();
    io.on('connection', (socket: SessionSocket) => {
        socket.on('chat', (message: string) => {
            sendGlobalChat(io, `[${socket.username}]: ${message}`);
        })
    });
}

export function roomChatSocket(io: Server) {
    const storage = SessionStorage.getInstance();
    io.on('connection', (socket: SessionSocket) => {
        socket.on('room_chat', (message: string) => {
            if (socket.currentroom.roomname) {
                sendRoomChat(io, `room - [${socket.username}]: ${message}`)
            } else {
                return 0;
            }
        })

    });
}
