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
    this.hasMoved = false;
  }

  makeMove(move, b = BOARD){
    // Remove it from previous coord
    b.tiles[this.coords[0]][this.coords[1]] = null;
    // Move the piece's coords
    this.coords = move;
    // Place it on the new coord
    b.tiles[move[0]][move[1]] = this;
    // Update pieces drawing pos
    this.pos = [this.coords[0] * BOARD_SIZE, this.coords[1] * BOARD_SIZE];
    // Change hasMoved
    if(!this.hasMoved)
      this.hasMoved = true;
    // Check for castling
    if(move.length == 3){
      // Castling queenside
      if(move[2]){
        // Move a rook
        b.tiles[this.coords[0] - 2][this.coords[1]].makeMove([this.coords[0] + 1, this.coords[1]], b);
      }else{
        // Castling kingside, move h rook
        b.tiles[this.coords[0] + 1][this.coords[1]].makeMove([this.coords[0] - 1, this.coords[1]], b);
      }
    }

    // If Im a pawn, check for queening
    if(this.value == 1){
      b.updatePromoters();
    }
  }

  getLegalMoves(b = BOARD){
    var legalMoves = [];
    var moves = this.getMoves(b);
    var boardCopy;
    for(var i = 0; i < moves.length; i++){
      boardCopy = b.copy(); // Copy current board state
      // Check for castling move
      if(moves[i].length == 3){
        // Check if path towards castling is safe
        if(moves[i][2])
          // Move the king one step towards queenside castle, check if safe
          boardCopy.tiles[this.coords[0]][this.coords[1]].makeMove([this.coords[0] - 1, this.coords[1]], boardCopy);
        else
          // Move the king one step towards kingside castle, check if safe
          boardCopy.tiles[this.coords[0]][this.coords[1]].makeMove([this.coords[0] + 1, this.coords[1]], boardCopy);
        if(boardCopy.isInCheck(this.dark))
          continue;
        else
          boardCopy = b.copy(); // Re-Copy current board state
      }
      // Make the move on the copied board
      boardCopy.tiles[this.coords[0]][this.coords[1]].makeMove(moves[i], boardCopy);
      // Check if legal
      if(!boardCopy.isInCheck(this.dark))
        legalMoves.push(moves[i]);
    }

    return legalMoves;
  }
}

