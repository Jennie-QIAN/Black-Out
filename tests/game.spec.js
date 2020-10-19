import { Game } from '../src/js/game.js';
import { Levels } from '../src/js/levels.js';

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
});