import { Server } from "socket.io";
import { SessionSocket } from "../models/SessionSocket";
import { SessionStorage } from "../storage/sessionStorage";
import { sendGlobalChat } from "../services/chat/sendMessage";
import { UserInterface } from "../models/User";


export default function userSocket(io: Server) {
    const storage = SessionStorage.getInstance();
    io.on('connection', (socket: SessionSocket) => {
        socket.on('change_username', (userid: string, username: string) => {
            if (!(storage.get('SS', 'users'))) {
                storage.set('SS', 'users', []);
            }
            if ((!username) || (!userid)) {
                socket.emit('error');
                return
            }

            if (!username.trim()) {
                socket.emit('error');
                return
            }

            if (!userid.trim()) {
                socket.emit('error');
                return
            }


            if (username.toLowerCase().trim() == "system") {
                socket.emit('error');
                return
            }

            const users = storage.get('SS', 'users')


            let error = true;
            users.forEach((user: UserInterface) => {
                if (user.userid === userid) {
                    error = false;
                }
            });

            if (error) {
                socket.emit('error');
                return
            }
            

            if (users == null || users == undefined) {
                socket.emit('error');
                return
            }

            
            users.forEach((user: UserInterface) => {
                if (user.userid === userid) {
                  user.username = username;
                }
            });

            storage.set('SS', 'users', users);


            sendGlobalChat(io, `[system]: ${socket.username} changed username to ${username}`)

            socket.username = username;
            socket.emit("success");
            return
        })
    });

}
