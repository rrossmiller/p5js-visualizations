function Spot(_i, _j){
    this.f = 0;
    this.g = Number.MAX_SAFE_INTEGER ;
    this.h = 0;
    this.i = _i;
    this.j = _j;
    this.neighbors = []
    this.prev;
    this.wall = false;
    
    if(random(0, 1) < 0.3){
        this.wall = true;
    }

    this.show = function(sketch, clr){
        if(this.wall){
            fill(0)
        }
        else fill(clr);

        noStroke();
        rect(this.i * sketch.w, this.j * sketch.h, sketch.w-1, sketch.h-1);
    }
    
    this.addNeighbors = function(rows, cols, grid){
        var i = this.i;
        var j = this.j;
        if(i < cols-1){
            this.neighbors.push(grid[i+1][j]);
        }
        if(i > 0){
            this.neighbors.push(grid[i-1][j]);
        }
        if(j < rows -1){
            this.neighbors.push(grid[i][j+1]);
        }
        if(j > 0){
            this.neighbors.push(grid[i][j-1]);
        }
        // diagonals
        // if(i > 0 && j > 0){
        //     this.neighbors.push(grid[i-1][j-1]);
        // }
        // if(i > 0 && j < rows-1){
        //     this.neighbors.push(grid[i-1][j+1]);
        // }
        // if(i < cols -1 && j > 0){
        //     this.neighbors.push(grid[i+1][j-1]);
        // }
        // if(i > cols -1 && j > rows-1){
        //     this.neighbors.push(grid[i+1][j+1]);
        // }
    }
}