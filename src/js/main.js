import {
    allMaps,
} from './maps.js';

import {
    Levels,
} from './levels.js';

import {
    instructionAndLevelMenu,
    GameBoard,
} from './canvas.js';

import { Game } from './game.js';

const startGameButton = document.getElementById('btn-start');
const selectLevelMenu = document.getElementById("level-select");

const canvas = document.querySelector("canvas");

const levels = new Levels(allMaps());
const game = new Game(levels);
let board;
let levelNumber;
let direction = 0;

if (localStorage.length > 0) {
    startGameButton.textContent = 'CONTINUE';
}

startGameButton.addEventListener('click', onClickStart);

function onClickStart() {
    document.getElementById('manifesto').style.display = "none";
    startGameButton.style.display = "none";
    instructionAndLevelMenu.classList.remove("hidden");

    const numberOfLevels = allMaps().length;
    let n = 2;
    while (n <= numberOfLevels) {
        const levelOption = selectLevelMenu.appendChild(document.createElement("option"));
        levelOption.setAttribute("value", n);
        levelOption.textContent = n;
        n++;
    }

    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const level = localStorage.key(i);
            document.querySelector(`option[value = "${level}"]`).textContent = `${level} : solved`;
        }

        const highestLevel = parseInt(Object.keys(localStorage).sort((a, b) => parseInt(b) - parseInt(a))[0]);
        canvas.classList.remove("hidden");
        game.chooseLevel(highestLevel + 1);
        selectLevelMenu.selectedIndex = game.currentLevelNum;
        board.renderMap(game.getCurrentMap(), 0);
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
    document.body.style.color = "whitesmoke";

    const index = selectLevelMenu.selectedIndex;
    levelNumber = index;

    canvas.classList.remove("hidden");
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

const winSound = new Audio("src/audio/win.mp3");
const onWinPopUp = document.querySelector('#onwin-popup');
const nextBtn = document.querySelector('#next-level');

function onWin() {
    winSound.play();
    document.body.style.backgroundColor = "Whitesmoke";
    document.body.style.color = "black";
    const currentLevel = game.currentLevelNum;
    
    onWinPopUp.classList.remove('hidden');

    if (!localStorage.getItem(game.currentLevelNum)) {
        document.querySelector(`option[value = "${currentLevel}"]`).textContent += " : solved";
        localStorage.setItem(game.currentLevelNum, game.history.length - 1);
    }
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

