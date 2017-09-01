var GRAMMAR_RULES = [

              [ /// RULE 0 START ///
                  {
                    in : "1",
                    out : "11"
                  },
                  {
                    in : "0",
                    out : "1[0]0"
                  },
              ], /// RULE 0 END ///
              [ /// RULE 1 START ///
                  {
                    in : "F",
                    out : "F+F--F+F"
                  },
              ], /// RULE 1 END ///
              [ /// RULE 2 START ///
                  {
                    in : "A",
                    out : "+B-A-B+"
                  },
                  {
                    in : "B",
                    out : "-A+B+A-"
                  },
              ], /// RULE 2 END ///
              [ /// RULE 3 START ///
                  {
                    in : "X",
                    out : "X+YF+"
                  },
                  {
                    in : "Y",
                    out : "-FX-Y"
                  },
              ], /// RULE 3 END ///
              [ /// RULE 4 START ///
                  {
                    in : "F",
                    out : "FF+[+F-F-F]-[-F+F+F]"
                  },
              ], /// RULE 4 END ///

            ];

var TURTLE_RULES = [

              [ /// RULE 0 START ///
                  {
                    in : "0",
                    out : function(){
                      canvas.moveTo(0, 0);
                      canvas.lineTo(0, -CURR_LENGTHS[INDEX]);
                      canvas.translate(0, -CURR_LENGTHS[INDEX]);
                    }
                  },
                  {
                    in : "1",
                    out : function(){
                      canvas.moveTo(0, 0);
                      canvas.lineTo(0, -CURR_LENGTHS[INDEX]);
                      canvas.translate(0, -CURR_LENGTHS[INDEX]);
                    }
                  },
                  {
                    in : "[",
                    out : function(){
                      canvas.save();
                      canvas.rotate(-ANGLES[INDEX]);
                    }
                  },
                  {
                    in : "]",
                    out : function(){
                      canvas.restore();
                      canvas.rotate(ANGLES[INDEX]);
                    }
                  }
              ], /// RULE 0 END ///
              [ /// RULE 1 START ///
                  {
                    in : "F",
                    out : function(){
                      canvas.moveTo(0, 0);
                      canvas.lineTo(CURR_LENGTHS[INDEX], 0);
                      canvas.translate(CURR_LENGTHS[INDEX], 0);
                    }
                  },
                  {
                    in : "+",
                    out : function(){
                      canvas.rotate(-ANGLES[INDEX]);
                    }
                  },
                  {
                    in : "-",
                    out : function(){
                      canvas.rotate(ANGLES[INDEX]);
                    }
                  }
              ], /// RULE 1 END ///
              [ /// RULE 2 START ///
                  {
                    in : "A",
                    out : function(){
                      canvas.moveTo(0, 0);
                      canvas.lineTo(CURR_LENGTHS[INDEX], 0);
                      canvas.translate(CURR_LENGTHS[INDEX], 0);
                    }
                  },
                  {
                    in : "B",
                    out : function(){
                      canvas.moveTo(0, 0);
                      canvas.lineTo(CURR_LENGTHS[INDEX], 0);
                      canvas.translate(CURR_LENGTHS[INDEX], 0);
                    }
                  },
                  {
                    in : "+",
                    out : function(){
                      canvas.rotate(-ANGLES[INDEX]);
                    }
                  },
                  {
                    in : "-",
                    out : function(){
                      canvas.rotate(ANGLES[INDEX]);
                    }
                  }
              ], /// RULE 2 END ///
              [ /// RULE 3 START ///
                  {
                    in : "F",
                    out : function(){
                      canvas.moveTo(0, 0);
                      canvas.lineTo(CURR_LENGTHS[INDEX], 0);
                      canvas.translate(CURR_LENGTHS[INDEX], 0);
                    }
                  },
                  {
                    in : "+",
                    out : function(){
                      canvas.rotate(-ANGLES[INDEX]);
                    }
                  },
                  {
                    in : "-",
                    out : function(){
                      canvas.rotate(ANGLES[INDEX]);
                    }
                  }
              ], /// RULE 3 END ///
              [ /// RULE 4 START ///
                  {
                    in : "F",
                    out : function(){
                      canvas.moveTo(0, 0);
                      canvas.lineTo(0, -CURR_LENGTHS[INDEX]);
                      canvas.translate(0, -CURR_LENGTHS[INDEX]);
                    }
                  },
                  {
                    in : "+",
                    out : function(){
                      canvas.rotate(ANGLES[INDEX]);
                    }
                  },
                  {
                    in : "-",
                    out : function(){
                      canvas.rotate(-ANGLES[INDEX]);
                    }
                  },
                  {
                    in : "[",
                    out : function(){
                      canvas.save();
                    }
                  },
                  {
                    in : "]",
                    out : function(){
                      canvas.restore();
                    }
                  }
              ], /// RULE 4 END ///
            ];
