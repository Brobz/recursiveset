function Generate(){
  grammarP.innerHTML = GRAMMAR;
  Turtle();
  var nGrammar = "";
  for(var i = 0; i < GRAMMAR.length; i++){
    var char = GRAMMAR.charAt(i);
    var changed = false;

    for(var j = 0; j < GRAMMAR_RULES[INDEX].length; j++){
      if(char == GRAMMAR_RULES[INDEX][j].in){
        changed = true;
        nGrammar += GRAMMAR_RULES[INDEX][j].out;
        break
      }
    }

    if(!changed)
      nGrammar += char;
  }

  GRAMMAR = nGrammar;
}
