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

const levelMenu = document.getElementById("instr-and-level");
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
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.color = "Whitesmoke";

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
    if (game.checkIfWin()) {
        setTimeout(function() {
            onWin();
        }, 200) ;
    }
});

function onWin() {
    document.body.style.backgroundColor = "Whitesmoke";
    document.body.style.color = "black";
    
    const onWinButtons = document.createElement('div');
    onWinButtons.setAttribute("id", "btn-onwin");
    const previousBtn = document.createElement('button');
    previousBtn.textContent = "Previous Level";
    previousBtn.setAttribute("id", "previous-level");
    const nextBtn = document.createElement('button');
    nextBtn.textContent = "Next Level";
    nextBtn.setAttribute("id", "next-level");
    onWinButtons.appendChild(previousBtn);
    onWinButtons.appendChild(nextBtn);

    document.body.insertBefore(onWinButtons, document.querySelector('script'));
}

