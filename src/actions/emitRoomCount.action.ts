import { Server } from "socket.io"; 
import { SessionStorage } from "../storage/sessionStorage";


export default function emitRoomCount(io: Server) {
    const storage = SessionStorage.getInstance();
    io.emit('room_count', storage.get('SS', 'room_count'));
}
