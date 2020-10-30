const preloadOnTargetSound = new Audio("src/audio/ontarget.mp3");
preloadOnTargetSound.load();

export class Game {

    constructor(levels) {
        this.levels = levels;
        this.currentLevelNum = null;
        this.history = [];
    }

    chooseLevel(levelNumber) {
        this.history = [];
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

    unDo(){
        if (this.history.length === 1) return;
        this.history.pop();
    }

    reset() {
        const length = this.history.length;
        if (length > 1) {
            this.history.splice(1, this.history.length - 1);
        }
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

    getReference(direction) {
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
        return {
            r: deltaR,
            c: deltaC
        };
    }

    move(direction) {
        const currentMap = this.copyMap(this.getCurrentMap());
        const originMap = this.history[0];

        const playerLocation = this.getPlayerLocation();
        const playerRow = playerLocation.r;
        const playerCol = playerLocation.c;
        const playerLocOriginValue = originMap[playerRow][playerCol];

        const delta = this.getReference(direction);
        const deltaR = delta.r;
        const deltaC = delta.c;

        if (currentMap[playerRow + deltaR] == undefined) {
            return;
        }

        if (currentMap[playerRow + deltaR][playerCol + deltaC] === 2) {
            return;
        }

        if ([3,5].includes(currentMap[playerRow + deltaR][playerCol + deltaC])) {
            if (currentMap[playerRow + 2 * deltaR] === undefined || currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] === undefined) {
                return;
            }
            if ([2,3,5].includes(currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC])) {
                return;
            }
            if (currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] === 0) {
                currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] = 3;
                currentMap[playerRow + deltaR][playerCol + deltaC] = playerLocOriginValue === 4 ? 4 : 0;
            } else if (currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] === 4) {
                currentMap[playerRow + 2 * deltaR][playerCol + 2 * deltaC] = 5;
                if (this.countBoxOnTarget() !== this.countTargets() -1) {
                    const onTargetSound = new Audio("src/audio/ontarget.mp3");
                    onTargetSound.play();
                }
                currentMap[playerRow + deltaR][playerCol + deltaC] = playerLocOriginValue === 4 ? 4 : 0;
            }
        }

        if ([0,4].includes(currentMap[playerRow + deltaR][playerCol + deltaC])) {
            currentMap[playerRow + deltaR][playerCol + deltaC] = 1;
            currentMap[playerRow][playerCol] = playerLocOriginValue === 4 ? 4 : 0;
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

    checkIfWin() {
        return this.countBoxOnTarget() === this.countTargets();
    }

    countBoxOnTarget() {
        const currentMap = this.history[this.history.length - 1];
        const boxesOnTarget = currentMap.map(row => row.filter(tile => tile === 5));
        return boxesOnTarget.reduce((count, row) => count + row.length, 0);
    }

    countTargets() {
        const originMap = this.history[0];
        const targets = originMap.map(row => row.filter(tile => tile === 4));
        return targets.reduce((count, row) => count + row.length, 0);
    }
}