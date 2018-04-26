class AI {
  constructor(dark, depth, board) {
    this.depth = depth;
    this.board = board;
    this.dark = dark;
  }
  getAllLegalMoves(b = this.board, dark = this.dark){
    var moves = [];
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        // Is there a piece here?
        if(b.tiles[i][j] == null)
          continue;
        // Is it my piece?
        if(b.tiles[i][j].dark == dark){
          // Add its legal moves to the list
          moves.push({coords : [i, j], moves : b.tiles[i][j].getLegalMoves(b)});
        }
      }
    }

    return moves;
  }
  evaluate(b = this.board){
    // Evaluates, in centipawns
    var evaluation = 0;
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        // Is there a piece here?
        if(b.tiles[i][j] == null)
          continue;
        // Is it black?
        if(b.tiles[i][j].dark){
          evaluation -= b.tiles[i][j].value * 100;
          evaluation -= b.tiles[i][j].white_value_table[7 - j][i];
        }
        // Is it white?
        else{
          evaluation += b.tiles[i][j].value * 100;
          evaluation += b.tiles[i][j].white_value_table[j][i];
        }
      }
    }
    return evaluation;
  }

  evaluateAbsolute(dark, b = this.board){
    // Evaluates, in centipawns
    var evaluation = 0;
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        // Is there a piece here?
        if(b.tiles[i][j] == null)
          continue;
        // Is it my color?
        if(b.tiles[i][j].dark == dark){
          evaluation += b.tiles[i][j].value * 100;
          if(dark)
            evaluation += b.tiles[i][j].white_value_table[7 - j][i];
          else
            evaluation += b.tiles[i][j].white_value_table[j][i];
        }
        // Is it opposite color?
        else{
          evaluation -= b.tiles[i][j].value * 100;
          if(dark)
            evaluation -= b.tiles[i][j].white_value_table[j][i];
          else
            evaluation -= b.tiles[i][j].white_value_table[7 - j][i];
        }
      }
    }
    return evaluation;
  }

  mini(depth, b){
    if(!depth)
      return [this.evaluateAbsolute(this.dark, b)];
    var min = 10000000;
    var allMoves = this.getAllLegalMoves(b, !this.dark);
    var bestMove;
    for(var i = 0; i < allMoves.length; i++){
      for(var j = 0; j < allMoves[i].moves.length; j++){
        var boardCopy = b.copy();
        boardCopy.tiles[allMoves[i].coords[0]][allMoves[i].coords[1]].makeMove(allMoves[i].moves[j], boardCopy);
        var evaluation = this.maxi(depth - 0.5, boardCopy)[0];
        if(evaluation < min){
          min = evaluation;
          bestMove = {coords: allMoves[i].coords, move: allMoves[i].moves[j]};
        }
      }
    }

    return [min, bestMove];
  }

  maxi(depth, b){
    if(!depth)
      return [this.evaluateAbsolute(this.dark, b)];
    var max = -10000000;
    var allMoves = this.getAllLegalMoves(b);
    var bestMove;
    for(var i = 0; i < allMoves.length; i++){
      for(var j = 0; j < allMoves[i].moves.length; j++){
        var boardCopy = b.copy();
        boardCopy.tiles[allMoves[i].coords[0]][allMoves[i].coords[1]].makeMove(allMoves[i].moves[j], boardCopy);
        var evaluation = this.mini(depth - 0.5, boardCopy)[0];
        if(evaluation > max){
          max = evaluation;
          bestMove = {coords: allMoves[i].coords, move: allMoves[i].moves[j]};
        }
      }
    }

    return [max, bestMove];
  }

  getNextMove(){
    var result = this.maxi(this.depth, this.board);
    //console.log(result[0]);
    return result[1];
  }


}
