use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    // #[wasm_bindgen(js_namespace = console)]
    // fn log(s: i8);
    // #[wasm_bindgen(js_namespace = console)]
    // fn log(s: bool);
}

#[wasm_bindgen]
pub fn greet() -> Vec<i32> {
    alert("Hello, gol!");
    let mut rtn = vec![];
    for i in 1..10 {
        rtn.push(i as i32)
    }
    rtn
}

//-----
/*
    Game Of Life

    - Any live cell with two or three live neighbours survives.
    - Any dead cell with three live neighbours becomes a live cell.
    - All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

#[wasm_bindgen]
pub struct GameOfLife {
    state: Vec<Vec<i8>>,
    rows: usize,
    cols: usize,
}

#[wasm_bindgen]
impl GameOfLife {
    #[wasm_bindgen(constructor)]
    pub fn new(rows: usize, cols: usize) -> GameOfLife {
        let state: Vec<Vec<i8>> = vec![vec![0; cols]; rows];
        GameOfLife { state, rows, cols }
    }

    #[wasm_bindgen]
    pub fn checkerboard(&mut self) {
        let rows = self.rows;
        let cols = self.cols;
        let mut state: Vec<Vec<i8>> = vec![vec![0; cols]; rows];
        for row in 0..rows {
            for col in 0..cols {
                let i = if (row % 2 == 0) && col % 2 == 0 {
                    1
                } else if (row % 2 != 0) && col % 2 != 0 {
                    1
                } else {
                    0
                };
                state[row][col] = i;
            }
        }
        self.state = state;
    }

    #[wasm_bindgen]
    pub fn step(&mut self) -> Vec<i8> {
        let mut new_state = self.state.clone();
        //update state based on rules
        /*
            Any live cell with two or three live neighbours survives.
            Any dead cell with three live neighbours becomes a live cell.
            All other live cells die in the next generation. Similarly, all other dead cells stay dead.
        */

        // int[][] neighbours = {{-1,-1}, {0, -1}, {1,-1},
        // 				  	  {-1,0}          , {1,0},
        // 					  {-1,1},  {0, 1},  {1,1}
        // 					  };

        // count the number of alive neighbors then apply the rule
        for i in 1..self.rows - 1 {
            for j in 1..self.cols - 1 {
                let mut score = 0;
                //TL
                score += self.state[i - 1][j - 1];
                //TR
                score += self.state[i - 1][j + 1];
                //T
                score += self.state[i - 1][j];
                //L
                score += self.state[i][j - 1];
                //R
                score += self.state[i - 1][j + 1];
                //BL
                score += self.state[i + 1][j - 1];
                //B
                score += self.state[i + 1][j];
                //BR
                score += self.state[i + 1][j + 1];

                // update cell state in new state
                if score == 3 {
                    new_state[i][j] = 1;
                } else if score > 3 || score < 2 {
                    new_state[i][j] = 0;
                }
            }
        }
        self.state = new_state;

        // return flattened state
        let mut rtn = vec![];

        for row in self.state.iter() {
            for col in row {
                rtn.push(*col);
            }
        }

        rtn
    }
}
