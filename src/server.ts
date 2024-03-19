import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { startSockets } from "./sockets/index";
import { SessionStorage } from "./storage/sessionStorage";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

const sessionStorage = SessionStorage.getInstance();
sessionStorage.set('SS', 'user_count', 0);
sessionStorage.set('SS', 'users', []);
sessionStorage.set('SS', 'room_count', 0);
sessionStorage.set('SS', 'rooms', []);
// sessionStorage.set('SS', 'io', io);

startSockets(io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
