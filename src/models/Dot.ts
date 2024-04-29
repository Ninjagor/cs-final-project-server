import { v4 as uuidv4 } from 'uuid';

export class Dot {
    x: number;
    y: number;
    type: "food";
    id: string;
    constructor(x: number = Math.random() * (5000), y : number = Math.random() * (5000), type: "food" = "food") {
        this.x = x;
        this.y = y;
        this.type = type;
        this.id = uuidv4();
    }
}