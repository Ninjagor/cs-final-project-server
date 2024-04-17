"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sessionStorage_1 = require("../storage/sessionStorage");
const emitUserCount_action_1 = __importDefault(require("../actions/emitUserCount.action"));
const genuuid_service_1 = require("../services/rand/genuuid.service");
const genusername_service_1 = require("../services/rand/genusername.service");
const sendMessage_1 = require("../services/chat/sendMessage");
function configureSocket(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.on('connection', (socket) => {
        socket.on("ping", (callback) => {
            callback();
        });
        socket.userid = (0, genuuid_service_1.generateUuid)();
        socket.username = (0, genusername_service_1.generateUsername)();
        socket.currentroom = {
            roomid: null,
            role: null,
            roomname: null
        };
        storage.set('SS', 'user_count', storage.get('SS', 'user_count') + 1);
        (0, sendMessage_1.sendGlobalChat)(io, `[system]: ${socket.username} has joined the server`);
        (0, emitUserCount_action_1.default)(io);
        socket.emit('connection_details', {
            "userid": socket.userid,
            "username": socket.username
        });
        const users = storage.get('SS', 'users');
        const curr_user = {
            username: socket.username,
            userid: socket.userid,
            currentroom: {
                roomid: null,
                role: null,
                roomname: null
            },
        };
        users.push(curr_user);
        storage.set('SS', 'users', users);
        socket.on('disconnect', () => {
            storage.set('SS', 'user_count', storage.get('SS', 'user_count') - 1);
            if (storage.get('SS', 'user_count') < 0) {
                storage.set('SS', 'user_count', 0);
            }
            const users = storage.get('SS', 'users');
            let currentUser;
            for (let i = 0; i < users.length - 1; i++) {
                if (users[i].userid == socket.userid) {
                    currentUser = users[i];
                    break;
                }
            }
            ;
            let currentroomid = socket.currentroom.roomid;
            if (socket.currentroom.role == "host") {
                let rooms = storage.get('SS', 'rooms');
                let current_room;
                for (let i = 0; i < rooms.length; i++) {
                    if (rooms[i].roomid == socket.currentroom.roomid) {
                        current_room = rooms[i].roomname;
                        break;
                    }
                }
                ;
                (0, sendMessage_1.sendGlobalChat)(io, `[server]: the host has ended the room ${current_room}`);
                const filtered_rooms = rooms.filter((room) => {
                    return room.roomid != currentroomid;
                });
                storage.set('SS', 'rooms', filtered_rooms);
                storage.set('SS', 'room_count', storage.get('SS', 'room_count') - 1);
                if (storage.get('SS', 'room_count') < 0) {
                    storage.set('SS', 'room_count', 0);
                }
            }
            const filtered_users = users.filter((user) => {
                return user.userid != socket.userid;
            });
            storage.set('SS', 'users', filtered_users);
            if (socket.playerid) {
                // let player_buffer = storage.get('SS', 'player_buffer');
                // player_buffer.removePlayer(socket.playerid);
                // storage.set('SS', 'player_buffer', player_buffer);
            }
            if (socket.currentroom.roomname) {
                let roomname = socket.currentroom.roomname;
                io.to(roomname).emit("global_chat", `[system]: ${socket.username} has left room ${roomname}`);
            }
            (0, sendMessage_1.sendGlobalChat)(io, `[system]: ${socket.username} has left the server`);
            socket.emit('server_response', 'success');
            (0, emitUserCount_action_1.default)(io);
        });
    });
}
exports.default = configureSocket;
//# sourceMappingURL=connection.socket.js.map