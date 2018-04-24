let BOARD_SIZE = 70; // Witdth and height of each tile
let board; // Board object, containing all tiles
let selectedPiece = null; // Piece that the player is moving with the mouse
let turn = 0; // 0 = White's turn, 1 = Black's turn

function setup() {
  createCanvas(BOARD_SIZE * 8 + 10, BOARD_SIZE * 8 + 10); // Canvas is the size of the board + 10 pixels on wide and tall
  PAWN = loadImage("imgs/pawn.png"); // Loading images
  KNIGHT = loadImage("imgs/knight.png"); // . . .
  BISHOP = loadImage("imgs/bishop.png"); // . . .
  ROOK = loadImage("imgs/rook.png"); // . . .
  QUEEN = loadImage("imgs/queen.png"); // . . .
  KING = loadImage("imgs/king.png"); // . . .
  DARK_PAWN = loadImage("imgs/dark_pawn.png"); // . . .
  DARK_KNIGHT = loadImage("imgs/dark_knight.png"); // . . .
  DARK_BISHOP = loadImage("imgs/dark_bishop.png"); // . . .
  DARK_ROOK = loadImage("imgs/dark_rook.png"); // . . .
  DARK_QUEEN = loadImage("imgs/dark_queen.png"); // . . .
  DARK_KING = loadImage("imgs/dark_king.png"); // . . .
  DARK_IMAGES = [PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, DARK_PAWN, DARK_KNIGHT, DARK_BISHOP, DARK_ROOK, DARK_QUEEN, DARK_KING];
  board = new Board(BOARD_SIZE); // Initializing board object
}

function mousePressed(){
  // Mouse is pressed, check if it hovers a piece
  if(board.tiles[floor(mouseX / BOARD_SIZE)][floor(mouseY / BOARD_SIZE)] != null){
    // If it does, check if it is this colour's turn
    if(!turn && !board.tiles[floor(mouseX / BOARD_SIZE)][floor(mouseY / BOARD_SIZE)].dark){
      // If yes, select that piece
      selectedPiece = board.tiles[floor(mouseX / BOARD_SIZE)][floor(mouseY / BOARD_SIZE)];
    // Also for the other colour
    }else if(turn && board.tiles[floor(mouseX / BOARD_SIZE)][floor(mouseY / BOARD_SIZE)].dark){
      // If yes, select that piece
      selectedPiece = board.tiles[floor(mouseX / BOARD_SIZE)][floor(mouseY / BOARD_SIZE)];
    }
  }
}

function draw() {
  background(255);
  // If there is a selected piece
  if(selectedPiece != null){
    // Make it follow the mouse
    selectedPiece.pos = [mouseX - BOARD_SIZE / 2, mouseY - BOARD_SIZE / 2];
    if(!mouseIsPressed){
      var moves = selectedPiece.getLegalMoves();
      for(var i = 0; i < moves.length; i++){
        if(floor(mouseX / BOARD_SIZE) == moves[i][0] && floor(mouseY / BOARD_SIZE) == moves[i][1]){
          board.tiles[selectedPiece.coords[0]][selectedPiece.coords[1]] = null;
          selectedPiece.coords = [floor(mouseX / BOARD_SIZE), floor(mouseY / BOARD_SIZE)];
          board.tiles[floor(mouseX / BOARD_SIZE)][floor(mouseY / BOARD_SIZE)] = selectedPiece;
          turn = !turn;
          break;
        }
      }
      selectedPiece.pos = [selectedPiece.coords[0] * BOARD_SIZE, selectedPiece.coords[1] * BOARD_SIZE];
      selectedPiece = null;
    }
  }
  push();
  translate(10, 10);
  board.draw();
  pop();
}
