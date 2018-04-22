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
    this.tiles = Array(64);

    for(var i = 0; i < 64; i++){
      if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 0)
        this.tiles[i] = null;
      else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 1)
        this.tiles[i] = new Pawn([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize);
      else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 2)
        this.tiles[i] = new Knight([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize);
      else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 3)
        this.tiles[i] = new Bishop([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize);
      else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 4)
        this.tiles[i] = new Rook([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize);
      else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 5)
        this.tiles[i] = new Queen([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize);
      else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 6)
        this.tiles[i] = new King([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize);
        else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 7)
          this.tiles[i] = new Pawn([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize, true);
        else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 8)
          this.tiles[i] = new Knight([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize, true);
        else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 9)
          this.tiles[i] = new Bishop([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize, true);
        else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 10)
          this.tiles[i] = new Rook([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize, true);
        else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 11)
          this.tiles[i] = new Queen([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize, true);
        else if(BOARD_LAYOUT[floor(i / 8)][i % 8] == 12)
          this.tiles[i] = new King([i % 8 * this.tileSize, floor(i / 8) * this.tileSize], this.tileSize, true);
    }
  }
  draw(){
    fill(0, 255, 0);
    noStroke();
    for(var i = 0; i < 64; i++){
      if(floor(i / 8) % 2){
        if(!(i % 2)){
          rect( (i % 8) * this.tileSize, (floor(i / 8)) * this.tileSize, this.tileSize, this.tileSize);
        }
      }else{
        if(i % 2){
          rect( (i % 8) * this.tileSize, (floor(i / 8)) * this.tileSize, this.tileSize, this.tileSize);
        }
      }
      if(this.tiles[i] != null)
        this.tiles[i].draw();
    }
  }
}
