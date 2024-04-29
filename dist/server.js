"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const index_1 = require("./sockets/index");
const sessionStorage_1 = require("./storage/sessionStorage");
const PlayerBuffer_1 = require("./services/buffers/PlayerBuffer");
const Dot_1 = require("./models/Dot");
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const sessionStorage = sessionStorage_1.SessionStorage.getInstance();
const playerBuffer = new PlayerBuffer_1.PlayerBuffer({
    playerCount: 1
});
sessionStorage.set('SS', 'user_count', 0);
sessionStorage.set('SS', 'users', []);
sessionStorage.set('SS', 'room_count', 0);
sessionStorage.set('SS', 'rooms', []);
sessionStorage.set('SS', 'game_details', []);
sessionStorage.set('SS', 'player_buffer', playerBuffer);
const dots = [];
for (let i = 0; i < 100; i++) {
    const dot = new Dot_1.Dot();
    dots.push(dot);
}
sessionStorage.set('SS', 'dots', dots);
// sessionStorage.set('SS', 'io', io);
(0, index_1.startSockets)(io);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map