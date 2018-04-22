let PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING;
let DARK_PAWN, DARK_KNIGHT, DARK_BISHOP, DARK_ROOK, DARK_QUEEN, DARK_KING;
let IMAGES;

class Piece {
  constructor(pos, size, dark = false) {
    this.pos = pos;
    this.size = size;
    this.dark = dark;
  }
}

class Pawn extends Piece{
  constructor(pos, size, dark = false) {
    super(pos, size, dark);
    this.value = 1;
  }
  draw(){
    if(!this.dark)
      image(PAWN, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_PAWN, this.pos[0], this.pos[1], this.size, this.size);
  }
}

class Knight extends Piece{
  constructor(pos, size, dark = false) {
    super(pos, size, dark);
    this.value = 3;
  }
  draw(){
    if(!this.dark)
      image(KNIGHT, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_KNIGHT, this.pos[0], this.pos[1], this.size, this.size);
  }
}
class Bishop extends Piece{
  constructor(pos, size, dark = false) {
    super(pos, size, dark);
    this.value = 3.5;
  }
  draw(){
    if(!this.dark)
      image(BISHOP, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_BISHOP, this.pos[0], this.pos[1], this.size, this.size);
  }
}

class Rook extends Piece{
  constructor(pos, size, dark = false) {
    super(pos, size, dark);
    this.value = 5;
  }
  draw(){
    if(!this.dark)
      image(ROOK, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_ROOK, this.pos[0], this.pos[1], this.size, this.size);
  }
}

class Queen extends Piece{
  constructor(pos, size, dark = false) {
    super(pos, size, dark);
    this.value = 9;
  }
  draw(){
    if(!this.dark)
      image(QUEEN, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_QUEEN, this.pos[0], this.pos[1], this.size, this.size);

  }
}

class King extends Piece{
  constructor(pos, size, dark = false) {
    super(pos, size, dark);
    this.value = 10000;
  }
  draw(){
    if(!this.dark)
      image(KING, this.pos[0], this.pos[1], this.size, this.size);
    else
      image(DARK_KING, this.pos[0], this.pos[1], this.size, this.size);
  }
}
