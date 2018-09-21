//Definir variables y funciones a utilizar

var timeline = [];
var correct = false;

// Generar id de sujeto
var subject_id = jsPsych.randomization.randomID(8);
var sorteo_id = jsPsych.randomization.randomID(12);

var formas = [1, 2];
var formasRndm = jsPsych.randomization.repeat(formas, 1);
var formasRndmAssign = formasRndm[0];

//Variable sexo para save_data
var sex = "";

// Crear bienvenida. Agrega on_finish a todos los trial el subject_id
var bienvenida = {
  type: 'html-keyboard-response',
  stimulus: '<div class="bienvenida-serif"><p>Bienvenidos a la actividad.</p><p> En la próxima página encontrará el consentimiento y las instrucciones.</p><p>Esta actividad solo puede realizarse en computadoras (NO tablet ni celulares).<p>&nbsp;<p><p><b>Presione cualquier tecla para comenzar.</b></p></div>',
  data: {bienvenida: 'bienvenida'} ,
  on_finish: jsPsych.data.addProperties({sujeto: subject_id, forma: formasRndmAssign})
};


// Crear Consentimiento
var consentimiento= {
    type: 'instructions',
    pages: [
      '<div class="small" ><p align="justify"> Esta investigación tiene como objetivo investigar la comprensión del lenguaje en adultos <b>hablantes nativos de español</b>. Si decide hacer esta actividad, primero se le solicitará información sobre su edad, sexo y nivel educativo. Luego tendrá que leer diálogos y elegir la continuación del diálogo que le parezca más probable. La actividad puede completarse en un periodo de <b>XX a XX minutos.</b></p> <p align="justify"> Su participación en <b>esta actividad es voluntaria</b> y puede abandonarla en cualquier momento que lo desee. Simplemente puede cerrar el programa que está utilizando para navegar por internet. Esta actividad no supone ningún riesgo asociado a su participación y toda la información que brinde no será compartida con nadie. Será tratada de manera <b>confidencial y anónima</b>. El programa no registra ningún tipo de dato que pueda individualizar al participante.</p> <p align="justify"> Si desea recibir más información puede escribirle a Rodrigo Loredo (Instituto de Lingüística, FFyL, UBA | CONICET), investigador responsable de esta actividad al correo <a href="mailto:loredo.rod@gmail.com" target="_blank">loredo.rod@gmail.com</a></p><p>&nbsp;</p> <p align="left"><b>Consentimiento</b></p><p align="justify"><b> Haciendo click en <i>aceptar</i> acepto participar de manera completamente voluntaria en esta actividad, entendiendo tanto el objetivo de la investigación como la descripción de las tareas a realizar. Asimismo, certifico que soy mayor de 18 años y que comprendo que tengo la libertad de abandonar la actividad en cualquier momento que lo desee.</b></p></div>',
    ],
    show_clickable_nav: true,
    button_label_next: "Aceptar"
  };


// Crear demográficos
//Datos demográficos

// Usa add.propieties para agregar demográficos a cada trial para poder filtrar después
// Definir preguntas por página
var page_1_questions = ["Edad", "Sexo"];
var page_2_questions = ["Estudios"];
var page_3_questions = ["¿En qué país vivió durante los últimos 5 años?<br> <i>Si vivió en más de uno indique aquél donde vivió mayor cantidad de años</i>"];
var page_4_questions = ["Tipo de mouse que está utilizando"];

// Escalas para usar
var page_1_options_1 = ["18 a 24 años", "25 a 39 años", "40 a 59 años ", "Más de 60 años"];
var page_1_options_2 = ["Masculino", "Femenino"];
var page_2_options = ["Primario en curso/completo", "Secundario en curso/completo", "Terciario en curso/completo", "Universitario en curso/completo", "Posgrado en curso/completo"];
var page_3_options = ["Argentina", "Uruguay", "Colombia", "Venezuela", "Chile", "Perú", "Otro país de latinoamérica", "Otro"];
var page_4_options = ["Mouse de computadora de escritorio", "Mousepad de notebook", "Mousepad de Mac o Apple"];

