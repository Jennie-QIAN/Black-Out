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

    describe('cancel', () => {
        it('cancels the last movement in the game', () => {
            const MAP_1 = [
                [0,0,0],
                [0,0,0],
                [0,1,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);

            game.chooseLevel(1);
            game.moveUp();
            game.cancel();

            expect(game.getCurrentMap()).toEqual([
                [0,0,0],
                [0,0,0],
                [0,1,0],
            ]);
        });

        it('can not cancel if has not moved yet', () => {
            const MAP_1 = [
                [0,0,0],
                [0,0,0],
                [0,1,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);

            game.chooseLevel(1);
            game.cancel();

            expect(game.getCurrentMap()).toEqual([
                [0,0,0],
                [0,0,0],
                [0,1,0],
            ]);
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

        it('throws an error if there is no player', () => {
            const MAP_1 = [
                [0,0,0],
                [0,0,0],
                [0,0,0],
            ];
            const maps = [MAP_1];
            const levels = new Levels(maps);
            const game = new Game(levels);
            game.chooseLevel(1);

            expect(() => game.getPlayerLocation()).toThrow();
        });
    });

    describe('moveUp', () => {
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

            game.moveUp();

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

            game.moveUp();

            expect(game.getCurrentMap()).toEqual([
                [0,2,0],
                [0,1,0],
                [0,0,0],
            ]);
        });
    });

    describe('moveDown', () => {
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

            game.moveDown();

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

            game.moveDown();

            expect(game.getCurrentMap()).toEqual([
                [0,0,1],
                [0,0,2],
                [0,0,0],
            ]);
        });
    });

    describe('moveLeft', () => {
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

            game.moveLeft();

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

            game.moveLeft();

            expect(game.getCurrentMap()).toEqual([
                [0,2,1],
                [0,0,0],
                [0,0,0],
            ]);
        });
    });

    describe('moveRight', () => {
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

            game.moveRight();

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

            game.moveRight();

            expect(game.getCurrentMap()).toEqual([
                [0,1,2],
                [0,0,0],
                [0,0,0],
            ]);
        });
    });
});