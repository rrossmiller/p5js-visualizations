import { newGOL, step, checkerboard } from "./gol_go/pkg/gol.js";

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
// const sketch = new p5((p5) => {
new p5((p5) => {
  p5.setup = async () => {
    // p5.frameRate(1);
    newGOL(nRows, nCols);
    // init(0.15);
    checkerboard();

    p5.createCanvas(w, h);
  };

  p5.draw = async () => {
    console.log("frame rate:", p5.frameRate());
    await drawGrid(p5);
  };
});

async function drawGrid(p5) {
  const grid = await step();
  console.log(grid);

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
