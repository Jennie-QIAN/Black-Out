import * as mazes from './mazes.js';

export function allMaps() {

    const mazeList = Object.keys(mazes).sort((a, b) => {
        return a.substring(a.indexOf('_') + 1) - b.substring(a.indexOf('_') + 1);
    });

    const maps = mazeList.map((mazeName) => {
        const objects = mazes[mazeName].split('');
        let map = [[]];

        for (let i = 0; i < objects.length; i++) {
            const lastRow = map[map.length - 1];
            
            switch (objects[i]) {
                case '\n':
                map.push([]);
                break;
                case ' ':
                case '&':
                lastRow.push(0);
                break;
                case 'X':
                lastRow.push(2);
                break;
                case '@':
                lastRow.push(1);
                break;
                case '*':
                lastRow.push(3);
                break;
                case '.':
                lastRow.push(4);
                break;
            }   
        }
        return map;
    });
    return maps;
}