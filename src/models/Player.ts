import { v4 as uuidv4 } from 'uuid';

export class Player {
    id: string;
    x: number;
    y: number;
    size: number;
    constructor(data: {
        x?: number, y?: number, length?: number, size?: number
    }) {
        const { x = Math.random() * (500 + 500) - 500, y = Math.random() * (500 + 500) - 500, length = 10, size = 2 } = data;
        
        this.id = uuidv4();
        this.x = x;
        this.y = y;
        this.size = size;
    }
}