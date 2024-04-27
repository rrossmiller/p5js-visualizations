import GameOfLife from "./gol_js/gol.js";

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

let game;
// const sketch = new p5((p5) => {
new p5((p5) => {
  p5.setup = async () => {
    game = new GameOfLife(nRows, nCols);
    game.init(0.15);
    // game.checkerboard();

    p5.createCanvas(w, h);
  };

  p5.draw = () => {
    p5.text("something isn't right", 5000, 25);
    console.log("frame rate:", p5.frameRate());
    const grid = game.step();
    drawGrid(p5, grid);
    return;
  };
});

function drawGrid(p5, grid) {
  for (let r = 0; r < nRows; r++) {
    for (let c = 0; c < nCols; c++) {
      // const state = grid[r * nCols + c]; // this goes col by col
      const state = grid[c * nRows + r]; // this goes row by row

      if (state < 1) {
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
