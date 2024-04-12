"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionStorage_1 = require("../storage/sessionStorage");
const sendMessage_1 = require("../services/chat/sendMessage");
const genuuid_service_1 = require("../services/rand/genuuid.service");
function roomSocket(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.on('connection', (socket) => {
        socket.on('join_room', (roomname) => {
            let rooms = storage.get('SS', 'rooms');
            let current_room;
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].roomname == roomname) {
                    current_room = rooms[i];
                    break;
                }
            }
            ;
            if (!current_room) {
                socket.emit("error", "room with that name does not exist.");
            }
            else {
                socket.currentroom = {
                    roomid: current_room.roomid,
                    role: "member",
                    roomname: roomname
                };
                const users = storage.get('SS', 'users');
                users.forEach((user) => {
                    if (user.userid == socket.userid) {
                        user.currentroom = {
                            roomid: current_room.roomid,
                            role: "member",
                            roomname: roomname
                        };
                    }
                    ;
                });
                const members = current_room.members;
                members.push({
                    userid: socket.userid,
                    role: "member"
                });
                rooms.forEach((room) => {
                    if (room.roomid == current_room.roomid) {
                        room.members = members;
                    }
                });
                socket.join(roomname);
                if (members.length >= 2) {
                    io.to(roomname).emit("start_game", roomname);
                }
                io.to(roomname).emit("global_chat", `[system]: ${socket.username} has joined room ${roomname}`);
                storage.set('SS', 'rooms', rooms);
                storage.set('SS', 'users', users);
            }
        });
        socket.on('create_room', (roomname) => {
            const roomid = (0, genuuid_service_1.generateUuid)();
            const hostid = socket.userid;
            const members = [{
                    userid: hostid,
                    role: "host"
                }];
            const new_room = {
                roomid: roomid,
                roomname: roomname,
                hostid: hostid,
                members: members
            };
            const rooms = storage.get('SS', "rooms");
            rooms.push(new_room);
            storage.set('SS', "rooms", rooms);
            storage.set('SS', 'room_count', storage.get('SS', 'room_count') + 1);
            socket.currentroom = {
                roomid: roomid,
                role: "host",
                roomname: roomname
            };
            const users = storage.get('SS', 'users');
            users.forEach((user) => {
                if (user.userid == socket.userid) {
                    user.currentroom = {
                        roomid: roomid,
                        role: "host",
                        roomname: roomname
                    };
                }
                ;
            });
            storage.set('SS', 'users', users);
            socket.join(roomname);
            (0, sendMessage_1.sendGlobalChat)(io, `[system]: ${socket.username} has created the room ${roomname}`);
        });
    });
}
exports.default = roomSocket;
//# sourceMappingURL=room.socket.js.map