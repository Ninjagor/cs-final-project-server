export class Dot {
    x: number;
    y: number;
    type: "head" | "body";
    constructor(x: number, y: number, type: "head" | "body") {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}