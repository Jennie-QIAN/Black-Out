import {
    allMaps,
    Levels,
} from './levels.js';

import {
    GRID,
    TILE_SIZE,
    GameArea,
} from './canvas.js';

import { Game } from './game.js';

const startGameButton = document.getElementById('btn-render-game');

startGameButton.addEventListener('click', onClickStart);

function onClickStart() {
    const canvas = document.createElement("Canvas");
    canvas.setAttribute("width", GRID.COL * TILE_SIZE);
    canvas.setAttribute("height", GRID.ROW * TILE_SIZE);
    document.body.insertBefore(canvas, document.querySelector('script'));

    const levels = new Levels(allMaps);
    const game = new Game(levels);

    game.chooseLevel(1);

    let gameArea = new GameArea(canvas, game.getCurrentMap());
    gameArea.createTileMap();
}
