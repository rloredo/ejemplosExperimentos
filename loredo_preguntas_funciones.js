// Función es correcta
var es_correcta = function(data){
  if (data.clase_preg == 'preg_1' && data.key_press == 74) {
    correct = true; jsPsych.data.addDataToLastTrial({correct: correct});
  } else if (data.clase_preg == 'preg_0' && data.key_press == 70) {
    correct = true; jsPsych.data.addDataToLastTrial({correct:  correct});
  } else if (data.clase_preg == 'preg_2' && data.key_press == 70) {
    correct = "ambigua_0"; jsPsych.data.addDataToLastTrial({correct: correct});
  } else if (data.clase_preg == 'preg_2' && data.key_press == 74) {
    correct = "ambigua_1"; jsPsych.data.addDataToLastTrial({correct: correct});
  } else {correct = false; jsPsych.data.addDataToLastTrial({correct: correct});}
    correct = false;
};
