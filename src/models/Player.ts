import { v4 as uuidv4 } from 'uuid';
import { Dot } from './Dot';

export class Player {
    id: string;
    x: number;
    y: number;
    length: number;
    size: number;
    dots: Dot[];
    constructor(data: {
        x?: number, y?: number, length?: number, size?: number
    }) {
        const { x = Math.random() * (500 + 500) - 500, y = Math.random() * (500 + 500) - 500, length = 10, size = 2 } = data;
        
        this.id = uuidv4();
        this.x = x;
        this.y = y;
        this.length = length;
        this.size = size;
        this.dots = [new Dot(x, y, "head")];
    }
}