// Wrap todo
var demograficos_1 = {
    type: 'survey-multi-choice',
    questions: [{prompt: page_1_questions[0], options: page_1_options_1, required:true,}, {prompt: page_1_questions[1], options: page_1_options_2, required: true}],
    button_label: "Siguiente",
    on_finish: function (trial_data){
      var respuestas = trial_data.responses;
      var respuestas1 = respuestas.replace(/{"Q0":"/gi, "");
      var respuestas2 = respuestas1.replace(/","Q1":"/gi, "_");
      var respuestas3 = respuestas2.replace(/"}/gi, "");
      var edad = respuestas3.split("_")[0];
      var sexo = respuestas3.split("_")[1];
      if (sexo == "Masculino") {
        sex = "M";
      } else {
        sex = "F";
      }
      jsPsych.data.addProperties({
             edad: edad,
             sexo: sexo
           });}};

var demograficos_2 = {
    type: 'survey-multi-choice',
    questions: [{prompt: page_2_questions, options: page_2_options, required:true,}],
    button_label: "Siguiente",
    on_finish: function (trial_data){
      var respuestas = trial_data.responses;
      var respuestas1 = respuestas.replace(/{"Q0":"/gi, "");
      var respuestas2 = respuestas1.replace(/"}/gi, "");
      jsPsych.data.addProperties({
             educacion: respuestas2
           });}};

var demograficos_3 = {
    type: 'survey-multi-choice',
    questions: [{prompt: page_3_questions, options: page_3_options, required:true,}],
    button_label: "Siguiente",
    on_finish: function (trial_data){
      var respuestas = trial_data.responses;
      var respuestas1 = respuestas.replace(/{"Q0":"/gi, "");
      var respuestas2 = respuestas1.replace(/"}/gi, "");
      jsPsych.data.addProperties({
             residencia: respuestas2
           });}};

var demograficos_4 = {
    type: 'survey-multi-choice',
    questions: [{prompt: page_4_questions, options: page_4_options, required:true,}],
    button_label: "Siguiente",
    on_finish: function (trial_data){
      var respuestas = trial_data.responses;
      var respuestas1 = respuestas.replace(/{"Q0":"/gi, "");
      var respuestas2 = respuestas1.replace(/"}/gi, "");
      jsPsych.data.addProperties({
             mouse: respuestas2
           });}};


//Instrucciones
var instrucciones = {
     type: 'instructions',
     pages: [
            '<div class="instrucciones"><p style="font-size:30px;"><b>Información importante</b></p> <p>Entre los participantes de la actividad se realizará un sorteo de una orden de compra por $500. Para participar del sorteo, anote este código: </p><p style="font-size:30px;"><b>'+ sorteo_id +'</b></p><p>Si no completa la actividad, no será considerado para el sorteo.</p><p><b>Presione "siguiente" para continuar</b></div>',
            '<div class="instrucciones"><p>En esta actividad usted va a leer el contexto de un diálogo y una pregunta que comienza el diálogo.<p>Luego de leer tendrá que elegir de un grupo de opciones cuál le parece la continuación más probable. Por ejemplo:</p><div class="instrucciones-bis"><p><i>Estuve trabajando toda la semana y estoy muy cansado.</i></p><p>—¿Vas a hacer algo el fin de semana?</p><p>—  _____________________________ </p></div><button onclick="alertaPractica()" class="jspsych-btn-predic"><span style="color: grey;">Voy a descansar todos los días.</span></button>  <button onclick="alertaPractica()" class="jspsych-btn-predic"><span style="color: grey;">Voy a correr una maratón el domingo.</span></button>  <button onclick="alertaPractica()" class="jspsych-btn-predic"><span style="color: grey;">Voy a ir a un bar el sábado.</span></button><p>Para reponder tiene que presionar sobre la opción elegida.</p><p>En el medio del experimento habrá pantallas donde podrá descansar.</div>','<div class="instrucciones"><p>Tenga en cuenta que antes del texto verá unos signos  <b>++++</b> que indican dónde aparecerá el contexto.</p><p>&nbsp;</p><p>&nbsp;</p><p>Luego de unos segundos aparecerá el diálogo y las opciones.</p><p>&nbsp;</p> <p> Recuerde que debe elegir la opción que usted diría en esa situación. No hay respuestas correctas ni incorrectas.</div>',
            '<div class="instrucciones"><p>A continuación podrá practicar con algunos diálogos.</p><p>&nbsp;</p><p>&nbsp;</p><b>Presione "siguiente" para comenzar con la práctica.</div>'
            ],
     show_clickable_nav: true,
     button_label_next: "Siguiente",
     button_label_previous : "Volver",
     key_forward: 32
             };
//Pantalla iniciar exp.
var iniciar_exp_txt = {
  type: 'html-keyboard-response',
  stimulus: '<div class="bienvenida-serif"><p align="center" style="font-size:18px;">¡Excelente! Ahora comenzará el experimento.</p><p>&nbsp;<p><p align="center"><b>Presione la barra espaciadora para continuar.</b></p></div>',
  choices: ['space', 32],
  data: {condicion: 'Inicio', sorteo_id: sorteo_id}
};

//Pantalla descanso y fijacion
var descanso = {
  type: 'html-button-response',
  stimulus: "",
  prompt: "<div class='estim-predic'> <p align='center'>Si desea puede descansar</p><p align='center'>Presione el botón para continuar.</p></div>",
  choices: ["<p>Continuar</p>"],
  button_html: '<button class="jspsych-btn-descanso-predic">%choice%</button>'
};

var fijacion = {
  type: 'html-keyboard-response',
  stimulus: "<div class='estim-predic'><p>++++</p></div>",
  trial_duration: 1500,
  response_ends_trial: false
};



//Estímulos y pantallas importados por script. Se crean bloques

//Pantallas forma 1
/*  Condición                    | número de stim
pantalla_LOWER_BOUND                1-7
pantalla_UPPER_BOUND                8-14
pantalla_LIT                        1-6
pantalla_AHI                       6-12
pantalla_CONTROL_RESPUESTA          1-20
pantalla_CONTROL_PREGUNTA           1-20


*/
// Definir bloques por condicion

var f1_LOWER_BOUND = [];
var f1_UPPER_BOUND = [];
var f1_LIT = [];
var f1_AHI = [];
var f1_CONTROL_RESPUESTA = [];
//var f1_CONTROL_PREGUNTA = [];

// Push pantallas a bloques

f1_LOWER_BOUND.push(pantalla_LOWER_BOUND_1, pantalla_LOWER_BOUND_2, pantalla_LOWER_BOUND_3, pantalla_LOWER_BOUND_4, pantalla_LOWER_BOUND_5, pantalla_LOWER_BOUND_6, pantalla_LOWER_BOUND_7);
f1_UPPER_BOUND.push(pantalla_UPPER_BOUND_8,pantalla_UPPER_BOUND_9,pantalla_UPPER_BOUND_10,pantalla_UPPER_BOUND_11,pantalla_UPPER_BOUND_12,pantalla_UPPER_BOUND_13,pantalla_UPPER_BOUND_14);
//f1_LIT.push(pantalla_LIT_1, pantalla_LIT_2,pantalla_LIT_3,pantalla_LIT_4,pantalla_LIT_5,pantalla_LIT_6);
//f1_AHI.push(pantalla_AHI_7,pantalla_LIT_8,pantalla_LIT_9,pantalla_LIT_10,pantalla_LIT_11,pantalla_LIT_12);
f1_CONTROL_RESPUESTA.push(pantalla_CONTROL_RESPUESTA_1, pantalla_CONTROL_RESPUESTA_2,
                            pantalla_CONTROL_RESPUESTA_3 ,pantalla_CONTROL_RESPUESTA_4,
                            pantalla_CONTROL_RESPUESTA_5 ,pantalla_CONTROL_RESPUESTA_6,
                            pantalla_CONTROL_RESPUESTA_7 ,pantalla_CONTROL_RESPUESTA_8,
                            pantalla_CONTROL_RESPUESTA_9 ,pantalla_CONTROL_RESPUESTA_10,
                            pantalla_CONTROL_RESPUESTA_11,pantalla_CONTROL_RESPUESTA_12,
                            pantalla_CONTROL_RESPUESTA_13, pantalla_CONTROL_RESPUESTA_14,
                            pantalla_CONTROL_RESPUESTA_15, pantalla_CONTROL_RESPUESTA_16,
                            pantalla_CONTROL_RESPUESTA_17,pantalla_CONTROL_RESPUESTA_18,
                            pantalla_CONTROL_RESPUESTA_19,pantalla_CONTROL_RESPUESTA_20);
//f1_CONTROL_PREGUNTA.push(pantalla_CONTROL_PREGUNTA_1, pantalla_CONTROL_PREGUNTA_2,
          //                pantalla_CONTROL_PREGUNTA_3, pantalla_CONTROL_PREGUNTA_4,
            //              pantalla_CONTROL_PREGUNTA_5, pantalla_CONTROL_PREGUNTA_6,
              //            pantalla_CONTROL_PREGUNTA_7, pantalla_CONTROL_PREGUNTA_8,
                //          pantalla_CONTROL_PREGUNTA_9, pantalla_CONTROL_PREGUNTA_10,
                  //        pantalla_CONTROL_PREGUNTA_11, pantalla_CONTROL_PREGUNTA_12,
                    //      pantalla_CONTROL_PREGUNTA_13, pantalla_CONTROL_PREGUNTA_14,
                      //    pantalla_CONTROL_PREGUNTA_15, pantalla_CONTROL_PREGUNTA_16,
                        //  pantalla_CONTROL_PREGUNTA_17, pantalla_CONTROL_PREGUNTA_18,
                          //pantalla_CONTROL_PREGUNTA_19, pantalla_CONTROL_PREGUNTA_20);
//Randomizar

var f1_LOWER_BOUND_RND = jsPsych.randomization.repeat(f1_LOWER_BOUND, 1);
var f1_UPPER_BOUND_RND = jsPsych.randomization.repeat(f1_UPPER_BOUND, 1);
//var f1_LIT_RND = jsPsych.randomization.repeat(f1_LIT, 1);
//var f1_AHI_RND = jsPsych.randomization.repeat(f1_AHI, 1);
var f1_CONTROL_RESPUESTA_RND = jsPsych.randomization.repeat(f1_CONTROL_RESPUESTA, 1);
//var f1_CONTROL_PREGUNTA_RND = jsPsych.randomization.repeat(f1_CONTROL_PREGUNTA, 1);


// Crear bloques
var f1_blo1 = [];
var f1_blo2 = [];
var f1_blo3 = [];
var f1_blo4 = [];
var f1_blo5 = [];
var f1_blo6 = [];
var f1_blo7 = [];


//Push elementos a bloques
f1_blo1.push(
  //f1_CONTROL_PREGUNTA_RND[1],
  f1_LOWER_BOUND_RND[0],
  f1_CONTROL_RESPUESTA_RND[0],
  //f1_CONTROL_PREGUNTA_RND[0],
  f1_UPPER_BOUND_RND[0],
  f1_CONTROL_RESPUESTA_RND[14],
  //f1_LIT_RND[0],
  f1_CONTROL_RESPUESTA_RND[1],
  //f1_AHI_RND[0],
  f1_CONTROL_RESPUESTA_RND[17]
          );


f1_blo2.push(
  f1_CONTROL_RESPUESTA_RND[2],
  //f1_LIT_RND[1],
  //f1_CONTROL_PREGUNTA_RND[2],
  f1_UPPER_BOUND_RND[1],
  f1_CONTROL_RESPUESTA_RND[15],
  //f1_AHI_RND[1],
  f1_CONTROL_RESPUESTA_RND[3],
  //f1_CONTROL_PREGUNTA_RND[3],
  f1_LOWER_BOUND_RND[1],
  f1_CONTROL_RESPUESTA_RND[16]
           );

f1_blo3.push(
  //f1_CONTROL_PREGUNTA_RND[4],

  //f1_CONTROL_PREGUNTA_RND[5],
  //f1_LIT_RND[2],
  f1_CONTROL_RESPUESTA_RND[5],
  //f1_CONTROL_PREGUNTA_RND[19],
  f1_LOWER_BOUND_RND[2],
  f1_CONTROL_RESPUESTA_RND[18],
  //f1_AHI_RND[2],
  f1_CONTROL_RESPUESTA_RND[4],
  f1_UPPER_BOUND_RND[2]
           );

f1_blo4.push(
  f1_CONTROL_RESPUESTA_RND[7],
  //f1_LIT_RND[3],
  //f1_CONTROL_PREGUNTA_RND[6],
  f1_UPPER_BOUND_RND[3],
  //f1_CONTROL_PREGUNTA_RND[7],
  f1_LOWER_BOUND_RND[3],
  f1_CONTROL_RESPUESTA_RND[6]
  //f1_AHI_RND[3],
  //f1_CONTROL_PREGUNTA_RND[18]
);

f1_blo5.push(
  f1_CONTROL_RESPUESTA_RND[19],
  //f1_LIT_RND[4],
  f1_LOWER_BOUND_RND[4],
  //f1_CONTROL_PREGUNTA_RND[8],
  f1_CONTROL_RESPUESTA_RND[8],
  f1_UPPER_BOUND_RND[4],
  //f1_AHI_RND[4],
  f1_CONTROL_RESPUESTA_RND[9]
  //f1_CONTROL_PREGUNTA_RND[9],

  //f1_CONTROL_PREGUNTA_RND[17]
  );

f1_blo6.push(
  f1_CONTROL_RESPUESTA_RND[10],
  f1_LOWER_BOUND_RND[5],
  //f1_LIT_RND[5],
  f1_CONTROL_RESPUESTA_RND[11],
  //f1_AHI_RND[5],
  //f1_CONTROL_PREGUNTA_RND[11],
  //f1_CONTROL_PREGUNTA_RND[10],
  f1_UPPER_BOUND_RND[5]
  //f1_CONTROL_PREGUNTA_RND[16]
);

f1_blo7.push(
  //f1_CONTROL_PREGUNTA_RND[13],
  f1_CONTROL_RESPUESTA_RND[12],
  //f1_CONTROL_PREGUNTA_RND[14],
  f1_LOWER_BOUND_RND[6],
  //f1_CONTROL_PREGUNTA_RND[12],

  //f1_CONTROL_PREGUNTA_RND[15],
  f1_CONTROL_RESPUESTA_RND[13],
  f1_UPPER_BOUND_RND[6]
);

var f1_temp = [];
f1_temp.push(f1_blo1, f1_blo2, f1_blo3, f1_blo4, f1_blo5, f1_blo6, f1_blo7);
var f1_final_RND = jsPsych.randomization.repeat(f1_temp,1);

f1_temp_0 = f1_final_RND[0];
f1_temp_1 = f1_final_RND[1];
f1_temp_2 = f1_final_RND[2];
f1_temp_3 = f1_final_RND[3];
f1_temp_4 = f1_final_RND[4];
f1_temp_5 = f1_final_RND[5];
f1_temp_6 = f1_final_RND[6];


//Crear forma con bloques
// Usar object.keys porque crea diccionario y no encuentra el lenght si no.
var f1_final = [];
for (var i = 0; i < Object.keys(f1_temp_0).length; i++) {
    f1_final.push(f1_temp_0[i]);
    f1_final.push(fijacion);
}


for (var i = 0; i < Object.keys(f1_temp_1).length; i++) {
    f1_final.push(f1_temp_1[i]);
    f1_final.push(fijacion);
}

for (var i = 0; i < Object.keys(f1_temp_2).length; i++) {
    f1_final.push(f1_temp_2[i]);
    f1_final.push(fijacion);
}

for (var i = 0; i < Object.keys(f1_temp_3).length; i++) {
    f1_final.push(f1_temp_3[i]);
    f1_final.push(fijacion);
}

for (var i = 0; i < Object.keys(f1_temp_4).length; i++) {
    f1_final.push(f1_temp_4[i]);
    f1_final.push(fijacion);
}

for (var i = 0; i < Object.keys(f1_temp_5).length; i++) {
    f1_final.push(f1_temp_5[i]);
    f1_final.push(fijacion);
}

for (var i = 0; i < Object.keys(f1_temp_6).length; i++) {
    f1_final.push(f1_temp_6[i]);
    f1_final.push(fijacion);
}

// Eliminar ultimo descanso
f1_final.pop();




//Pantallas forma 2
/*  Condición                    | número de stim
pantalla_LOWER_BOUND                8-14
pantalla_UPPER_BOUND                1-7
pantalla_LIT                        6-12
pantalla_AHI                        1-6
pantalla_CONTROL_RESPUESTA          1-20
pantalla_CONTROL_PREGUNTA           1-20
*/

// Definir bloques por condicion

var f2_LOWER_BOUND = [];
var f2_UPPER_BOUND = [];
//var f2_LIT = [];
//var f2_AHI = [];
var f2_CONTROL_RESPUESTA = [];
//var f2_CONTROL_PREGUNTA = [];

// Crear bloques
f2_LOWER_BOUND.push(pantalla_LOWER_BOUND_8, pantalla_LOWER_BOUND_9, pantalla_LOWER_BOUND_10, pantalla_LOWER_BOUND_11, pantalla_LOWER_BOUND_12, pantalla_LOWER_BOUND_13, pantalla_LOWER_BOUND_14);
f2_UPPER_BOUND.push(pantalla_UPPER_BOUND_1,pantalla_UPPER_BOUND_2,pantalla_UPPER_BOUND_3,pantalla_UPPER_BOUND_4,pantalla_UPPER_BOUND_5,pantalla_UPPER_BOUND_6,pantalla_UPPER_BOUND_7);
//f2_LIT.push(pantalla_LIT_7, pantalla_LIT_8,pantalla_LIT_9,pantalla_LIT_10,pantalla_LIT_11,pantalla_LIT_12);
//f2_AHI.push(pantalla_AHI_1,pantalla_LIT_2,pantalla_LIT_3,pantalla_LIT_4,pantalla_LIT_5,pantalla_LIT_6);
f2_CONTROL_RESPUESTA.push(pantalla_CONTROL_RESPUESTA_1, pantalla_CONTROL_RESPUESTA_2,
                            pantalla_CONTROL_RESPUESTA_3 ,pantalla_CONTROL_RESPUESTA_4,
                            pantalla_CONTROL_RESPUESTA_5 ,pantalla_CONTROL_RESPUESTA_6,
                            pantalla_CONTROL_RESPUESTA_7 ,pantalla_CONTROL_RESPUESTA_8,
                            pantalla_CONTROL_RESPUESTA_9 ,pantalla_CONTROL_RESPUESTA_10,
                            pantalla_CONTROL_RESPUESTA_11,pantalla_CONTROL_RESPUESTA_12,
                            pantalla_CONTROL_RESPUESTA_13, pantalla_CONTROL_RESPUESTA_14,
                            pantalla_CONTROL_RESPUESTA_15, pantalla_CONTROL_RESPUESTA_16,
                            pantalla_CONTROL_RESPUESTA_17,pantalla_CONTROL_RESPUESTA_18,
                            pantalla_CONTROL_RESPUESTA_19,pantalla_CONTROL_RESPUESTA_20);
//f2_CONTROL_PREGUNTA.push(pantalla_CONTROL_PREGUNTA_1, pantalla_CONTROL_PREGUNTA_2,
//                          pantalla_CONTROL_PREGUNTA_3, pantalla_CONTROL_PREGUNTA_4,
//                          pantalla_CONTROL_PREGUNTA_5, pantalla_CONTROL_PREGUNTA_6,
//                          pantalla_CONTROL_PREGUNTA_7, pantalla_CONTROL_PREGUNTA_8,
//                          pantalla_CONTROL_PREGUNTA_9, pantalla_CONTROL_PREGUNTA_10,
//                          pantalla_CONTROL_PREGUNTA_11, pantalla_CONTROL_PREGUNTA_12,
//                          pantalla_CONTROL_PREGUNTA_13, pantalla_CONTROL_PREGUNTA_14,
//                          pantalla_CONTROL_PREGUNTA_15, pantalla_CONTROL_PREGUNTA_16,
//                          pantalla_CONTROL_PREGUNTA_17, pantalla_CONTROL_PREGUNTA_18,
//                          pantalla_CONTROL_PREGUNTA_19, pantalla_CONTROL_PREGUNTA_20);

//Randomizar

var f2_LOWER_BOUND_RND = jsPsych.randomization.repeat(f2_LOWER_BOUND, 1);
var f2_UPPER_BOUND_RND = jsPsych.randomization.repeat(f2_UPPER_BOUND, 1);
//var f2_LIT_RND = jsPsych.randomization.repeat(f2_LIT, 1);
//var f2_AHI_RND = jsPsych.randomization.repeat(f2_AHI, 1);
var f2_CONTROL_RESPUESTA_RND = jsPsych.randomization.repeat(f2_CONTROL_RESPUESTA, 1);
//var f2_CONTROL_PREGUNTA_RND = jsPsych.randomization.repeat(f2_CONTROL_PREGUNTA, 1);


// Crear bloques
var f2_blo1 = [];
var f2_blo2 = [];
var f2_blo3 = [];
var f2_blo4 = [];
var f2_blo5 = [];
var f2_blo6 = [];
var f2_blo7 = [];


//Push elementos a bloques
f2_blo1.push(
  // f2_CONTROL_PREGUNTA_RND[1],
  f2_CONTROL_RESPUESTA_RND[0],
  f2_LOWER_BOUND_RND[0],
  // f2_CONTROL_PREGUNTA_RND[0],
  f2_UPPER_BOUND_RND[0],
  f2_CONTROL_RESPUESTA_RND[14],
  //f2_LIT_RND[0],
  f2_CONTROL_RESPUESTA_RND[1],
  //f2_AHI_RND[0],
  f2_CONTROL_RESPUESTA_RND[17]
          );


f2_blo2.push(
  f2_CONTROL_RESPUESTA_RND[2],
  //f2_LIT_RND[1],
  // f2_CONTROL_PREGUNTA_RND[2],
  f2_UPPER_BOUND_RND[1],
  f2_CONTROL_RESPUESTA_RND[15],
  //f2_AHI_RND[1],
  f2_CONTROL_RESPUESTA_RND[3],
  // f2_CONTROL_PREGUNTA_RND[3],
  f2_LOWER_BOUND_RND[1],
  f2_CONTROL_RESPUESTA_RND[16]
           );

f2_blo3.push(
  // f2_CONTROL_PREGUNTA_RND[4],
  // f2_CONTROL_PREGUNTA_RND[5],
  //f2_LIT_RND[2],
  f2_CONTROL_RESPUESTA_RND[5],
  // f2_CONTROL_PREGUNTA_RND[19],
  f2_LOWER_BOUND_RND[2],
  f2_CONTROL_RESPUESTA_RND[18],
  f2_UPPER_BOUND_RND[2],
  //f2_AHI_RND[2],
  f2_CONTROL_RESPUESTA_RND[4]
           );

f2_blo4.push(
  f2_CONTROL_RESPUESTA_RND[7],
  //f2_LIT_RND[3],
  // f2_CONTROL_PREGUNTA_RND[6],
  f2_UPPER_BOUND_RND[3],
  // f2_CONTROL_PREGUNTA_RND[7],

  f2_CONTROL_RESPUESTA_RND[6],
  f2_LOWER_BOUND_RND[3]
  //f2_AHI_RND[3],
  // f2_CONTROL_PREGUNTA_RND[18]
);

f2_blo5.push(
  f2_CONTROL_RESPUESTA_RND[19],
  //f2_LIT_RND[4],
  // f2_CONTROL_PREGUNTA_RND[8],
  f2_CONTROL_RESPUESTA_RND[8],
  f2_UPPER_BOUND_RND[4],
  //f2_AHI_RND[4],
  f2_CONTROL_RESPUESTA_RND[9],
  // f2_CONTROL_PREGUNTA_RND[9],
  f2_LOWER_BOUND_RND[4]
  // f2_CONTROL_PREGUNTA_RND[17]
  );

f2_blo6.push(
  f2_CONTROL_RESPUESTA_RND[10],
  f2_UPPER_BOUND_RND[5],
  //f2_LIT_RND[5],
  f2_CONTROL_RESPUESTA_RND[11],
  //f2_AHI_RND[5],
  // f2_CONTROL_PREGUNTA_RND[11],
  f2_LOWER_BOUND_RND[5]
  // f2_CONTROL_PREGUNTA_RND[10],

  // f2_CONTROL_PREGUNTA_RND[16]
);

f2_blo7.push(
  // f2_CONTROL_PREGUNTA_RND[13],
  f2_CONTROL_RESPUESTA_RND[12],
  // f2_CONTROL_PREGUNTA_RND[14],
  f2_LOWER_BOUND_RND[6],
  // f2_CONTROL_PREGUNTA_RND[12],
  // f2_CONTROL_PREGUNTA_RND[15],
  f2_CONTROL_RESPUESTA_RND[13],
  f2_UPPER_BOUND_RND[6]
);


var f2_temp = [];
f2_temp.push(f2_blo1, f2_blo2, f2_blo3, f2_blo4, f2_blo5, f2_blo6, f2_blo7);
var f2_final_RND = jsPsych.randomization.repeat(f2_temp,1);

f2_temp_0 = f2_final_RND[0];
f2_temp_1 = f2_final_RND[1];
f2_temp_2 = f2_final_RND[2];
f2_temp_3 = f2_final_RND[3];
f2_temp_4 = f2_final_RND[4];
f2_temp_5 = f2_final_RND[5];
f2_temp_6 = f2_final_RND[6];


//Crear forma con bloques
// Usar object.keys porque crea diccionario y no encuentra el lenght si no.
var f2_final = [];
for (var i = 0; i < Object.keys(f2_temp_0).length; i++) {
    f2_final.push(f2_temp_0[i]);
    f2_final.push(fijacion);
}
for (var i = 0; i < Object.keys(f2_temp_1).length; i++) {
    f2_final.push(f2_temp_1[i]);
    f2_final.push(fijacion);
}
for (var i = 0; i < Object.keys(f2_temp_2).length; i++) {
    f2_final.push(f2_temp_2[i]);
    f2_final.push(fijacion);
}
for (var i = 0; i < Object.keys(f2_temp_3).length; i++) {
    f2_final.push(f2_temp_3[i]);
    f2_final.push(fijacion);
}
for (var i = 0; i < Object.keys(f2_temp_4).length; i++) {
    f2_final.push(f2_temp_4[i]);
    f2_final.push(fijacion);
}
for (var i = 0; i < Object.keys(f2_temp_5).length; i++) {
    f2_final.push(f2_temp_5[i]);
    f2_final.push(fijacion);
}
for (var i = 0; i < Object.keys(f2_temp_6).length; i++) {
    f2_final.push(f2_temp_6[i]);
    f2_final.push(fijacion);
}

// Eliminar ultimo descanso
f2_final.pop();


// Crear save data
//Crear nombre de archivo

var archivo = "lor_pred_f_" + formasRndmAssign + "_s_" + subject_id;

//Función save data
function saveData(filename, filedata){
   $.ajax({
      type:'post',
      cache: false,
      url: 'save_data.php', // Esta es la ruta al PHP script. Cambiar si es necesario.
      data: {filename: filename, filedata: filedata}
   });}


//Función guardar
var savingdata = {
    type: 'call-function',
    func: function(){ saveData(archivo + "_" + sex + ".csv", jsPsych.data.get().csv());
                    }};

//Funcion guardar local
var savingdata_local = {
    type: 'call-function',
    func: function(){ jsPsych.data.get().localSave('csv',archivo + "_" + sex + ".csv");
                    }};

//Crear final
var final = {
  type: 'html-keyboard-response',
  stimulus: '<div class="bienvenida-serif"><p align="center">¡Gracias por participar!</p> <p align="center">Su código para el sorteo es:<p><b>'+ sorteo_id +'</b></p><p align="center">Anote el código para participar del sorteo.<br>Si tiene alguna pregunta o desea participar de más actividades como esta, puede escribir a <a href="mailto:loredo.rod@gmail.com" target="_blank">loredo.rod@gmail.com</a> <p>&nbsp;<p><p align="center"><b>Cierre la pestaña o el navegador para terminar.</b></p></div>',
  data: {condicion: 'final'},
  choices: jsPsych.NO_KEYS,
  };


// Crear línea de tiempo
timeline.push(bienvenida);

//timeline.push(guardar_ultimo);

//consentimiento
timeline.push(consentimiento);

//demograficos
timeline.push(demograficos_1, demograficos_2, demograficos_3, demograficos_4);

//Instrucciones

timeline.push(instrucciones);

//práctica
timeline.push(fijacion, pantalla_CONTROL_RESPUESTA_3, fijacion, pantalla_CONTROL_RESPUESTA_9, fijacion, pantalla_CONTROL_RESPUESTA_4, fijacion, pantalla_CONTROL_RESPUESTA_14);
timeline.push(descanso);
timeline.push(iniciar_exp_txt);


//Llamado condicional
timeline.push(fijacion);
if (formasRndmAssign == 1) {
  for (var i = 0; i < f1_final.length; i++) {
    timeline.push(f1_final[i]);
    if (i != 0 && i%8 == 0) {
      timeline.push(descanso);
    }
  }
}

if (formasRndmAssign == 2) {
  for (var i = 0; i < f2_final.length; i++) {
    timeline.push(f2_final[i]);
    if (i != 0 && i%8 == 0) {
      timeline.push(descanso);
    }
  }
}

timeline.push(savingdata);

//Final
timeline.push(final);

// Iniciar experimento
jsPsych.init({
  show_progress_bar: true,
  timeline: timeline,
  on_finish: function(){
// jsPsych.data.displayData();
  }

});
