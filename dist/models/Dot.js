"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dot = void 0;
const uuid_1 = require("uuid");
class Dot {
    constructor(x = Math.random() * (5000), y = Math.random() * (5000), type = "food") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.id = (0, uuid_1.v4)();
    }
}
exports.Dot = Dot;
//# sourceMappingURL=Dot.js.map