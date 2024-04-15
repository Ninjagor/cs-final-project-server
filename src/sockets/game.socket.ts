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
            socket.emit('return_player_info', new_player.id);
        })

        socket.on('get_game_details', () => {
            let gameDetails = storage.get('SS', 'game_details');
            socket.emit('game_details', gameDetails);
        })

        socket.on('update_player', (playerid: string, details: Player) => {
            let gameDetails: Player[] | null = storage.get('SS', 'game_details');
            // let selected_player: Player | null = null;
            let new_game_details = [];
            for (const player of gameDetails) {
                let new_player: Player = player;
                if (player.id == playerid) {
                    new_player = details;
                    // selected_player = player;
                }
                new_game_details.push(new_player);
            }
            storage.set('SS', 'game_details', new_game_details);
        })
    });
}