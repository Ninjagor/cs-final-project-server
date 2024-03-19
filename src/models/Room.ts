export interface RoomInterface {
    roomid: string;
    roomname: string;
    hostid: string;
    members: {
        userid: string;
        role: "member" | "host";
    }[];
}
