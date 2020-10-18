export const GRID = {
    COL: 30,
    ROW: 20
};

export const TILE_SIZE = 32;

export class GameArea {
    constructor(canvas, levelMap) {
        this.levelMap = levelMap;
        this.ctx = canvas.getContext('2d');
        this.map = {
            cols: levelMap[0].length,
            rows: levelMap.length
        };
    }

    createTileMap() {
        //this.ctx.clearRect(0, 0, GRID.COL * TILE_SIZE, GRID.ROW * TILE_SIZE);
        //this.ctx.save();
        const mapRow = this.map.rows;
        const mapCol = this.map.cols;
        const deltaX = (GRID.COL - mapCol) * TILE_SIZE / 2;
        const deltaY = (GRID.ROW - mapRow) * TILE_SIZE / 2;

        this.ctx.translate(deltaX, deltaY);

        const tileMapImg = new Image();

        tileMapImg.onload = () => {
            this.drawTileMap(tileMapImg);
        };
        tileMapImg.src = "src/img/tilesheet.png";
    }

    drawTileMap(tileMapImg) {
        for (let c = 0; c < this.map.cols; c++) {
            for (let r = 0; r < this.map.rows; r++) {
                let tile = this.levelMap[r][c];
                if (tile !== 0) {
                    this.ctx.drawImage(
                        tileMapImg,
                        (tile - 1) * TILE_SIZE,
                        0,
                        TILE_SIZE,
                        TILE_SIZE,
                        c * TILE_SIZE,
                        r * TILE_SIZE,
                        TILE_SIZE,
                        TILE_SIZE
                    );
                }
            }
        }
        //this.ctx.restore();
    }
}