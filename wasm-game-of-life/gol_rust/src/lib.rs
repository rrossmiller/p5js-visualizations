use rand::Rng;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // #[wasm_bindgen(js_namespace = console)]
    // fn log(s: &str);
    // #[wasm_bindgen(js_namespace = console)]
    // fn log(s: i8);
    // #[wasm_bindgen(js_namespace = console)]
    // fn log(s: bool);
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
        let mut state: Vec<Vec<i8>> = vec![vec![0; self.cols]; self.rows];
        for row in 0..self.rows {
            for col in 0..self.cols {
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
    pub fn init(&mut self, prob: f32) {
        let mut rnd = rand::thread_rng();

        let rows = self.rows;
        let cols = self.cols;
        let mut state: Vec<Vec<i8>> = vec![vec![0; cols]; rows];
        for row in 0..rows {
            for col in 0..cols {
                let r = rnd.gen::<f32>();
                let i = if r < prob { 1 } else { 0 };

                state[row][col] = i;
            }
        }
        self.state = state;
    }

    fn get_neighbor(&self, x_offset: i32, y_offset: i32) -> i8 {
        if x_offset < 0 || x_offset == (self.rows as i32) {
            return 0;
        } else if y_offset < 0 || y_offset == (self.cols as i32) {
            return 0;
        }

        return self.state[x_offset as usize][y_offset as usize];
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

        // count the number of alive neighbors then apply the rule
        for i in 0..self.rows {
            for j in 0..self.cols {
                let x = i as i32;
                let y = j as i32;
                let mut score = 0;
                //TL
                score += self.get_neighbor(x - 1, y - 1);
                //TR
                score += self.get_neighbor(x - 1, y + 1);
                //T
                score += self.get_neighbor(x - 1, y);
                //L
                score += self.get_neighbor(x, y - 1);
                //R
                score += self.get_neighbor(x, y + 1);
                //BL
                score += self.get_neighbor(x + 1, y - 1);
                //B
                score += self.get_neighbor(x + 1, y);
                //BR
                score += self.get_neighbor(x + 1, y + 1);

                // update cell state in new state
                if score == 3 && new_state[i][j] == 0 {
                    new_state[i][j] = 1;
                } else if new_state[i][j] == 1 && (score > 3 || score < 2) {
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
