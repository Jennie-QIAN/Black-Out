export class Game {

    constructor(levels) {
        this.levels = levels;
        this.currentLevelNum = null;
        this.history = [];
        this.boxToTarget = 0;
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

    getCurrentMap() {
        return this.history[this.history.length - 1];
    }

    getCurrentLevelNum() {
        return this.currentLevelNum;
    }

    copyMap(map) {
        return JSON.parse(JSON.stringify(map));
    }

    cancel(){
        if (this.history.length === 1) return;
        this.history.pop();
    }

    getPlayerLocation() {
        const currentMap = this.getCurrentMap();
        const rows = currentMap.length;
        const cols = currentMap[0].length;

        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                if (currentMap[r][c] === 1) {
                    return {
                        r: r,
                        c: c
                    };
                }
            }
        }

        throw new Error('There is no player in the map.');
    }

    move(direction) {
        const currentMap = this.copyMap(this.getCurrentMap());
        const playerLocation = this.getPlayerLocation();
        const playerRow = playerLocation.r;
        const playerCol = playerLocation.c;
        let deltaR, deltaC;


        switch (direction) {
            case 'up':
                deltaR = -1;
                deltaC = 0;
                break;
            case 'down':
                deltaR = 1;
                deltaC = 0;
                break;
            case 'left':
                deltaR = 0;
                deltaC = -1;
                break;
            case 'right':
                deltaR = 0;
                deltaC = 1;
                break;
        }

        if (currentMap[playerRow + deltaR][playerCol + deltaC] === 2 || currentMap[playerRow + deltaR][playerCol + deltaC] === undefined) {
            return;
        }

        if (currentMap[playerRow + deltaR][playerCol + deltaC] === 3 || currentMap[playerRow + deltaR][playerCol + deltaC] === 5) {
            if (currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] === 0) {
                currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] = 3;
            } else if (currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] === 4) {
                currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] = 5;
                if (currentMap[playerRow + deltaR][playerCol + deltaC] === 3) {
                    this.boxToTarget++;
                }
            }
            currentMap[playerRow + deltaR][playerCol + deltaC] = 1;

            if (this.history[0][playerRow][playerCol] === 1) {
                currentMap[playerRow][playerCol] = 0;
            } else {
                currentMap[playerRow][playerCol] = this.history[0][playerRow][playerCol];
            }

        } else if (currentMap[playerRow + deltaR][playerCol + deltaC] === 0 || currentMap[playerRow + deltaR][playerCol + deltaC] === 4) {
            currentMap[playerRow + deltaR][playerCol + deltaC] = 1;
            if (this.history[0][playerRow][playerCol] === 1) {
                currentMap[playerRow][playerCol] = 0;
            } else {
                currentMap[playerRow][playerCol] = this.history[0][playerRow][playerCol];
            }
        }
        this.history.push(currentMap);
    }

    moveUp() {
        this.move('up');
    }

    moveDown() {
        this.move('down');
    }

    moveLeft() {
        this.move('left');
    }

    moveRight() {
        this.move('right');
    }
}