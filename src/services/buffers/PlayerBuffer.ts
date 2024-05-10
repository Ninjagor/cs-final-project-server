// export class PlayerBuffer {
//     PLAYER_BIT_SIZE: number;
//     playerCount: number;
//     playersBuffer: ArrayBuffer;
//     playerView: DataView;
//     PLAYER_MAP: Map<any, any>;
//     playerIndex: number;
//     BIT_BUFFER_SIZE: number;
//     constructor(data: {
//         playerCount: number
//     }) {
//         let { playerCount = 1 } = data;
//         if (playerCount > 1) {
//             playerCount = 1;
//         }

//         this.PLAYER_BIT_SIZE =  96; // 96 bits per player buffer
//         this.playerCount = playerCount;
//         this.playersBuffer = new ArrayBuffer(this.PLAYER_BIT_SIZE * this.playerCount)
//         this.playerView = new DataView(this.playersBuffer);
//         this.PLAYER_MAP = new Map();
//         this.playerIndex = 0;
//         this.BIT_BUFFER_SIZE = this.PLAYER_BIT_SIZE * this.playerCount > 0 ? this.PLAYER_BIT_SIZE * this.playerCount : 1;
//     }

//     alloc(newSize: number) {
//         if (newSize > 10000000) {
//             return;
//         }
//         const newBuffer = new ArrayBuffer(newSize);	
//         this.playerView = new DataView(this.playersBuffer);

//         this.BIT_BUFFER_SIZE = this.PLAYER_BIT_SIZE * this.playerCount > 0 ? this.PLAYER_BIT_SIZE * this.playerCount : 1;
//     }

//     realloc(newSize: number) {
//         const currentSize = this.playerCount;
//         if (newSize < currentSize) {
//             const newBuffer = new ArrayBuffer(newSize);
//             const newView = new Uint8Array(newBuffer);
//             const currentView = new Uint8Array(this.playersBuffer);
//             newView.set(currentView.subarray(0, newSize));
//             this.playersBuffer = newBuffer;
//             this.playerView = new DataView(this.playersBuffer);
//         } else if (newSize > currentSize) {
//             this.alloc(newSize);
//         }

//         this.BIT_BUFFER_SIZE = this.PLAYER_BIT_SIZE * this.playerCount > 0 ? this.PLAYER_BIT_SIZE * this.playerCount : 1;
//     }

//     addPlayer(player: {
//         id: any,
//         x: number,
//         y: number,
//         size: number
//     }) {
//         if (this.playerIndex < this.playerCount) {
//             const offset = this.playerIndex * this.PLAYER_BIT_SIZE;
//             this.playerView.setInt16(offset, player.id, true);
//             this.playerView.setFloat32(offset + 2, player.x, true);
//             this.playerView.setFloat32(offset + 6, player.y, true);
//             this.playerView.setInt16(offset + 10, player.size, true);
//             this.PLAYER_MAP.set(player.id, this.playerIndex);
//             this.playerIndex++;
//             this.playerCount++;
//         } else {
//             console.error("No available space for new player entity");
//         }
//     }

//     removePlayer(id: string) {
//         const index = this.PLAYER_MAP.get(id);
//         if (index !== undefined) {
//             const offset = (index as number) * this.PLAYER_BIT_SIZE;
//             this.playerView.setInt16(offset, 0, true);
//             this.playerView.setFloat32(offset + 2, 0, true);
//             this.playerView.setFloat32(offset + 6, 0, true);
//             this.playerView.setInt16(offset + 10, 0, true);
//             this.PLAYER_MAP.delete(id);
//             this.playerIndex--;
//             this.playerCount--;
//         }
//     }

//     editPlayer(id: any, newData: {
//         x?: number,
//         y?: number,
//         size?: number
//     }) {
//         const index = this.PLAYER_MAP.get(id);
//         if (index !== undefined) {
//             const offset = (index as number) * this.PLAYER_BIT_SIZE;
//             if (newData.x !== undefined) {
//                 this.playerView.setFloat32(offset + 2, newData.x, true);
//             }
//             if (newData.y !== undefined) {
//                 this.playerView.setFloat32(offset + 6, newData.y, true);
//             }
//             if (newData.size !== undefined) {
//                 this.playerView.setInt16(offset + 10, newData.size, true);
//             }
//         }
//     }
// }

export class PlayerBuffer {
    PLAYER_BIT_SIZE: number;
    playerCount: number;
    players: Array<{ id: any, x: number, y: number, size: number, username?: string, imageNumber: number }>;
    PLAYER_MAP: Map<any, any>;
    playerIndex: number;

    constructor(data: { playerCount: number }) {
        let { playerCount = 1 } = data;
        if (playerCount > 1) {
            playerCount = 1;
        }

        this.PLAYER_BIT_SIZE = 96; // 96 bits per player buffer
        this.playerCount = playerCount;
        this.players = new Array(this.playerCount).fill(null);
        this.PLAYER_MAP = new Map();
        this.playerIndex = 0;
    }

    addPlayer(player: { id: any, x: number, y: number, size: number, username?: string, imageNumber: number }) {
        if (this.playerIndex < this.playerCount) {
            this.players[this.playerIndex] = player;
            this.PLAYER_MAP.set(player.id, this.playerIndex);
            this.playerIndex++;
            this.playerCount++;
        } else {
            const newSize = this.players.length + 1;
            const newPlayersArray = new Array(newSize).fill(null);
            this.players.forEach((p, index) => {
                newPlayersArray[index] = p;
            });
            this.players = newPlayersArray;
            this.players[this.playerIndex] = player;
            this.PLAYER_MAP.set(player.id, this.playerIndex);
            this.playerIndex++;
            this.playerCount++;
        }
    }

    // removePlayer(id: string) {
    //     const index = this.PLAYER_MAP.get(id);
    //     if (index !== undefined) {
    //         this.players[index] = null;
    //         this.PLAYER_MAP.delete(id);
    //         this.playerIndex--;
    //         this.playerCount--;
    //     }
    // }

    removePlayer(id: string) {
        const index = this.PLAYER_MAP.get(id);
        if (index !== undefined) {
            this.players.splice(index, 1);
            this.PLAYER_MAP.delete(id);
            this.updatePlayerIndices(index);
            this.playerCount--;
            this.playerIndex--;
        }
    }
    
    private updatePlayerIndices(startIndex: number) {
        for (let i = startIndex; i < this.players.length; i++) {
            const player = this.players[i];
            if (player) {
                this.PLAYER_MAP.set(player.id, i);
            }
        }
    }

    editPlayer(id: any, newData: { x?: number, y?: number, size?: number }) {
        const index = this.PLAYER_MAP.get(id);
        if (index !== undefined) {
            const currentPlayer = this.players[index];
            const updatedPlayer = { ...currentPlayer, ...newData };
            this.players[index] = updatedPlayer;
        }
    }

    increaseSize(id: any) {
        const index = this.PLAYER_MAP.get(id);
        if (index !== undefined) {
            const currentPlayer = this.players[index];
            const newData = {
                x: currentPlayer.x,
                y: currentPlayer.y,
                size: currentPlayer.size + 0.1
            }
            const updatedPlayer = { ...currentPlayer, ...newData };
            this.players[index] = updatedPlayer;
        }
    }
}
