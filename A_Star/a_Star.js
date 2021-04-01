
/*
    A* finds a path from start to goal.
    The set of discovered nodes that may need to be (re-)expanded.
    Initially, only the start node is known.
    This is usually implemented as a min-heap or priority queue rather than a hash-set.

    A* selects the path that minimizes:
        f(n) = g(n) + h(n)
            - n is the next node
            - g is the cost of the path from the start to n
            - h is a heuristic that estimates the cost of the cheapest path from n to the goal

*/
var finished;
var grid;
var start; 
var end;
var openSet = [];
var closedSet = [];
var path;
var noSoln = false;
var rtn = {};

function a_Star(_grid){
    grid = _grid;
    start = grid[0][0];
    end = grid[_grid.length-1][_grid.length-1];
    start.wall = false;
    start.g = 0;
    end.wall = false;
    openSet.push(start);

    this.aStarSearch = function(){
        if(openSet.length > 0){
            var bestChoice = 0; // index with lowest f
            for(var i = 0; i < openSet.length; i++){
                if(openSet[i].f < openSet[bestChoice].f){
                    bestChoice = i;
                }
            }
            var current = openSet[bestChoice];
            if(current === end){
                console.log('DONE!');
                noLoop();
            }   

            closedSet.push(current);
            openSet.splice(bestChoice,1);

            var neighbors = current.neighbors;
            for(var i = 0; i < neighbors.length; i ++){
                var neighbor = neighbors[i]
                if(!closedSet.includes(neighbor) && !neighbor.wall){
                    var tmpG = current.g + 1; // g + dist or weight
                    if(tmpG < neighbor.g){
                        neighbor.prev = current;
                        neighbor.g = tmpG;
                        neighbor.f = heuristic(neighbor, end);
                        if(!openSet.includes(neighbor)){
                            openSet.push(neighbor);
                        }
                    }
                }
            }
            
        }
        else{
            // no soloution
            console.log('no solution')
            noSoln = true;
            noLoop();
        }

        rtn.openSet = openSet;
        rtn.closedSet = closedSet;
        if(!noSoln){
            // find the path
            path = [];
            var temp = current;
            path.push(temp);
            while(temp.prev){
                path.push(temp.prev);
                temp = temp.prev;
            }     
            rtn.path = path;
        }
        return rtn;

    }
}

function heuristic(a, b){
    return dist(a.i, a.j, b.i, b.j); // p5 euchlidean distance
}
