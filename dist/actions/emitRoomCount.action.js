"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionStorage_1 = require("../storage/sessionStorage");
function emitRoomCount(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.emit('room_count', storage.get('SS', 'room_count'));
}
exports.default = emitRoomCount;
//# sourceMappingURL=emitRoomCount.action.js.map