import { Server } from "socket.io";
import { SessionStorage } from "../storage/sessionStorage";
import { SessionSocket } from "../models/SessionSocket";
import { Player } from "../models/Player";

export default function gameSocket(io: Server) {
    const storage = SessionStorage.getInstance();

    io.on('connection', (socket: SessionSocket) => {
        socket.on('join_game', () => {
            console.log("joining_game");
            let gameDetails = storage.get('SS', 'game_details');
            const new_player = new Player({});
            gameDetails.push(new_player);
            socket.playerid = new_player.id;
            storage.set('SS', 'game_details', gameDetails);
        })

        socket.on('get_game_details', () => {
            let gameDetails = storage.get('SS', 'game_details');
            socket.emit('game_details', gameDetails);
        })
    });
}