"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const uuid_1 = require("uuid");
class Player {
    constructor(data) {
        const { x = Math.random() * (500), y = Math.random() * (500), size = 2 } = data;
        this.id = (0, uuid_1.v4)();
        this.x = x;
        this.y = y;
        this.size = size;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map