"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const uuid_1 = require("uuid");
class Player {
    constructor(data) {
        const { x = Math.random() * (5000), y = Math.random() * (5000), size = 2 } = data;
        this.id = (0, uuid_1.v4)();
        this.x = x;
        this.y = y;
        this.size = size;
        this.imageNumber = Math.round(Math.random() * (4));
    }
    serialize() {
        const buffer = new ArrayBuffer(24 + (this.username ? this.username.length : 0));
        const view = new DataView(buffer);
        view.setFloat32(0, this.x, true); // x position
        view.setFloat32(4, this.y, true); // y position
        view.setFloat32(8, this.size, true); // size
        view.setUint32(12, this.username ? this.username.length : 0, true); // username length
        let offset = 16;
        if (this.username) {
            for (let i = 0; i < this.username.length; i++) {
                view.setUint8(offset, this.username.charCodeAt(i));
                offset++;
            }
        }
        return buffer;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map