import init, {GameOfLife} from './gol/pkg/gol.js';

const l = 8;
const nCols = 80;
// const nRows = 20;
const nRows = nCols; // indexing isn't working for any grid. only nxn

const w = nRows * l;
const h = nCols * l;

// change this to game. instantiate game and show checkerboard from wasm
let game;
const sketch = new p5((p5) => {
    p5.setup = async () => {
        await init().catch(console.error);
        game = new GameOfLife(nRows, nCols);
        game.checkerboard();

        p5.createCanvas(w, h);
    };

    p5.draw = () => {
        drawGrid(p5);
    };
});

function drawGrid(p5) {
    const grid = game.step();

    for (let r = 0; r < nRows; r++) {
        for (let c = 0; c < nCols; c++) {
            // const state = grid[r * nCols + c]; // this goes col by col
            const state = grid[c * nRows + r]; // this goes row by row
            if (state === 0) {
                p5.fill(0);
            } else {
                p5.fill(255);
            }
            const x = r * l;
            const y = c * l;
            p5.square(x, y, l);
        }
    }
}