class Pawn extends Piece{
  constructor(coords, size, dark = false) {
    super(coords, size, dark);
    this.value = 1;
    this.white_value_table = [   [  0, 0,  0,  0,  0,  0,  0,  0],
                                 [50, 50, 50, 50, 50, 50, 50 ,50],
                                 [10, 10, 20, 30, 30, 20, 10, 10],
                                 [ 5,  5, 10, 25, 25, 10,  5,  5],
                                 [ 0,  0,  0, 20, 20,  0,  0,  0],
                                 [ 5, -5,-10,  0,  0,-10, -5,  5],
                                 [ 5,  10,10,-20,-20,  10,  10 , 5],
                                 [ 0,  0,  0,  0,  0,  0,  0,  0]];
  }
  getMoves(b = BOARD){
    var moves = [];
    var m = -1;
    if(this.dark)
      m *= -1;
    // Check if it can move forward
    if((this.coords[1] != 7 && !this.dark) || (this.coords[1] != 0 && this.dark)){
      if(b.tiles[this.coords[0]][this.coords[1] + m] == null){
        moves.push([this.coords[0], this.coords[1] + m]);
      }
    }

    // If it can, and it is still on the second or seventh rank, check if it can double move forward
    if(moves.length && (this.coords[1] == 1 || this.coords[1] == 6)){
      if(b.tiles[this.coords[0]][this.coords[1] + m * 2] == null){
        moves.push([this.coords[0], this.coords[1] + m * 2]);
      }
    }

    // Check if it can capture on either diagonal
    if(this.coords[0] != 7){
      if(b.tiles[this.coords[0] + 1][this.coords[1] + m] != null){
        if(b.tiles[this.coords[0] + 1][this.coords[1] + m].dark != this.dark){
          moves.push([this.coords[0] + 1, this.coords[1] + m]);
        }
      }
    }
    if(this.coords[0] != 0){
      if(b.tiles[this.coords[0] - 1][this.coords[1] + m] != null){
        if(b.tiles[this.coords[0] - 1][this.coords[1] + m].dark != this.dark){
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
    this.white_value_table = [   [-50,-40,-30,-30,-30,-30,-40, -50],
                                 [-40,-20,  0,  0,  0,  0,-20, -40],
                                 [-30,  0, 10, 15, 15, 10,  0, -30],
                                 [-30,  5, 15, 20, 20, 15,  5, -30],
                                 [-30,  0, 15, 20, 20, 15,  0, -30],
                                 [-30,  5, 10, 15, 15, 10,  5, -30],
                                 [-40,-20,10,-20,-20,  10, 10, -40],
                                 [-50,-40,-30,-30,-30,-30,-40, -50]];
  }
  getMoves(b = BOARD){
    var moves = [];
    // Check each of the knight positions
    for(var i = 0; i < KNIGHT_MOVES.length; i++){
      // Check if it is inside board
      if(this.coords[0] + KNIGHT_MOVES[i][0] > 7 || this.coords[0] + KNIGHT_MOVES[i][0] < 0
        || this.coords[1] + KNIGHT_MOVES[i][1] > 7 || this.coords[1] + KNIGHT_MOVES[i][1] < 0)
        continue;

      if(b.tiles[this.coords[0] + KNIGHT_MOVES[i][0]][this.coords[1] + KNIGHT_MOVES[i][1]] == null)
        moves.push([this.coords[0] + KNIGHT_MOVES[i][0], this.coords[1] + KNIGHT_MOVES[i][1]]);
      else if(b.tiles[this.coords[0] + KNIGHT_MOVES[i][0]][this.coords[1] + KNIGHT_MOVES[i][1]].dark != this.dark)
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
    this.white_value_table = [   [-20,-40,-30,-30,-30,-30,-40, -20],
                                 [-10,  0,  0,  0,  0,  0,  0, -10],
                                 [-10,  0,  5, 10, 10,  5,  0, -10],
                                 [-10,  5,  5, 10, 10,  5,  5, -10],
                                 [-10,  0, 10, 10, 10, 10,  0, -10],
                                 [-10, 10, 10, 10, 10, 10, 10, -10],
                                 [-10,  5,  0,  0,  0,  0,   5, -10],
                                 [-20,-40,-30,-30,-30,-30,-40, -20]];
  }
  getMoves(b = BOARD){
    var moves = [];
    // Check each diagonal, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < BISHOP_DIAGONALS.length; i++){
      var x = 1
      var y = 1;
      while(this.coords[0] + BISHOP_DIAGONALS[i][0] * x < 8 && this.coords[0] + BISHOP_DIAGONALS[i][0] * x > -1
            && this.coords[1] + BISHOP_DIAGONALS[i][1] * y < 8 && this.coords[1] + BISHOP_DIAGONALS[i][1] * y > -1){
              // In the board, check if square is empty
              if(b.tiles[this.coords[0] + BISHOP_DIAGONALS[i][0] * x][this.coords[1] + BISHOP_DIAGONALS[i][1] * y]  == null){
                moves.push([this.coords[0] + BISHOP_DIAGONALS[i][0] * x, this.coords[1] + BISHOP_DIAGONALS[i][1] * y]);
              }
              // Or has opposite color piece
              else if(b.tiles[this.coords[0] + BISHOP_DIAGONALS[i][0] * x][this.coords[1] + BISHOP_DIAGONALS[i][1] * y].dark != this.dark){
                moves.push([this.coords[0] + BISHOP_DIAGONALS[i][0] * x, this.coords[1] + BISHOP_DIAGONALS[i][1] * y]);
                break;
              }
              else
                break;

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
    this.white_value_table = [   [ 0,  0,  0,  0,  0,  0,  0,  0],
                                 [ 5, 10, 10, 10, 10, 10, 10,  5],
                                 [-5,  0,  0,  0,  0,  0,  0, -5],
                                 [-5,  0,  0,  0,  0,  0,  0, -5],
                                 [-5,  0,  0,  0,  0,  0,  0, -5],
                                 [-5,  0,  0,  0,  0,  0,  0, -5],
                                 [-5,  0,  0,  0,  0,  0,  0, -5],
                                 [ 0,  0,  0,  5,  5,  0,  0,  0]];
  }
  getMoves(b = BOARD){
    var moves = [];
    // Check each file, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < ROOK_FILES.length; i++){
      var x = 1
      var y = 1;
      while(this.coords[0] + ROOK_FILES[i][0] * x < 8 && this.coords[0] + ROOK_FILES[i][0] * x > -1
            && this.coords[1] + ROOK_FILES[i][1] * y < 8 && this.coords[1] + ROOK_FILES[i][1] * y > -1){
              // In the board, check if square is empty
              if(b.tiles[this.coords[0] + ROOK_FILES[i][0] * x][this.coords[1] + ROOK_FILES[i][1] * y]  == null){
                moves.push([this.coords[0] + ROOK_FILES[i][0] * x, this.coords[1] + ROOK_FILES[i][1] * y]);
              }
              // Or has opposite color piece
              else if(b.tiles[this.coords[0] + ROOK_FILES[i][0] * x][this.coords[1] + ROOK_FILES[i][1] * y].dark != this.dark){
                moves.push([this.coords[0] + ROOK_FILES[i][0] * x, this.coords[1] + ROOK_FILES[i][1] * y]);
                break;
              }else{
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
    this.white_value_table = [   [-20,-10,-10,-5,-5,-10,-10, -20],
                                 [-10,  0,  0,  0,  0, 0, 0, -10],
                                 [-10,  0,  5,  5,  5, 5, 0, -10],
                                 [-5,   0,  5,  5,  5, 5, 0, -5],
                                 [ 0,   0,  5,  5,  5, 5, 0, -5],
                                 [-10,  5,  5,  5,  5, 5, 0, -10],
                                 [-10,  0,  5,  0,  0, 0, 0, -10],
                                 [-20,-10,-10,-5,-5,-10,-10, -20]];
  }
  getMoves(b = BOARD){
    var moves = [];
    // Check each direction, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < QUEEN_DIRECTIONS.length; i++){
      var x = 1
      var y = 1;
      while(this.coords[0] + QUEEN_DIRECTIONS[i][0] * x < 8 && this.coords[0] + QUEEN_DIRECTIONS[i][0] * x > -1
            && this.coords[1] + QUEEN_DIRECTIONS[i][1] * y < 8 && this.coords[1] + QUEEN_DIRECTIONS[i][1] * y > -1){
              // In the board, check if square is empty
              if(b.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0] * x][this.coords[1] + QUEEN_DIRECTIONS[i][1] * y]  == null){
                moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0] * x, this.coords[1] + QUEEN_DIRECTIONS[i][1] * y]);
              }
              // Or has opposite color piece
              else if(b.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0] * x][this.coords[1] + QUEEN_DIRECTIONS[i][1] * y].dark != this.dark){
                moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0] * x, this.coords[1] + QUEEN_DIRECTIONS[i][1] * y]);
                break;
              }
              else
                break;

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
    this.value = 1000;
    this.white_value_table = [   [-30,-40,-40,-50,-50,-40,-40,-30],
                                 [-30,-40,-40,-50,-50,-40,-40,-30],
                                 [-30,-40,-40,-50,-50,-40,-40,-30],
                                 [-30,-40,-40,-50,-50,-40,-40,-30],
                                 [-30,-40,-40,-50,-50,-40,-40,-30],
                                 [-30,-40,-40,-50,-50,-40,-40,-30],
                                 [ 20, 20,  0,  0,  0,  0, 20, 20],
                                 [ 20, 30, 10,  0,  0, 10, 30, 20]];
  }
  getMoves(b = BOARD){
    var moves = [];
    // Check each direction, untill it hits a piece from he opposite color or leaves the board
    for(var i = 0; i < QUEEN_DIRECTIONS.length; i++){
      if(this.coords[0] + QUEEN_DIRECTIONS[i][0] < 8 && this.coords[0] + QUEEN_DIRECTIONS[i][0] > -1
        && this.coords[1] + QUEEN_DIRECTIONS[i][1] < 8 && this.coords[1] + QUEEN_DIRECTIONS[i][1] > -1){
          // In the board, check if square is empty
          if(b.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0]][this.coords[1] + QUEEN_DIRECTIONS[i][1]]  == null)
            moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0], this.coords[1] + QUEEN_DIRECTIONS[i][1]]);

          // Or has opposite color piece
          else if(b.tiles[this.coords[0] + QUEEN_DIRECTIONS[i][0]][this.coords[1] + QUEEN_DIRECTIONS[i][1]].dark != this.dark)
            moves.push([this.coords[0] + QUEEN_DIRECTIONS[i][0], this.coords[1] + QUEEN_DIRECTIONS[i][1]]);
      }
    }

    // Check for castle availability
    if(!this.hasMoved){
      // Kingside
      if(b.tiles[this.coords[0] + 1][this.coords[1]] == null && b.tiles[this.coords[0] + 2][this.coords[1]] == null
        && b.tiles[this.coords[0] + 3][this.coords[1]] != null)
          if(!b.tiles[this.coords[0] + 3][this.coords[1]].hasMoved)
            moves.push([this.coords[0] + 2, this.coords[1], 0]);

      // Queenside
      if(b.tiles[this.coords[0] - 1][this.coords[1]] == null && b.tiles[this.coords[0] - 2][this.coords[1]] == null
         && b.tiles[this.coords[0] - 3][this.coords[1]] == null && b.tiles[this.coords[0] - 4][this.coords[1]] != null)
          if(!b.tiles[this.coords[0] - 4][this.coords[1]].hasMoved)
            moves.push([this.coords[0] - 2, this.coords[1], 1]);
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
