var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var grammarP = document.getElementById("grammar");
var sysTypeDropDown = document.getElementById("systype");

var INDEX;

var ALPHABETS = ["01[]", "F+-", "AB+-", "XYF+-", "F+-[]"]
var AXIOMS = ["0", "F", "A", "FX", "F"];
var LENGTHS = [20, 15, 15, 25, 20];
var CURR_LENGTHS = [20, 15, 15, 25, 20];
var LENGTH_CHANGE_RATE = [0.65, 0.55, 0.75, 0.8, 0.7]
var ANGLES = [Math.PI/4, Math.PI/3, Math.PI/3, Math.PI/2, Math.PI/7.2];
var START_POS = [[200, 400], [10, 390], [10, 390], [200, 200], [200, 400]];
var CANVAS_ROTATION = [0, 0, 0, 0, -Math.PI/6];

var GRAMMAR;

function selectSys(){
  INDEX = sysTypeDropDown.value;
  GRAMMAR = AXIOMS[INDEX];
  console.log(LENGTHS[INDEX]);
  CURR_LENGTHS[INDEX] = LENGTHS[INDEX];
  grammarP.innerHTML = GRAMMAR;
}

selectSys();
