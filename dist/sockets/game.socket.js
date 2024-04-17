"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sessionStorage_1 = require("../storage/sessionStorage");
const Player_1 = require("../models/Player");
function gameSocket(io) {
    const storage = sessionStorage_1.SessionStorage.getInstance();
    io.on('connection', (socket) => {
        socket.on('join_game', () => {
            console.log("joining_game");
            let gameDetails = storage.get('SS', 'game_details');
            const new_player = new Player_1.Player({});
            gameDetails.push(new_player);
            socket.playerid = new_player.id;
            storage.set('SS', 'game_details', gameDetails);
            const playerBuffer = storage.get('SS', 'player_buffer');
            playerBuffer.addPlayer({
                id: new_player.id,
                x: new_player.x,
                y: new_player.y,
                size: new_player.size
            });
            storage.set('SS', 'player_buffer', playerBuffer);
            socket.emit('return_player_info', new_player.id);
            socket.playerid = new_player.id;
        });
        socket.on('get_game_details', () => {
            let gameDetails = storage.get('SS', 'game_details');
            socket.emit('game_details', gameDetails, storage.get('SS', 'player_buffer'));
        });
        socket.on('update_player', (playerid, details) => {
            let gameDetails = storage.get('SS', 'game_details');
            // let selected_player: Player | null = null;
            let new_game_details = [];
            for (const player of gameDetails) {
                let new_player = player;
                if (player.id == playerid) {
                    new_player = details;
                    // selected_player = player;
                }
                new_game_details.push(new_player);
            }
            storage.set('SS', 'game_details', new_game_details);
        });
    });
}
exports.default = gameSocket;
//# sourceMappingURL=game.socket.js.map