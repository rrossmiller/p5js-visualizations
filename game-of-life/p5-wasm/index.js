import init, {setup, getState} from './gol/pkg/gol.js';

const l = 10;
const nCols = 30;
// const nRows = 20;
const nRows = nCols; // indexing isn't working for any grid. only nxn

const w = nRows * l;
const h = nCols * l;

let grid = [];
let n = 0;
const sketch = new p5((p5) => {
    p5.setup = async () => {
        grid = await setupGrid();
        p5.createCanvas(w, h);
        console.log(grid);
    };
    p5.draw = () => {
        drawGrid(p5);
    };
});

async function setupGrid() {
    const grid = await init().then(() => {
        return setup(nRows, nCols);
    });
    return grid;
}

function drawGrid(p5) {
    if (n > nRows * nCols) n = 0;
    grid = getState(nRows, nCols, n++);

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
