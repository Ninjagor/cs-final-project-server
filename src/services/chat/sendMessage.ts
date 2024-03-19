import { Server } from "socket.io";
import { SessionSocket } from "../../models/SessionSocket";

export function sendGlobalChat(
    io: Server,
    message: string
) {
    io.emit("global_chat", message);
}

export function sendDirectChat(
    socket: SessionSocket,
    message: string
) {
    socket.emit("direct_chat", message);
}

export function sendRoomChat(
    io: Server,
    message: string
) {
    io.emit("room_chat", message);
}
