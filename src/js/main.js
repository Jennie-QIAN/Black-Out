import {
    allMaps,
} from './maps.js';

import {
    Levels,
} from './levels.js';

import {
    levelMenu,
    GameBoard,
} from './canvas.js';

import { Game } from './game.js';

const startGameButton = document.getElementById('btn-show-levels');
const selectLevelMenu = document.getElementById("level-select");

const canvas = document.createElement("Canvas");

const levels = new Levels(allMaps());
const game = new Game(levels);
let board;
let levelNumber;
let direction = 0;

startGameButton.addEventListener('click', onClickStart);

function onClickStart() {
    document.getElementById('manifesto').style.display = "none";
    startGameButton.style.display = "none";
    levelMenu.classList.remove("hidden");

    const numberOfLevels = allMaps().length;
    let n = 1;
    while (n <= numberOfLevels) {
        const levelOption = selectLevelMenu.appendChild(document.createElement("option"));
        levelOption.setAttribute("value", n);
        levelOption.textContent = n;
        n++;
    }
}

const tileMapImg = new Image();
tileMapImg.onload = () => {
    board = new GameBoard(canvas, tileMapImg);
};
tileMapImg.src = "src/img/tilesheet.png";


selectLevelMenu.addEventListener('change', onSelectLevel);

function onSelectLevel() {
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.color = "Whitesmoke";

    const index = selectLevelMenu.selectedIndex;
    levelNumber = index;

    document.body.insertBefore(canvas, document.querySelector('script'));

    game.chooseLevel(index);

    board.renderMap(game.getCurrentMap(), 0);

    selectLevelMenu.blur();
}

window.addEventListener('keydown', event => {
    if (game.checkIfWin()) {
        return;
    }

    switch (event.key) {
        case 'ArrowUp':
            game.moveUp();
            direction = 1;
            break;
        case 'ArrowDown':
            game.moveDown();
            direction = 2;
            break;
        case 'ArrowLeft':
            game.moveLeft();
            direction = 3;
            break;
        case 'ArrowRight':
            game.moveRight();
            direction = 4;
            break;
        case 'z':
            game.unDo();
            direction = 0;
            break;
        case ' ':
            game.reset();
            direction = 0;
            break;
    }
    board.renderMap(game.getCurrentMap(), direction);
    if (game.checkIfWin()) {
        setTimeout(function() {
            onWin();
        }, 200) ;
    }
});

const nextBtn = document.querySelector('#next-level');
const onWinPopUp = document.querySelector('#onwin-popup');

function onWin() {
    document.body.style.backgroundColor = "Whitesmoke";
    document.body.style.color = "black";
    
    onWinPopUp.classList.remove('hidden');
}

nextBtn.addEventListener('click', onClickNext);

function onClickNext() {
    game.chooseNextLevel();
    document.body.style.backgroundColor = "#0a0a0a";
    document.body.style.color = "Whitesmoke";

    onWinPopUp.classList.add('hidden');
    selectLevelMenu.selectedIndex = game.currentLevelNum;
    board.renderMap(game.getCurrentMap(), 0);  
}
