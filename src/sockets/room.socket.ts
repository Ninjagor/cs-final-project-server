import { Server } from "socket.io";
import { SessionSocket } from "../models/SessionSocket";
import { SessionStorage } from "../storage/sessionStorage";
import { sendGlobalChat } from "../services/chat/sendMessage";
import { UserInterface } from "../models/User";
import { generateUuid } from "../services/rand/genuuid.service";
import { RoomInterface } from "../models/Room";


export default function roomSocket(io: Server) {
    const storage = SessionStorage.getInstance();
    io.on('connection', (socket: SessionSocket) => {
        socket.on('join_room', (roomname: string) => {
            let rooms = storage.get('SS', 'rooms');
            let current_room: RoomInterface | null;
            for (let i = 0; i < rooms.length;  i++) {
                if (rooms[i].roomname == roomname) {
                    current_room = rooms[i];
                    break;
                }
            };
            if (!current_room) {
                socket.emit("error", "room with that name does not exist.");
            } else {

                socket.currentroom = {
                    roomid: current_room.roomid,
                    role: "member" as "member" | "host",
                    roomname: roomname
                }

                const users = storage.get('SS', 'users');

                users.forEach((user: UserInterface) => {
                   if (user.userid == socket.userid) {
                        user.currentroom = {
                            roomid: current_room.roomid,
                            role: "member" as "member" | "host",
                            roomname: roomname
                        };
                    } ;
                });

                const members = current_room.members;
                members.push({
                    userid: socket.userid,
                    role: "member" as "host" | "member"
                })

                rooms.forEach((room: RoomInterface) => {
                   if(room.roomid == current_room.roomid) {
                        room.members = members;
                    } 
                });
                
                socket.join(roomname);
                io.to(roomname).emit("global_chat", `[system]: ${socket.username} has joined room ${roomname}`);
                storage.set('SS', 'rooms', rooms);
                storage.set('SS', 'users', users);
            }
        })
        socket.on('create_room', (roomname: string) => {
            const roomid = generateUuid();            
            const hostid = socket.userid;
            const members = [{
                userid: hostid,
                role: "host" as "host" | "member"
            }];

            const new_room: RoomInterface = {
                roomid: roomid,
                roomname: roomname,
                hostid: hostid,
                members: members
            }

            const rooms = storage.get('SS', "rooms");
            rooms.push(new_room);
            storage.set('SS', "rooms", rooms);
            storage.set('SS', 'room_count', storage.get('SS', 'room_count') + 1);

            socket.currentroom = {
                roomid: roomid,
                role: "host" as "member" | "host",
                roomname: roomname
            }

            const users = storage.get('SS', 'users');

            users.forEach((user: UserInterface) => {
               if (user.userid == socket.userid) {
                    user.currentroom = {
                        roomid: roomid,
                        role: "host" as "member" | "host",
                        roomname: roomname
                    };
                } ;
            });

            storage.set('SS', 'users', users);

            socket.join(roomname);
            sendGlobalChat(io, `[system]: ${socket.username} has created the room ${roomname}`);
        })
    });
} 
 
