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
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const sessionStorage = sessionStorage_1.SessionStorage.getInstance();
sessionStorage.set('SS', 'user_count', 0);
sessionStorage.set('SS', 'users', []);
sessionStorage.set('SS', 'room_count', 0);
sessionStorage.set('SS', 'rooms', []);
// sessionStorage.set('SS', 'io', io);
(0, index_1.startSockets)(io);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map