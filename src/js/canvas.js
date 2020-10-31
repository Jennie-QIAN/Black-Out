export const instructionAndLevelMenu = document.getElementById("instr-and-level");
export const gameName = document.getElementById("game-name");

export class GameBoard {
    constructor(canvas, tileMapImg) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tileMapImg = tileMapImg;
        this.epicPeaDirection = "";
    }

    getCanvasSize(level) {
        let tileSize = 32;
        let heightCanvas = window.innerHeight - gameName.offsetHeight- instructionAndLevelMenu.offsetHeight;
        
        let widthCanvas = window.innerWidth;
        const mapRow = level.length;
        const mapCol = level[0].length;

        const sizeR = Math.round(heightCanvas / mapRow);
        const sizeC = Math.round(widthCanvas / mapCol);

        if (heightCanvas >= mapRow * tileSize && widthCanvas >= mapCol * tileSize) {
            widthCanvas = mapCol * tileSize;
            heightCanvas = mapRow * tileSize;
        } else if (heightCanvas >= mapRow * tileSize && widthCanvas < mapCol * tileSize) {
            tileSize = sizeC;
            heightCanvas = mapRow * tileSize;
        } else if (heightCanvas < mapRow * tileSize && widthCanvas >= mapCol * tileSize) {
            tileSize = sizeR;
            widthCanvas = mapCol * tileSize;
        } else {
            tileSize = sizeR > sizeC ? sizeR : sizeC;
            widthCanvas = mapCol * tileSize;
            heightCanvas = mapRow * tileSize;
        }
        return {
            tileSize: tileSize,
            width: widthCanvas,
            height: heightCanvas,
        };
    }

    renderMap(level, direction) {
        const {
            tileSize,
            width,
            height
        } = this.getCanvasSize(level);
        
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);

        this.ctx.clearRect(0, 0, width, height);

        for (let c = 0; c < level[0].length; c++) {
            for (let r = 0; r < level.length; r++) {
                let tile = level[r][c];
                if (tile !== 0 && tile !== 1) {
                    this.ctx.drawImage(
                        this.tileMapImg,
                        (tile - 1) * 32,
                        0,
                        32,
                        32,
                        c * tileSize,
                        r * tileSize,
                        tileSize,
                        tileSize
                    );
                } else if (tile == 1) {
                    this.ctx.drawImage(
                        this.tileMapImg,
                        (tile - 1 + direction) * 32,
                        32,
                        32,
                        32,
                        c * tileSize,
                        r * tileSize,
                        tileSize,
                        tileSize
                    );
                }
            }
        }
    }

    drawEpicWin(level) {
        const {
            tileSize,
            width,
            height
        } = this.getCanvasSize(level);

        this.ctx.clearRect(0, 0, width, height);
        const textSize = `${tileSize * 2}px`;
        
        this.ctx.font = `${textSize} "Press Start 2P"`;
        this.ctx.fillStyle = "#ffcc00";
        this.ctx.textAlign = "center";
        this.ctx.fillText('AWESOME', width / 2, height / 2);

        this.ctx.font = "20px sans-serif";
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`You have conquered the ultimate challenge!`, width / 2, height / 2 + tileSize);
        this.ctx.fillText(`To replay, please choose a level`, width / 2, height / 2 + tileSize * 2);

        /*const gravity = 0.1;

        let pea = {
            x: width / 2 - 16,
            y: 0,
            vy: 10,
            size: 32,
            yMax: height / 2 - tileSize * 2 - 64,
            yMin: 0
        };

        this.drawPeaOnEpicWin(pea); 
        setInterval(() => this.updatePeaOnEpicWin(pea, gravity), 70);*/
    }

    getPeaRef(level) {
        const {
            tileSize,
            width,
            height
        } = this.getCanvasSize(level);
    
        const pea = {
            x: width / 2 - 16,
            y: 0,
            vy: 5,
            size: 32,
            yMax: height / 2 - tileSize * 2 - 64,
            yMin: 0
        };
        return pea;
    }

    drawPeaOnEpicWin(pea) {
        this.ctx.drawImage(
            this.tileMapImg,
            0,
            0,
            32,
            32,
            pea.x,
            pea.y,
            pea.size,
            pea.size
        );
    }

    updatePeaOnEpicWin(pea, gravity) {

        this.ctx.clearRect(pea.x, pea.y, pea.size, pea.size);

        if (pea.y >= pea.yMax - pea.vy - gravity) {
            this.epicPeaDirection = "up";
            pea.vy = 10;
        } else if (pea.y <= pea.yMin + pea.vy + gravity) {
            this.epicPeaDirection = "down";
            pea.vy = 10;
        }
       
        switch (this.epicPeaDirection) {
            case "down":
                pea.vy += gravity;
                pea.y += pea.vy;
                break;
            case "up":
                pea.vy += gravity;
                pea.y -= pea.vy;
                break;
        }
        this.drawPeaOnEpicWin(pea); 
    }
}