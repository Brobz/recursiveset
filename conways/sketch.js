let grid, nextGrid;
let columns, rows;
let cellSize = 4;
let neighbourCoordinates = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

function createGrid(columns, rows){
  var g = Array(columns);
  for(var i = 0; i < columns; i++){
    g[i] = Array(rows);
  }
  return g;
}

function setup() {
  createCanvas(window.innerWidth - 5, window.innerHeight - 5);
  columns = floor(width / cellSize);
  rows = floor(height / cellSize);
  grid = createGrid(columns, rows);

  for(var i = 0; i < columns; i++){
    for(var j = 0; j < rows; j++){
      var r = random(1)
      if(r > 0.85){
        grid[i][j] = 1;
      }else{
        grid[i][j] = 0;
      }
    }
  }

}

function draw() {
  background(255);
  fill(0);
  nextGrid = createGrid(columns, rows);
  for(var i = 0; i < columns; i++){
    for(var j = 0; j < rows; j++){
      var neighbours = 0;
      for(var k = 0; k < 8; k++){
        var x = i + neighbourCoordinates[k][0];
        var y = j + neighbourCoordinates[k][1];
        if(x < 0) x = columns - 1;
        if(x > columns - 1) x = 0;
        if(y < 0) y = rows - 1;
        if(y > rows - 1) y = 0;
        neighbours += grid[x][y];
      }
      if(grid[i][j] && neighbours < 2){
        nextGrid[i][j] = 0;
      }
      else if(grid[i][j] && neighbours > 3){
        nextGrid[i][j] = 0;
      }
      else if(!grid[i][j] && neighbours == 3){
        nextGrid[i][j] = 1;
      }
      else{
        nextGrid[i][j] = grid[i][j];
      }
    }
  }

  grid = nextGrid;

  for(var i = 0; i < columns; i++){
    for(var j = 0; j < rows; j++){
      if(grid[i][j]){
        rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }
}
