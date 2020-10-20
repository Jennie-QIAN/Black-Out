import { Game } from '../src/js/game.js';
import { Levels } from '../src/js/levels.js';

// window.jasmine.getEnv().randomizeTests(false);
window.jasmine.getEnv().configure({
    random: false
  });

describe('Game Class', () => {

    it('creates a new game', () => {
        const maps = [];
        const levels = new Levels(maps);
        const game = new Game(levels);

        expect(game instanceof Game).toBe(true);
    });

    describe('chooseLevel', () => {
        it('gets the map of the chosen level', () => {
            const MAP_1 = [
                [0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);

            game.chooseLevel(1);

            expect(game.getCurrentMap()).toEqual(MAP_1);
        });

        it('updates the current level number', () => {
            const MAP_1 = [
                [0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);

            game.chooseLevel(1);

            expect(game.getCurrentLevelNum()).toEqual(1);
        });
    });

    describe('choosePreviousLevel', () => {
        it('gets the map of the previous level', () => {
            const MAP_1 = [
                [0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            const MAP_2 = [
                [0,1,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            const MAP_3 = [
                [0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,1,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            const maps = [MAP_1, MAP_2, MAP_3];
            const levels = new Levels(maps);
            const game = new Game(levels);

            game.chooseLevel(3);
            game.choosePreviousLevel();
            game.choosePreviousLevel();

            expect(game.getCurrentMap()).toEqual(MAP_1);
        });
    });

    describe('chooseNextLevel', () => {
        it('gets the map of next level', () => {
            const MAP_1 = [
                [0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            const MAP_2 = [
                [0,1,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,2,0,0,0,2,3,0,0,0,0,0,0,0,0,0,0,0,0]
            ];
            const maps = [MAP_1, MAP_2];
            const levels = new Levels(maps);
            const game = new Game(levels);

            game.chooseLevel(1);
            game.chooseNextLevel();

            expect(game.getCurrentMap()).toEqual(MAP_2);
        });
    });

    describe('getPlayerLocation', () => {
        it('returns the location of player', () => {
            const MAP_1 = [
                [0,0,0],
                [0,0,1],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            expect(game.getPlayerLocation()).toEqual({r: 1, c: 2});
        });
    });

    describe('moveUpPlayer', () => {
        it('moves up the player', () => {
            const MAP_1 = [
                [0,0,0],
                [0,1,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveUpPlayer();

            expect(game.getCurrentMap()).toEqual([
                [0,1,0],
                [0,0,0],
                [0,0,0],
            ]);
        });

        it('does not let the player move up if there is a wall on top', () => {
            const MAP_1 = [
                [0,2,0],
                [0,1,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveUpPlayer();

            expect(game.getCurrentMap()).toEqual([
                [0,2,0],
                [0,1,0],
                [0,0,0],
            ]);
        });
    });

    describe('moveDownPlayer', () => {
        it('moves down the player', () => {
            const MAP_1 = [
                [0,0,1],
                [0,0,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveDownPlayer();

            expect(game.getCurrentMap()).toEqual([
                [0,0,0],
                [0,0,1],
                [0,0,0],
            ]);
        });

        it('does not let the player move up if there is a wall under it', () => {
            const MAP_1 = [
                [0,0,1],
                [0,0,2],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveDownPlayer();

            expect(game.getCurrentMap()).toEqual([
                [0,0,1],
                [0,0,2],
                [0,0,0],
            ]);
        });
    });

    describe('moveLeftPlayer', () => {
        it('moves left the player', () => {
            const MAP_1 = [
                [0,1,0],
                [0,0,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveLeftPlayer();

            expect(game.getCurrentMap()).toEqual([
                [1,0,0],
                [0,0,0],
                [0,0,0],
            ]);
        });

        it('does not let the player move left if there is a wall to its left', () => {
            const MAP_1 = [
                [0,2,1],
                [0,0,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveLeftPlayer();

            expect(game.getCurrentMap()).toEqual([
                [0,2,1],
                [0,0,0],
                [0,0,0],
            ]);
        });
    });

    describe('moveRightPlayer', () => {
        it('moves right the player', () => {
            const MAP_1 = [
                [0,1,0],
                [0,0,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveRightPlayer();

            expect(game.getCurrentMap()).toEqual([
                [0,0,1],
                [0,0,0],
                [0,0,0],
            ]);
        });

        it('does not let the player move left if there is a wall to its right', () => {
            const MAP_1 = [
                [0,1,2],
                [0,0,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveRightPlayer();

            expect(game.getCurrentMap()).toEqual([
                [0,1,2],
                [0,0,0],
                [0,0,0],
            ]);
        });
    });

    describe('checkIfBoxAbove', () => {
        it ('checks if a box is above the player', () => {
            const MAP_1 = [
                [0,0,0],
                [0,0,3],
                [0,0,1],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            expect(game.checkIfBoxAbove()).toBeTruthy();
        });
    });

    describe('checkIfBoxBelow', () => {
        it ('checks if a box is below the player', () => {
            const MAP_1 = [
                [0,0,0],
                [1,2,0],
                [3,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            expect(game.checkIfBoxBelow()).toBeTruthy();
        });
    });

    describe('checkIfBoxLeft', () => {
        it ('checks if a box is to the left of the player', () => {
            const MAP_1 = [
                [0,0,0],
                [2,2,0],
                [3,1,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            expect(game.checkIfBoxLeft()).toBeTruthy();
        });
    });

    describe('checkIfBoxRight', () => {
        it ('checks if a box is to the left of the player', () => {
            const MAP_1 = [
                [0,0,0],
                [2,2,0],
                [3,1,3],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            expect(game.checkIfBoxRight()).toBeTruthy();
        });
    });

    describe('moveUpBox', () => {
        it('moves up the box', () => {
            const MAP_1 = [
                [0,0,0],
                [0,3,0],
                [0,1,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveUpBox();

            expect(game.getCurrentMap()).toEqual([
                [0,3,0],
                [0,0,0],
                [0,1,0],
            ]);
        });

        it('does not let the box move up if there is a wall on top', () => {
            const MAP_1 = [
                [2,0,0],
                [3,0,0],
                [1,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            game.moveUpBox();

            expect(game.getCurrentMap()).toEqual([
                [2,0,0],
                [3,0,0],
                [1,0,0],
            ]);
        });
    });
});