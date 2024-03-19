"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStorage = void 0;
class SessionStorage {
    constructor() {
        this.data = {};
    }
    static getInstance() {
        if (!SessionStorage.instance) {
            SessionStorage.instance = new SessionStorage();
        }
        return SessionStorage.instance;
    }
    set(sessionId, key, value) {
        if (!this.data[sessionId]) {
            this.data[sessionId] = {};
        }
        this.data[sessionId][key] = value;
    }
    get(sessionId, key) {
        var _a;
        return (_a = this.data[sessionId]) === null || _a === void 0 ? void 0 : _a[key];
    }
    remove(sessionId, key) {
        if (this.data[sessionId]) {
            delete this.data[sessionId][key];
            if (Object.keys(this.data[sessionId]).length === 0) {
                delete this.data[sessionId];
            }
        }
    }
}
exports.SessionStorage = SessionStorage;
//# sourceMappingURL=sessionStorage.js.map