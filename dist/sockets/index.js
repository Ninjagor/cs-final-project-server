"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSockets = void 0;
const connection_socket_1 = __importDefault(require("./connection.socket"));
const chat_socket_1 = __importStar(require("./chat.socket"));
const user_socket_1 = __importDefault(require("./user.socket"));
const room_socket_1 = __importDefault(require("./room.socket"));
const game_socket_1 = __importDefault(require("./game.socket"));
function startSockets(io) {
    (0, connection_socket_1.default)(io);
    (0, chat_socket_1.default)(io);
    (0, chat_socket_1.roomChatSocket)(io);
    (0, user_socket_1.default)(io);
    (0, room_socket_1.default)(io);
    (0, game_socket_1.default)(io);
}
exports.startSockets = startSockets;
//# sourceMappingURL=index.js.map