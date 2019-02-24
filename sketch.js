function make2DArray(cols, rows) {

  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let next;
let cols;
let rows;
const SCL = 10;


function setup() {
  createCanvas(1000, 800);

  cols = width / SCL;
  rows = height / SCL;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * SCL;
      let y = j * SCL;
      if (grid[i][j] == 1) {
        fill(255);
        rect(x, y, SCL - 1, SCL - 1);
      }
    }
  }

  next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      next[i][j] = grid[i][j];

      let cell = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);

      if (cell == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (cell = 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}