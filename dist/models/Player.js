"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const uuid_1 = require("uuid");
const Dot_1 = require("./Dot");
class Player {
    constructor(data) {
        const { x = Math.random() * (500 + 500) - 500, y = Math.random() * (500 + 500) - 500, length = 10, size = 2 } = data;
        this.id = (0, uuid_1.v4)();
        this.x = x;
        this.y = y;
        this.length = length;
        this.size = size;
        this.dots = [new Dot_1.Dot(x, y, "head")];
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map