// DEFINING ALL IMAGE CONSTANTS
let PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING;
let DARK_PAWN, DARK_KNIGHT, DARK_BISHOP, DARK_ROOK, DARK_QUEEN, DARK_KING;
let IMAGES;


// DEFINING MOVE PATTERNS
let KNIGHT_MOVES = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
let BISHOP_DIAGONALS = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
let ROOK_FILES = [[0, 1], [1, 0], [0, -1], [-1, 0]];
let QUEEN_DIRECTIONS = BISHOP_DIAGONALS.concat(ROOK_FILES);

class Piece {
  constructor(coords, size, dark = false) {
    this.coords = coords;
    this.pos = [coords[0] * size, coords[1] * size];
    this.size = size;
    this.dark = dark;
  }
}

class Pawn extends Piece{
  constructor(coords, size, dark = false) {
    super(coords, size, dark);
    this.value = 1;
  }
  getLegalMoves(){
    var moves = [];
    var m = -1;
    if(this.dark)
      m *= -1;
    // Check if it can move forward
    if((this.coords[1] != 7 && !this.dark) || (this.coords[1] != 0 && this.dark)){
      if(board.tiles[this.coords[0]][this.coords[1] + m] == null){
        moves.push([this.coords[0], this.coords[1] + m]);
      }
    }

    // If it can, and it is still on the second or seventh rank, check if it can double move forward
    if(moves.length && (this.coords[1] == 1 || this.coords[1] == 6)){
      if(board.tiles[this.coords[0]][this.coords[1] + m * 2] == null){
        moves.push([this.coords[0], this.coords[1] + m * 2]);
      }
    }

    // Check if it can capture on either diagonal
    if(this.coords[0] != 7){
      if(board.tiles[this.coords[0] + 1][this.coords[1] + m] != null){
        if(board.tiles[this.coords[0] + 1][this.coords[1] + m].dark != this.dark){
          moves.push([this.coords[0] + 1, this.coords[1] + m]);
        }
      }
    }
    if(this.coords[0] != 0){
      if(board.tiles[this.coords[0] - 1][this.coords[1] + m] != null){
        if(board.tiles[this.coords[0] - 1][this.coords[1] + m].dark != this.dark){
          moves.push([this.coords[0] - 1, this.coords[1] + m]);
        }
      }
    }

    return moves;
  }
  draw(){
    if(!this.dark)
      image(PAWN, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_PAWN, this.pos[0], this.pos[1], this.size, this.size);
  }
}

class Knight extends Piece{
  constructor(coords, size, dark = false) {
    super(coords, size, dark);
    this.value = 3;
  }
  getLegalMoves(){
    var moves = [];
    // Check each of the knight positions
    for(var i = 0; i < KNIGHT_MOVES.length; i++){
      // Check if it is inside board
      if(this.coords[0] + KNIGHT_MOVES[i][0] > 7 || this.coords[0] + KNIGHT_MOVES[i][0] < 0
        || this.coords[1] + KNIGHT_MOVES[i][1] > 7 || this.coords[1] + KNIGHT_MOVES[i][1] < 0)
        continue;

      if(board.tiles[this.coords[0] + KNIGHT_MOVES[i][0]][this.coords[1] + KNIGHT_MOVES[i][1]] == null)
        moves.push([this.coords[0] + KNIGHT_MOVES[i][0], this.coords[1] + KNIGHT_MOVES[i][1]]);
      else if(board.tiles[this.coords[0] + KNIGHT_MOVES[i][0]][this.coords[1] + KNIGHT_MOVES[i][1]].dark != this.dark)
        moves.push([this.coords[0] + KNIGHT_MOVES[i][0], this.coords[1] + KNIGHT_MOVES[i][1]]);

    }
    return moves;
  }
  draw(){
    if(!this.dark)
      image(KNIGHT, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_KNIGHT, this.pos[0], this.pos[1], this.size, this.size);
  }
}
class Bishop extends Piece{
  constructor(coords, size, dark = false) {
    super(coords, size, dark);
    this.value = 3.5;
  }
  getLegalMoves(){
    var moves = [];
    // Check each diagonal, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < BISHOP_DIAGONALS.length; i++){
      var x = 1
      var y = 1;
      while(this.coords[0] + BISHOP_DIAGONALS[i][0] * x < 8 && this.coords[0] + BISHOP_DIAGONALS[i][0] * x > -1
            && this.coords[1] + BISHOP_DIAGONALS[i][1] * y < 8 && this.coords[1] + BISHOP_DIAGONALS[i][1] * y > -1){
              // In the board, check if square is empty
              if(board.tiles[this.coords[0] + BISHOP_DIAGONALS[i][0] * x][this.coords[1] + BISHOP_DIAGONALS[i][1] * y]  == null){
                moves.push([this.coords[0] + BISHOP_DIAGONALS[i][0] * x, this.coords[1] + BISHOP_DIAGONALS[i][1] * y]);
              }
              // Or has opposite color piece
              else if(board.tiles[this.coords[0] + BISHOP_DIAGONALS[i][0] * x][this.coords[1] + BISHOP_DIAGONALS[i][1] * y].dark != this.dark){
                moves.push([this.coords[0] + BISHOP_DIAGONALS[i][0] * x, this.coords[1] + BISHOP_DIAGONALS[i][1] * y]);
                break;
              }

              x += 1;
              y += 1;
      }
    }

