export const GRID = {
    COL: 30,
    ROW: 20
};

export const TILE_SIZE = 32;

export class GameBoard {
    constructor(canvas, tileMapImg) {
        this.ctx = canvas.getContext('2d');
        this.tileMapImg = tileMapImg;
    }

    renderMap(level) {
        this.ctx.clearRect(0, 0, GRID.COL * TILE_SIZE, GRID.ROW * TILE_SIZE);
        this.ctx.save();
        const mapRow = level.length;
        const mapCol = level[0].length;
        const deltaX = (GRID.COL - mapCol) * TILE_SIZE / 2;
        const deltaY = (GRID.ROW - mapRow) * TILE_SIZE / 2;

        this.ctx.translate(deltaX, deltaY);

        for (let c = 0; c < level[0].length; c++) {
            for (let r = 0; r < level.length; r++) {
                let tile = level[r][c];
                if (tile !== 0) {
                    this.ctx.drawImage(
                        this.tileMapImg,
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

        this.ctx.restore();
    }
}