import { Server } from "socket.io";
import { SessionStorage } from "../storage/sessionStorage";
import { SessionSocket } from "../models/SessionSocket";
import { Player } from "../models/Player";
import { PlayerBuffer } from "../services/buffers/PlayerBuffer";
import { Dot } from "../models/Dot";

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

            const playerBuffer: PlayerBuffer = storage.get('SS', 'player_buffer');

            playerBuffer.addPlayer({
                id: new_player.id,
                x: new_player.x,
                y: new_player.y,
                size: new_player.size
            });

            storage.set('SS', 'player_buffer', playerBuffer);

            socket.emit('return_player_info', new_player.id);
            socket.playerid = new_player.id;
        })

        socket.on('generate_new_dots', () => {
            const dots: Dot[] = []
            for (let i = 0; i < 350; i++) {
                const dot = new Dot();
                dots.push(dot);
            }
            sessionStorage.set('SS', 'dots', dots);
        })

        socket.on('get_game_details', () => {
            let gameDetails = storage.get('SS', 'game_details');
            socket.emit('game_details', storage.get('SS', 'player_buffer'), storage.get('SS', 'dots'));
        })

        socket.on('eat_dot', (dot_id: string, player_id: string) => {
            const dots: Dot[] = storage.get('SS', 'dots');
            const players: PlayerBuffer = storage.get('SS', 'player_buffer');

            for (let i = 0; i < dots.length; i++) {
                if (dots[i].id == dot_id) {
                    dots.splice(i, i);
                    const dot = new Dot();
                    dots.push(dot);
                }
            }
            players.increaseSize(player_id)
            storage.set('SS', 'dots', dots);
            storage.set('SS', 'player_buffer', players);
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
            let player_buffer: PlayerBuffer = storage.get('SS', 'player_buffer');
            player_buffer.editPlayer(playerid, {
                x: details.x,
                y: details.y,
                size: details.size
            })
            storage.set('SS', 'player_buffer', player_buffer);
        })
    });
}