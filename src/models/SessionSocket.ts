import { Socket } from "socket.io";

export class SessionSocket extends Socket {
    username: string | null | undefined;
    userid: string | null | undefined;
    currentroom ?: null | {
        roomid: string | null;
        role: "member" | "host" | null;
        roomname: string | null;
    }
}
