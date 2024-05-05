"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.player_serialize = void 0;
function player_serialize({ x, y, id, size, username }) {
    const buffer = new ArrayBuffer(24 + (id ? id.length : 0) + (username ? username.length : 0));
    const view = new DataView(buffer);
    view.setFloat32(0, x, true); // x position
    view.setFloat32(4, y, true); // y position
    view.setUint32(8, id ? id.length : 0, true); // id length
    view.setUint32(12, size, true); // size
    view.setUint32(16, username ? username.length : 0, true); // username length
    let offset = 20; // start of id length field
    if (id) {
        for (let i = 0; i < id.length; i++) {
            view.setUint8(offset, id.charCodeAt(i));
            offset++;
        }
    }
    if (username) {
        for (let i = 0; i < username.length; i++) {
            view.setUint8(offset, username.charCodeAt(i));
            offset++;
        }
    }
    return buffer;
}
exports.player_serialize = player_serialize;
//# sourceMappingURL=playerSerialization.js.map