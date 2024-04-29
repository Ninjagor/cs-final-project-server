import app from "./app";
import http from "http";
import { Server } from "socket.io";
import { startSockets } from "./sockets/index";
import { SessionStorage } from "./storage/sessionStorage";
import { PlayerBuffer } from "./services/buffers/PlayerBuffer";
import { Dot } from "./models/Dot";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const sessionStorage = SessionStorage.getInstance();

const playerBuffer = new PlayerBuffer({
    playerCount: 1
});

sessionStorage.set('SS', 'user_count', 0);
sessionStorage.set('SS', 'users', []);
sessionStorage.set('SS', 'room_count', 0);
sessionStorage.set('SS', 'rooms', []);
sessionStorage.set('SS', 'game_details', []);
sessionStorage.set('SS', 'player_buffer', playerBuffer);
const dots: Dot[] = []
for (let i = 0; i < 350; i++) {
    const dot = new Dot();
    dots.push(dot);
}
sessionStorage.set('SS', 'dots', dots);
// sessionStorage.set('SS', 'io', io);

startSockets(io);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
