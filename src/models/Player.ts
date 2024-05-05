import { v4 as uuidv4 } from 'uuid';

export class Player {
    id: string;
    x: number;
    y: number;
    size: number;
    username?: string;
    constructor(data: {
        x?: number, y?: number, length?: number, size?: number
    }) {
        const { x = Math.random() * (5000), y = Math.random() * (5000), size = 2 } = data;
        
        this.id = uuidv4();
        this.x = x;
        this.y = y;
        this.size = size;
    }

    serialize() {
        const buffer = new ArrayBuffer(24 + (this.username ? this.username.length : 0));
        const view = new DataView(buffer);

        view.setFloat32(0, this.x, true); // x position
        view.setFloat32(4, this.y, true); // y position
        view.setFloat32(8, this.size, true); // size
        view.setUint32(12, this.username ? this.username.length : 0, true); // username length

        let offset = 16;
        if (this.username) {
            for (let i = 0; i < this.username.length; i++) {
                view.setUint8(offset, this.username.charCodeAt(i));
                offset++;
            }
        }

        return buffer;
    }
}