let BOARD_SIZE = 70;
let board;

function setup() {
  createCanvas(BOARD_SIZE * 8 + 10, BOARD_SIZE * 8 + 10);
  PAWN = loadImage("imgs/pawn.png");
  KNIGHT = loadImage("imgs/knight.png");
  BISHOP = loadImage("imgs/bishop.png");
  ROOK = loadImage("imgs/rook.png");
  QUEEN = loadImage("imgs/queen.png");
  KING = loadImage("imgs/king.png");
  DARK_PAWN = loadImage("imgs/dark_pawn.png");
  DARK_KNIGHT = loadImage("imgs/dark_knight.png");
  DARK_BISHOP = loadImage("imgs/dark_bishop.png");
  DARK_ROOK = loadImage("imgs/dark_rook.png");
  DARK_QUEEN = loadImage("imgs/dark_queen.png");
  DARK_KING = loadImage("imgs/dark_king.png");
  DARK_IMAGES = [PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, DARK_PAWN, DARK_KNIGHT, DARK_BISHOP, DARK_ROOK, DARK_QUEEN, DARK_KING];
  board = new Board(BOARD_SIZE);
}

function draw() {
  background(255);
  push();
  translate(10, 10);
  board.draw();
  pop();
}
