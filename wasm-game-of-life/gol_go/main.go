package main

import (
	"fmt"
	"math/rand/v2"
	"syscall/js"
)

// Declare a main function, this is the entrypoint into our go module
// That will be run. In our example, we won't need this
func main() {}

/*
Game Of Life

- Any live cell with two or three live neighbours survives.
- Any dead cell with three live neighbours becomes a live cell.
- All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/
type GameOfLife struct {
	state [][]int
	rows  int
	cols  int
}

var game GameOfLife

//export new
func new(rows, cols int) bool {
	state := [][]int{}
	for range rows {
		col := []int{}
		for range cols {
			col = append(col, 0)
		}

		state = append(state, col)
	}
	game = GameOfLife{state: state, rows: rows, cols: cols}
	return true
}

//export checkerboard
func checkerboard() {
	for row := range game.rows {
		for col := range game.cols {
			var i int
			if (row%2 == 0) && col%2 == 0 {
				i = 1
			} else if (row%2 != 0) && col%2 != 0 {
				i = 1
			} else {
				i = 0
			}
			game.state[row][col] = i
		}
	}
	fmt.Println(game.state)
}

//TODO:
//func init( prob: f32) {
// }

//export step
func step() any {
	for row := range game.rows {
		for col := range game.cols {
			i := rand.IntN(2)
			game.state[row][col] = i
		}
	}
	return js.ValueOf(game.state)
}

// -------------------------------------------------------------------------
// This exports an add function.
// It takes in two 32-bit integer values
// And returns a 32-bit integer value.
// To make this function callable from JavaScript,
// we need to add the: "export add" comment above the function
//
//export add
func add(x int, y int) int {
	return x + y
}
