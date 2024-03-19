"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionStorage_1 = require("../storage/sessionStorage");
function emitActiveUserCount(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.emit('user_count', storage.get('SS', 'user_count'));
}
exports.default = emitActiveUserCount;
//# sourceMappingURL=emitUserCount.action.js.map