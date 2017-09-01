function Turtle(){
  canvas.setTransform(1, 0, 0, 1, 0, 0);
  canvas.beginPath();
  canvas.clearRect(0, 0, 400, 400);

  canvas.strokeStyle = "#000000";
  canvas.translate(START_POS[INDEX][0], START_POS[INDEX][1]);
  for(var i = 0; i < GRAMMAR.length; i++){
    var char = GRAMMAR.charAt(i);
    for(var j = 0; j < TURTLE_RULES[INDEX].length; j++){
      if(char == TURTLE_RULES[INDEX][j].in){
        TURTLE_RULES[INDEX][j].out();
        break;
      }
    }
  }

  canvas.stroke();

  CURR_LENGTHS[INDEX] *= LENGTH_CHANGE_RATE[INDEX];
}
