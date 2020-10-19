export class Game {

    constructor(levels) {
        this.levels = levels;
        this.currentMap = [];
        this.currentLevelNum = null;
    }

    getCurrentMap() {
        return this.currentMap;
    }

    getCurrentLevelNum() {
        return this.currentLevelNum;
    }

    chooseLevel(levelNumber) {
        this.currentLevelNum = levelNumber;
        this.currentMap = this.levels.getMap(this.currentLevelNum);
    }

    choosePreviousLevel() {
        this.chooseLevel(this.currentLevelNum - 1);
    }

    chooseNextLevel() {
        this.chooseLevel(this.currentLevelNum + 1);
    }

    moveUpPlayer() {
        const playerLocation = this.getPlayerLocation();
        const playerNextLocation = {
            r: playerLocation.r -1,
            c: playerLocation.c
        };

        if (this.currentMap[playerNextLocation.r][playerNextLocation.c] === 2) {
            return;
        }

        this.currentMap[playerNextLocation.r][playerNextLocation.c] = 1;
        this.currentMap[playerLocation.r][playerLocation.c] = 0;
    }

    getPlayerLocation() {
        const currentMap = this.getCurrentMap();
        const rows = currentMap.length;
        const cols = currentMap[0].length;

        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                if (currentMap[r][c] === 1) {
                    return { r: r, c: c };
                }
            }
        }
    }
}