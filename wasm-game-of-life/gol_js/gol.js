export default class GameOfLife {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.state = this.blankState();
  }

  blankState() {
    let state = Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      state[i] = Array(this.cols);
    }
    return state;
  }

  init(prob) {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let i = Math.random() < prob ? 1 : 0;
        this.state[row][col] = i;
      }
    }
  }
  checkerboard() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let i = 0;
        if (row % 2 == 0 && col % 2 == 0) {
          i = 1;
        } else if (row % 2 != 0 && col % 2 != 0) {
          i = 1;
        }
        this.state[row][col] = i;
      }
    }
  }

  get_neighbor(x_offset, y_offset) {
    if (x_offset < 0 || x_offset == this.rows) {
      return 0;
    } else if (y_offset < 0 || y_offset == this.cols) {
      return 0;
    }

    return this.state[x_offset][y_offset];
  }

  step() {
    let newState = this.state.slice();
    //update state based on rules
    /*
        Any live cell with two or three live neighbours survives.
        Any dead cell with three live neighbours becomes a live cell.
        All other live cells die in the next generation. Similarly, all other dead cells stay dead.
    */

    // count the number of alive neighbors then apply the rule
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        let score = 0;
        //TL
        score += this.get_neighbor(x - 1, y - 1);
        //TR
        score += this.get_neighbor(x - 1, y + 1);
        //T
        score += this.get_neighbor(x - 1, y);
        //L
        score += this.get_neighbor(x, y - 1);
        //R
        score += this.get_neighbor(x, y + 1);
        //BL
        score += this.get_neighbor(x + 1, y - 1);
        //B
        score += this.get_neighbor(x + 1, y);
        //BR
        score += this.get_neighbor(x + 1, y + 1);

        // update cell state in new state
        if (score == 3 && newState[x][y] == 0) {
          newState[x][y] = 1;
        } else if (newState[x][y] == 1 && (score > 3 || score < 2)) {
          newState[x][y] = 0;
        }
      }
    }
    this.state = newState;

    return this.state.flat();
  }
}
