export class Game {

    constructor(levels) {
        this.levels = levels;
        this.currentLevelNum = null;
        this.history = [];
    }

    getCurrentMap() {
        return this.history[this.history.length - 1];
    }

    getCurrentLevelNum() {
        return this.currentLevelNum;
    }

    chooseLevel(levelNumber) {
        this.currentLevelNum = levelNumber;
        this.history.push(this.levels.getMap(this.currentLevelNum));
    }

    choosePreviousLevel() {
        this.chooseLevel(this.currentLevelNum - 1);
    }

    chooseNextLevel() {
        this.chooseLevel(this.currentLevelNum + 1);
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

    moveUpPlayer() {
        const playerLocation = this.getPlayerLocation();
        const playerNextLocation = {
            r: playerLocation.r -1,
            c: playerLocation.c
        };

        const currentMap = this.getCurrentMap();
        if (currentMap[playerNextLocation.r][playerNextLocation.c] === 2) {
            return;
        }

        currentMap[playerNextLocation.r][playerNextLocation.c] = 1;
        currentMap[playerLocation.r][playerLocation.c] = 0;
        this.history.push(currentMap);
    }

    moveDownPlayer() {
        const playerLocation = this.getPlayerLocation();
        const playerNextLocation = {
            r: playerLocation.r + 1,
            c: playerLocation.c
        };

        const currentMap = this.getCurrentMap();
        if (currentMap[playerNextLocation.r][playerNextLocation.c] === 2) {
            return;
        }

        currentMap[playerNextLocation.r][playerNextLocation.c] = 1;
        currentMap[playerLocation.r][playerLocation.c] = 0;
        this.history.push(currentMap);
    }

    moveLeftPlayer() {
        const playerLocation = this.getPlayerLocation();
        const playerNextLocation = {
            r: playerLocation.r,
            c: playerLocation.c - 1
        };

        const currentMap = this.getCurrentMap();
        if (currentMap[playerNextLocation.r][playerNextLocation.c] === 2) {
            return;
        }

        currentMap[playerNextLocation.r][playerNextLocation.c] = 1;
        currentMap[playerLocation.r][playerLocation.c] = 0;
        this.history.push(currentMap);
    }

    moveRightPlayer() {
        const playerLocation = this.getPlayerLocation();
        const playerNextLocation = {
            r: playerLocation.r,
            c: playerLocation.c + 1
        };

        const currentMap = this.getCurrentMap();
        if (currentMap[playerNextLocation.r][playerNextLocation.c] === 2) {
            return;
        }

        currentMap[playerNextLocation.r][playerNextLocation.c] = 1;
        currentMap[playerLocation.r][playerLocation.c] = 0;
        this.history.push(currentMap);
    }

    checkIfBoxAbove() {
        const r = this.getPlayerLocation().r - 1;
        const c = this.getPlayerLocation().c;
        const tileUpValue = this.getCurrentMap()[r][c];
        return (tileUpValue === 3);
    }

    checkIfBoxBelow() {
        const r = this.getPlayerLocation().r + 1;
        const c = this.getPlayerLocation().c;
        const tileUpValue = this.getCurrentMap()[r][c];
        return (tileUpValue === 3);
    }

    checkIfBoxLeft() {
        const r = this.getPlayerLocation().r;
        const c = this.getPlayerLocation().c - 1;
        const tileUpValue = this.getCurrentMap()[r][c];
        return (tileUpValue === 3);
    }

    checkIfBoxRight() {
        const r = this.getPlayerLocation().r;
        const c = this.getPlayerLocation().c + 1;
        const tileUpValue = this.getCurrentMap()[r][c];
        return (tileUpValue === 3);
    }

    moveUpBox() {
        const boxLocation = {
            r: this.getPlayerLocation().r - 1,
            c: this.getPlayerLocation().c
        };

        const boxNextLocation = {
            r: this.getPlayerLocation().r - 2,
            c: this.getPlayerLocation().c
        };

        const currentMap = this.getCurrentMap();

        if (currentMap[boxNextLocation.r][boxNextLocation.c] === 2) {
            return;
        }

        currentMap[boxNextLocation.r][boxNextLocation.c] = 3;
        currentMap[boxLocation.r][boxLocation.c] = 0;
        this.history.push(currentMap);
    }
}

