import {
    allMaps,
} from './maps.js';

import {
    Levels,
} from './levels.js';

import {
    GRID,
    TILE_SIZE,
    GameBoard,
} from './canvas.js';

import { Game } from './game.js';

const levelMenu = document.getElementById("level-menu");
levelMenu.style.display = "none";
const startGameButton = document.getElementById('btn-show-levels');
const selectLevelMenu = document.getElementById("level-select");

const canvas = document.createElement("Canvas");
canvas.setAttribute("width", GRID.COL * TILE_SIZE);
canvas.setAttribute("height", GRID.ROW * TILE_SIZE);

const levels = new Levels(allMaps());
const game = new Game(levels);
let board;
let levelNumber;

startGameButton.addEventListener('click', onClickStart);

function onClickStart() {
    document.getElementById('manifesto').style.display = "none";
    startGameButton.style.display = "none";
    levelMenu.style.display = "flex";

    const numberOfLevels = allMaps().length;
    let n = 1;
    while (n <= numberOfLevels) {
        const levelOption = selectLevelMenu.appendChild(document.createElement("option"));
        levelOption.setAttribute("value", n);
        levelOption.textContent = n;
        n++;
    }
}

selectLevelMenu.addEventListener('change', onSelectLevel);

function onSelectLevel() {
    const index = selectLevelMenu.selectedIndex;
    levelNumber = index;

    document.body.insertBefore(canvas, document.querySelector('script'));

    game.chooseLevel(index);

    const tileMapImg = new Image();
    tileMapImg.onload = () => {
        board = new GameBoard(canvas, tileMapImg);
        board.renderMap(game.getCurrentMap());
    };
    tileMapImg.src = "src/img/tilesheet.png";

    selectLevelMenu.blur();
}

window.addEventListener('keydown', event => {
    if (game.checkIfWin()) {
        return;
    }
    switch (event.key) {
        case 'ArrowUp':
            game.moveUp();
            break;
        case 'ArrowDown':
            game.moveDown();
            break;
        case 'ArrowLeft':
            game.moveLeft();
            break;
        case 'ArrowRight':
            game.moveRight();
            break;
        case 'z':
            game.unDo();
            break;
        case ' ':
            game.reset();
            break;
    }
    board.renderMap(game.getCurrentMap());
});

