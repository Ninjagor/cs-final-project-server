import { Server } from "socket.io";
import { SessionSocket } from "../models/SessionSocket";
import { SessionStorage } from "../storage/sessionStorage";
import emitUserCount from "../actions/emitUserCount.action";
import { generateUuid } from "../services/rand/genuuid.service";
import { generateUsername } from "../services/rand/genusername.service";
import { sendGlobalChat } from "../services/chat/sendMessage";
import { UserInterface } from "../models/User";
import { RoomInterface } from "../models/Room";

export default function configureSocket(io: Server) {
    const storage = SessionStorage.getInstance();
    io.on('connection', (socket: SessionSocket) => {

        socket.on("ping", (callback) => {
            callback();
        }) 
    
        socket.userid = generateUuid();
        socket.username = generateUsername();
        socket.currentroom = {
            roomid: null,
            role: null,
            roomname: null
        };
        storage.set('SS', 'user_count', storage.get('SS', 'user_count') + 1);
        sendGlobalChat(io, `[system]: ${socket.username} has joined the server`)
        emitUserCount(io);

        socket.emit('connection_details', {
            "userid": socket.userid,
            "username": socket.username
        });

        const users: UserInterface[] = storage.get('SS', 'users');

        const curr_user: UserInterface = {
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
            for (let i = 0; i < users.length -1; i++) {
                if (users[i].userid == socket.userid) {
                    currentUser = users[i];
                    break;
                }
            };
            let currentroomid = socket.currentroom.roomid;
            if (socket.currentroom.role == "host") {
                let rooms = storage.get('SS', 'rooms');
                let current_room;
                for (let i = 0; i < rooms.length;  i++) {
                    if (rooms[i].roomid == socket.currentroom.roomid) {
                        current_room = rooms[i].roomname;
                        break;
                    }
                };
                sendGlobalChat(io, `[server]: the host has ended the room ${current_room}`);

                const filtered_rooms = rooms.filter((room: RoomInterface) => {
                    return room.roomid != currentroomid;
                })
                storage.set('SS', 'rooms', filtered_rooms);
                storage.set('SS', 'room_count', storage.get('SS', 'room_count') - 1);
                if (storage.get('SS', 'room_count') < 0) {
                    storage.set('SS', 'room_count', 0);
                }
            }
            const filtered_users = users.filter((user: UserInterface) => {
                return user.userid != socket.userid
            })
            storage.set('SS', 'users', filtered_users);
            if (socket.currentroom.roomname) {
                let roomname = socket.currentroom.roomname;
                io.to(roomname).emit("global_chat", `[system]: ${socket.username} has left room ${roomname}`);
            }
            sendGlobalChat(io, `[system]: ${socket.username} has left the server`);
            socket.emit('server_response', 'success');
            emitUserCount(io);
        });
    });
}