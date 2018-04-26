let BOARD_LAYOUT = [[10,  8,  9, 11, 12,  9,  8, 10],
                    [ 7,  7,  7,  7,  7,  7,  7 , 7],
                    [ 0,  0,  0,  0,  0,  0,  0,  0],
                    [ 0,  0,  0,  0,  0,  0,  0,  0],
                    [ 0,  0,  0,  0,  0,  0,  0,  0],
                    [ 0,  0,  0,  0,  0,  0,  0,  0],
                    [ 1,  1,  1,  1,  1,  1,  1 , 1],
                    [ 4,  2,  3,  5,  6,  3,  2,  4]];

class Board {
  constructor(tileSize, layout = BOARD_LAYOUT, hasMovedLayout = null) {
    this.tileSize = tileSize;
    this.height = tileSize * 8;
    this.width = tileSize * 8;
    this.tiles = Array(8);

    for(var i = 0; i < 8; i++){
      this.tiles[i] = Array(8);
    }

    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){

        var dark = false;
        if(layout[j][i] > 6)
          dark = true;

        if(layout[j][i] == 0){
          this.tiles[i][j] = null;
          continue;
        }
        else if(layout[j][i] == 6 || layout[j][i] == 12)
          this.tiles[i][j] = new King([i, j], this.tileSize, dark);
        else if(layout[j][i] % 6 < 2)
          this.tiles[i][j] = new Pawn([i, j], this.tileSize, dark);
        else if(layout[j][i] % 6 == 2)
          this.tiles[i][j] = new Knight([i, j], this.tileSize, dark);
        else if(layout[j][i] % 6 == 3)
          this.tiles[i][j] = new Bishop([i, j], this.tileSize, dark);
        else if(layout[j][i] % 6 == 4)
          this.tiles[i][j] = new Rook([i, j], this.tileSize, dark);
        else if(layout[j][i] % 6 == 5)
          this.tiles[i][j] = new Queen([i, j], this.tileSize, dark);

        if(hasMovedLayout != null){
          this.tiles[i][j].hasMoved = hasMovedLayout[j][i];
        }
      }
    }
  }

  copy(){
    var copyLayout = [[], [], [], [], [], [], [], []];
    var hasMovedLayout = [[], [], [], [], [], [], [], []];
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        if(this.tiles[i][j] == null){
          copyLayout[j][i] = 0;
          continue;
        }
        else if(this.tiles[i][j].value == 1){
          if(this.tiles[i][j].dark)
            copyLayout[j][i] = 7;
          else
            copyLayout[j][i] = 1;
        }

        else if(this.tiles[i][j].value == 3){
          if(this.tiles[i][j].dark)
            copyLayout[j][i] = 8;
          else
            copyLayout[j][i] = 2;
        }

        else if(this.tiles[i][j].value == 3.5){
          if(this.tiles[i][j].dark)
            copyLayout[j][i] = 9;
          else
            copyLayout[j][i] = 3;
        }

        else if(this.tiles[i][j].value == 5){
          if(this.tiles[i][j].dark)
            copyLayout[j][i] = 10;
          else
            copyLayout[j][i] = 4;
        }

        else if(this.tiles[i][j].value == 9){
          if(this.tiles[i][j].dark)
            copyLayout[j][i] = 11;
          else
            copyLayout[j][i] = 5;
        }

        else if(this.tiles[i][j].value == 1000){
          if(this.tiles[i][j].dark)
            copyLayout[j][i] = 12;
          else
            copyLayout[j][i] = 6;
        }

        hasMovedLayout[j][i] = this.tiles[i][j].hasMoved;

      }
    }
    return new Board(this.tileSize, copyLayout, hasMovedLayout);

  }
  isInCheck(dark = false){
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        // Is there a piece on this square?
        if(this.tiles[i][j] == null)
          continue;
        // Is it from the opposite color, and not the enemy king?
        if(this.tiles[i][j].dark != dark && this.tiles[i][j].value != 1000){
          // Get its moves
          var moves = this.tiles[i][j].getMoves(this);
          for(var k = 0; k < moves.length; k++){
            // Is it eyeing anything?
            if(this.tiles[moves[k][0]][moves[k][1]] == null)
              continue;
            // Is it my king?
            if(this.tiles[moves[k][0]][moves[k][1]].value == 1000 && this.tiles[moves[k][0]][moves[k][1]].dark == dark)
              return true;
          }
        }
      }
    }

    return false;
  }
  updatePromoters(){
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j+=7){
        if(this.tiles[i][j] == null)
          continue;
        if(this.tiles[i][j].value == 1){
          this.tiles[i][j] = new Queen([i, j], this.tileSize, this.tiles[i][j].dark);
        }
      }
    }
  }
  draw(){
    fill(0, 255, 0);
    noStroke();
    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        if(i % 2){
          if(!(j % 2)){
            rect(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
          }
        }else{
          if(j % 2){
            rect(i * this.tileSize, j * this.tileSize, this.tileSize, this.tileSize);
          }
        }
      }
    }


    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        if(this.tiles[i][j] != null)
          this.tiles[i][j].draw();
      }
    }

  }
}
