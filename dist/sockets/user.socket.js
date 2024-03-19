"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionStorage_1 = require("../storage/sessionStorage");
const sendMessage_1 = require("../services/chat/sendMessage");
function userSocket(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.on('connection', (socket) => {
        socket.on('change_username', (userid, username) => {
            if (!(storage.get('SS', 'users'))) {
                storage.set('SS', 'users', []);
            }
            if ((!username) || (!userid)) {
                socket.emit('error');
                return;
            }
            if (!username.trim()) {
                socket.emit('error');
                return;
            }
            if (!userid.trim()) {
                socket.emit('error');
                return;
            }
            if (username.toLowerCase().trim() == "system") {
                socket.emit('error');
                return;
            }
            const users = storage.get('SS', 'users');
            let error = true;
            users.forEach((user) => {
                if (user.userid === userid) {
                    error = false;
                }
            });
            if (error) {
                socket.emit('error');
                return;
            }
            if (users == null || users == undefined) {
                socket.emit('error');
                return;
            }
            users.forEach((user) => {
                if (user.userid === userid) {
                    user.username = username;
                }
            });
            storage.set('SS', 'users', users);
            (0, sendMessage_1.sendGlobalChat)(io, `[system]: ${socket.username} changed username to ${username}`);
            socket.username = username;
            socket.emit("success");
            return;
        });
    });
}
exports.default = userSocket;
//# sourceMappingURL=user.socket.js.map