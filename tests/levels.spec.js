import { Levels } from '../src/js/levels.js';

// window.jasmine.getEnv().randomizeTests(false);
window.jasmine.getEnv().configure({
    random: false
  });

describe('Levels Class', () => {

    it('get the map of the level', () => {
        const MAP_1 = [
            [0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,2,3,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,2,2,2,0,0,3,2,2,2,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,2,0,0,3,0,0,3,0,2,0,0,0,0,0,0,0,0,0,0,0],
            [2,2,2,0,2,0,2,2,2,0,2,0,0,0,0,0,2,2,2,2,2,2],
            [2,0,0,0,2,0,2,2,2,0,2,2,2,2,2,2,2,0,0,4,4,2],
            [2,0,3,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,2],
            [2,2,2,2,2,0,2,2,2,2,0,2,1,2,2,2,2,0,0,4,4,2],
            [0,0,0,0,2,0,0,0,0,0,0,2,2,2,0,0,2,2,2,2,2,2],
            [0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0],
        ];
        const maps = [MAP_1];
        const levels = new Levels(maps);
        expect(levels.getMap(1)).toBe(MAP_1);
    });

    it('throws error when the level does not exist', () => {
        const maps = [];
        const levels = new Levels(maps);
        expect(() => levels.getMap(1)).toThrow();
    });
  });
