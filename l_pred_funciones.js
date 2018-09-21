//Taggear según respuesta dada
var taggear_respuesta = function(trial_data, opciones_mostradas, opciones_originales){
    var respuesta_dada = trial_data.button_pressed;
    var texto_dado = opciones_mostradas[respuesta_dada];
    var opcion_elegida = opciones_originales.indexOf(texto_dado);
    if(respuesta_dada != null){
    if (opcion_elegida == 2) {
      jsPsych.data.addDataToLastTrial({respuesta: -1 });
    } else {
      jsPsych.data.addDataToLastTrial({respuesta: opcion_elegida});
    }} else {
      jsPsych.data.addDataToLastTrial({respuesta: 'null'});
    }
};


var alertaPractica = function(){
  alert("Esta es un ejemplo. Presione aceptar y siguiente para continuar leyendo las instrucciones.");
};
