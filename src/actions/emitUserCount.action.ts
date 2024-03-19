import { Server } from "socket.io"; 
import { SessionStorage } from "../storage/sessionStorage";


export default function emitActiveUserCount(io: Server) {
    const storage = SessionStorage.getInstance();
    io.emit('user_count', storage.get('SS', 'user_count'));
}
