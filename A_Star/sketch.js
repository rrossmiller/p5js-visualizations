const cols = 50;
const rows = cols;

var grid = new Array(cols);
var w, h;
var aStar;

function setup() {
	console.log('diagonals aren\'t working');
	createCanvas(400, 400);
	
	// set up grid spacing
	w = width/cols;
	h = height/rows;

	//making a 2d array of Spots
	for(var i = 0 ; i < cols; i++){
		grid[i] = new Array(rows);
	}
	for(var i = 0 ; i < cols; i++){
		// grid[i] = new Array(rows);
		for(var j = 0 ; j < rows ; j++){
			grid[i][j] = new Spot(i, j);
		}
	}
	// get neighbors
	for(var i = 0 ; i < cols; i++){
		// grid[i] = new Array(rows);
		for(var j = 0 ; j < rows ; j++){
			grid[i][j].addNeighbors(rows, cols, grid);
		}
	}

	// init algo
	aStar = new a_Star(grid);
}

function draw() {
	background(0);
	paths = aStar.aStarSearch();

	if (paths){
		// label the grid:
		// sketch everything white
		for(let i = 0 ; i < cols ; i ++){
			for(let j = 0 ; j < cols ; j++){
				grid[i][j].show(this, color(255))
			}
		}
		// closed set is red
		for(let i = 0 ; i < paths.closedSet.length ; i ++){
			closedSet[i].show(this, color(255,0,0))
		}
		//open set is green
		for(let i = 0 ; i < paths.openSet.length ; i ++){
			openSet[i].show(this, color(0,255,0))
		}
			
		// path is blue
		for(let i = 0 ; i < paths.path.length ; i ++){
			path[i].show(this, color(0,0,255))
		}
	}
}

