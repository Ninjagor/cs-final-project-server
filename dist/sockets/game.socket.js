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
        });
        socket.on('get_game_details', () => {
            let gameDetails = storage.get('SS', 'game_details');
            socket.emit('game_details', gameDetails);
        });
    });
}
exports.default = gameSocket;
//# sourceMappingURL=game.socket.js.map