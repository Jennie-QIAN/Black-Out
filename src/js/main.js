import {
    LevelManager,
} from './levels.js';

import { 
    GRID,
    TILE_SIZE,
    GameArea, 
} from './canvas.js';

document.getElementById('btn-render-game').onclick = function() {
    const canvas = document.createElement("Canvas");
    canvas.setAttribute("width", GRID.COL * TILE_SIZE);
    canvas.setAttribute("height", GRID.ROW * TILE_SIZE);
    document.body.insertBefore(canvas, document.querySelector('script'));

    const levels = new LevelManager();
    let gameArea = new GameArea(canvas, levels.getLevel(1));
    gameArea.createTileMap();
};
