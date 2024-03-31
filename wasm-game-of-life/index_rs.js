import init, {GameOfLife} from './gol_rust/pkg/gol.js';

const benchmark = true;

let l = 8;
let nCols = 90;
if (benchmark) {
  l = 3;
  nCols = 213;

  l = 4;
  nCols = 200;
}

const nRows = nCols; // indexing isn't working for any grid. only nxn

const w = nRows * l;
const h = nCols * l;

// change this to game. instantiate game and show checkerboard from wasm
let game;
const sketch = new p5((p5) => {
  p5.setup = async () => {
    // p5.frameRate(1);
    await init().catch(console.error);
    game = new GameOfLife(nRows, nCols);
    game.init(0.15);
    // game.checkerboard();

    p5.createCanvas(w, h);
  };

  p5.draw = () => {
    console.log("frame rate:", p5.frameRate());
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
        p5.fill(105);
      } else {
        p5.fill(200);
      }
      const x = r * l;
      const y = c * l;
      p5.square(x, y, l);
    }
  }
}