    return moves;
  }
  draw(){
    if(!this.dark)
      image(BISHOP, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_BISHOP, this.pos[0], this.pos[1], this.size, this.size);
  }
}

class Rook extends Piece{
  constructor(coords, size, dark = false) {
    super(coords, size, dark);
    this.value = 5;
  }
  getLegalMoves(){
    var moves = [];
    // Check each file, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < ROOK_FILES.length; i++){
      var x = 1
      var y = 1;
      while(this.coords[0] + ROOK_FILES[i][0] * x < 8 && this.coords[0] + ROOK_FILES[i][0] * x > -1
            && this.coords[1] + ROOK_FILES[i][1] * y < 8 && this.coords[1] + ROOK_FILES[i][1] * y > -1){
              // In the board, check if square is empty
              if(board.tiles[this.coords[0] + ROOK_FILES[i][0] * x][this.coords[1] + ROOK_FILES[i][1] * y]  == null){
                moves.push([this.coords[0] + ROOK_FILES[i][0] * x, this.coords[1] + ROOK_FILES[i][1] * y]);
              }
              // Or has opposite color piece
              else if(board.tiles[this.coords[0] + ROOK_FILES[i][0] * x][this.coords[1] + ROOK_FILES[i][1] * y].dark != this.dark){
                moves.push([this.coords[0] + ROOK_FILES[i][0] * x, this.coords[1] + ROOK_FILES[i][1] * y]);
                break;
              }

              x += 1;
              y += 1;
      }
    }
    return moves;
  }
  draw(){
    if(!this.dark)
      image(ROOK, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_ROOK, this.pos[0], this.pos[1], this.size, this.size);
  }
}

class Queen extends Piece{
  constructor(coords, size, dark = false) {
    super(coords, size, dark);
    this.value = 9;
  }
  getLegalMoves(){
    var moves = [];
    // Check each direction, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < QUEEN_DIRECTIONS.length; i++){
      var x = 1
      var y = 1;
      while(this.coords[0] + QUEEN_DIRECTIONS[i][0] * x < 8 && this.coords[0] + QUEEN_DIRECTIONS[i][0] * x > -1
            && this.coords[1] + QUEEN_DIRECTIONS[i][1] * y < 8 && this.coords[1] + QUEEN_DIRECTIONS[i][1] * y > -1){
              // In the board, check if square is empty
              if(board.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0] * x][this.coords[1] + QUEEN_DIRECTIONS[i][1] * y]  == null){
                moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0] * x, this.coords[1] + QUEEN_DIRECTIONS[i][1] * y]);
              }
              // Or has opposite color piece
              else if(board.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0] * x][this.coords[1] + QUEEN_DIRECTIONS[i][1] * y].dark != this.dark){
                moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0] * x, this.coords[1] + QUEEN_DIRECTIONS[i][1] * y]);
                break;
              }

              x += 1;
              y += 1;
      }
    }
    return moves;
  }
  draw(){
    if(!this.dark)
      image(QUEEN, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_QUEEN, this.pos[0], this.pos[1], this.size, this.size);

  }
}

class King extends Piece{
  constructor(coords, size, dark = false) {
    super(coords, size, dark);
    this.value = 10000;
  }
  getLegalMoves(){
    var moves = [];
    // Check each direction, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < QUEEN_DIRECTIONS.length; i++){
      if(this.coords[0] + QUEEN_DIRECTIONS[i][0] < 8 && this.coords[0] + QUEEN_DIRECTIONS[i][0] > -1
        && this.coords[1] + QUEEN_DIRECTIONS[i][1] < 8 && this.coords[1] + QUEEN_DIRECTIONS[i][1] > -1){
          // In the board, check if square is empty
          if(board.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0]][this.coords[1] + QUEEN_DIRECTIONS[i][1]]  == null)
            moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0], this.coords[1] + QUEEN_DIRECTIONS[i][1]]);

          // Or has opposite color piece
          else if(board.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0]][this.coords[1] + QUEEN_DIRECTIONS[i][1]].dark != this.dark)
            moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0], this.coords[1] + QUEEN_DIRECTIONS[i][1]]);
      }
    }
    return moves;
  }
  draw(){
    if(!this.dark)
      image(KING, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_KING, this.pos[0], this.pos[1], this.size, this.size);
  }
}
