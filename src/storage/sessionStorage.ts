interface SessionData {
    [key: string]: any;
}

export class SessionStorage {
    private static instance: SessionStorage;
    private data: { [sessionId: string]: SessionData } = {};

    private constructor() {}

    public static getInstance(): SessionStorage {
        if (!SessionStorage.instance) {
            SessionStorage.instance = new SessionStorage();
        }
        return SessionStorage.instance;
    }

    public set(sessionId: string, key: string, value: any): void {
        if (!this.data[sessionId]) {
            this.data[sessionId] = {};
        }
        this.data[sessionId][key] = value;
    }

    public get(sessionId: string, key: string): any {
        return this.data[sessionId]?.[key];
    }

    public remove(sessionId: string, key: string): void {
        if (this.data[sessionId]) {
            delete this.data[sessionId][key];
            if (Object.keys(this.data[sessionId]).length === 0) {
                delete this.data[sessionId];
            }
        }
    }
}
