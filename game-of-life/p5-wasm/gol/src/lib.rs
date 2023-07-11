use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    // #[wasm_bindgen(js_namespace = console)]
    // fn log(s: i8);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: bool);
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
pub fn setup(rows: usize, cols: usize) -> Vec<i8> {
    let state_grid: Vec<i8> = vec![0; rows * cols]
        .iter()
        .enumerate()
        .map(|(i, _)| {
            // let offset = if i % rows == 0 { 0 } else { 1 };
            let row = ((i / cols) as f32).floor() as usize;

            if (i + row) % 2 == 0 {
                0
            } else {
                1
            }
        })
        .collect();

    state_grid
}

#[wasm_bindgen]
pub fn getState(rows: usize, cols: usize, n: usize) -> Vec<i8> {
    let state_grid: Vec<i8> = vec![0; rows * cols]
        .iter()
        .enumerate()
        .map(|(i, _)| if i == n { 1 } else { 0 })
        .collect();
    state_grid
}
