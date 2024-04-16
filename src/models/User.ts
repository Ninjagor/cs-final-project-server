export interface UserInterface {
    username: string;
    userid: string;
    playerid?: string;
    currentroom ?: null | {
        roomid: string;
        role: "member" | "host";
        roomname: string | null;
    }
}
