let BOARD_LAYOUT = [[10, 8, 9, 11, 12, 9, 8, 10],
                    [7, 7, 7, 7, 7, 7, 7 ,7],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1 ,1],
                    [4, 2, 3, 5, 6, 3, 2, 4]];

class Board {
  constructor(tileSize) {
    this.tileSize = tileSize;
    this.height = tileSize * 8;
    this.width = tileSize * 8;
    this.tiles = Array(8);

    for(var i = 0; i < 8; i++){
      this.tiles[i] = Array(8);
    }

    for(var i = 0; i < 8; i++){
      for(var j = 0; j < 8; j++){
        if(BOARD_LAYOUT[j][i] == 0)
          this.tiles[i][j] = null;
        else if(BOARD_LAYOUT[j][i] == 1)
          this.tiles[i][j] = new Pawn([i, j], this.tileSize);
        else if(BOARD_LAYOUT[j][i] == 2)
          this.tiles[i][j] = new Knight([i, j], this.tileSize);
        else if(BOARD_LAYOUT[j][i] == 3)
          this.tiles[i][j] = new Bishop([i, j], this.tileSize);
        else if(BOARD_LAYOUT[j][i] == 4)
          this.tiles[i][j] = new Rook([i, j], this.tileSize);
        else if(BOARD_LAYOUT[j][i] == 5)
          this.tiles[i][j] = new Queen([i, j], this.tileSize);
        else if(BOARD_LAYOUT[j][i] == 6)
          this.tiles[i][j] = new King([i, j], this.tileSize);
        else if(BOARD_LAYOUT[j][i] == 7)
          this.tiles[i][j] = new Pawn([i, j], this.tileSize, true);
        else if(BOARD_LAYOUT[j][i] == 8)
          this.tiles[i][j] = new Knight([i, j], this.tileSize, true);
        else if(BOARD_LAYOUT[j][i] == 9)
          this.tiles[i][j] = new Bishop([i, j], this.tileSize, true);
        else if(BOARD_LAYOUT[j][i] == 10)
          this.tiles[i][j] = new Rook([i, j], this.tileSize, true);
        else if(BOARD_LAYOUT[j][i] == 11)
          this.tiles[i][j] = new Queen([i, j], this.tileSize, true);
        else if(BOARD_LAYOUT[j][i] == 12)
          this.tiles[i][j] = new King([i, j], this.tileSize, true);
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
        if(this.tiles[i][j] != null)
          this.tiles[i][j].draw();
      }
    }
  }
}
