
export class Levels {
    constructor(maps) {
        this.maps = maps;
    }
    getMap(levelNumber) {
        const map = this.maps[levelNumber-1];
        if (!map) {
            throw new Error(`Level ${levelNumber} does not exist.`);
        }
        return map;
    }
}