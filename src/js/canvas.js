export const levelMenu = document.getElementById("instr-and-level");
export const gameName = document.getElementById("game-name");

export class GameBoard {
    constructor(canvas, tileMapImg) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tileMapImg = tileMapImg;
    }

    getCanvasSize(level) {
        let tileSize = 32;
        let heightCanvas = window.innerHeight - gameName.offsetHeight- levelMenu.offsetHeight;
        
        let widthCanvas = window.innerWidth;
        const mapRow = level.length;
        const mapCol = level[0].length;

        const sizeR = heightCanvas / mapRow;
        const sizeC = widthCanvas / mapCol;

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
            width: Math.round(widthCanvas),
            height: Math.round(heightCanvas),
        };
    }

    renderMap(level) {
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
                if (tile !== 0) {
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
                }
            }
        }
    }
}