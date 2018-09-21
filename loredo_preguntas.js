// Definir variables y funciones a utilizar

var timeline = [];
var correct = false;
var images = ['dedos.png'];
// Generar id de sujeto
var subject_id = jsPsych.randomization.randomID(8);
var sorteo_id = jsPsych.randomization.randomID(12);

// Generar valor de forma
/* if(ultimo_trial == 1){
  var formas = [2];
} else if (ultimo_trial == 2) {
  var formas = [3];
} else if (ultimo_trial == 3) {
  var formas = [4];
} else if (ultimo_trial == 4) {
var formas = [1];
} else{
var formas = [1, 2, 3, 4];
} */

var formas = [1, 2, 3, 4];


var formasRndm = jsPsych.randomization.repeat(formas, 1);
var formasRndmAssign = formasRndm[0];
//var contar_accesos = contar_accesos + 1;
//var trial = "var ultimo_trial = " + formasRndmAssign + ";";
//var count = "var contar_accesos =" + contar_accesos + ";";

//var datos_guardar = [trial, count];

//Variable sexo para save_data
var sex = "";

// Crear bienvenida. Agrega on_finish a todos los trial el subject_id
var bienvenida = {
  type: 'html-keyboard-response',
  stimulus: '<div class="bienvenida"><p>Bienvenidos a la actividad.<br> En la próxima página encontrará el consentimiento y las instrucciones.</p><p>Esta actividad solo puede realizarse en computadoras (NO tablet ni celulares).<p>&nbsp;<p><p><b>Presione cualquier tecla para continuar.</b></p></div>',
  data: {bienvenida: 'bienvenida'} ,
  on_finish: jsPsych.data.addProperties({sujeto: subject_id, forma: formasRndmAssign})
};


// Crear Consentimiento
var consentimiento= {
    type: 'instructions',
    pages: [
      '<div class="small" ><p align="justify"> Esta investigación tiene como objetivo investigar la comprensión del lenguaje en adultos <b>hablantes nativos de español</b>. Si decide hacer esta actividad, primero se le solicitará información sobre su edad, sexo y nivel educativo. Luego tendrá que leer diálogos y respoder preguntas. La actividad puede completarse en un periodo de <b>10 a 15 minutos.</b></p> <p align="justify"> Su participación en <b>esta actividad es voluntaria</b> y puede abandonarla en cualquier momento que lo desee. Simplemente puede cerrar el programa que está utilizando para navegar por internet. Esta actividad no supone ningún riesgo asociado a su participación y toda la información que brinde no será compartida con nadie. Será tratada de manera <b>confidencial y anónima</b>. El programa no registra ningún tipo de dato que pueda individualizar al participante.</p> <p align="justify"> Si desea recibir más información puede escribirle a Rodrigo Loredo (Instituto de Lingüística, FFyL, UBA | CONICET), investigador responsable de esta actividad al correo <a href="mailto:loredo.rod@gmail.com" target="_blank">loredo.rod@gmail.com</a></p><p>&nbsp;</p> <p align="left"><b>Consentimiento</b></p><p align="justify"><b> Haciendo click en <i>aceptar</i> acepto participar de manera completamente voluntaria en esta actividad, entendiendo tanto el objetivo de la investigación como la descripción de las tareas a realizar. Asimismo, certifico que soy mayor de 18 años y que comprendo que tengo la libertad de abandonar la actividad en cualquier momento que lo desee.</b></p></div>',
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
           })}};

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
           })}};

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
           })}};

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
            '<div class="instrucciones"><p style="font-size:30px;"><b>Información importante</b></p> <p>Entre los participantes de la actividad se realizará un sorteo de dos órdenes de compra por $500. Para participar del sorteo, anote este código: </p><p style="font-size:30px;"><b>'+ sorteo_id +'</b></p><p>Si no completa la actividad, no será considerado para el sorteo.</p><p><b>Presione "siguiente" o la barra espaciadora para continuar</b></div>',
            '<div class="instrucciones"><p>En esta actividad usted va a leer diferentes diálogos.</p> <p>Luego de leer el diálogo tendrá que responder una pregunta de verdadero o falso.<br>Para reponder tiene que presionar la tecla <b>F</b> si la afirmación es falsa y <b>J</b> si es verdadera.</p><p> Para leer tendrá un tiempo limitado, pero para responder no tendrá límite de tiempo.</p> <p>En el medio del experimento habrá pantallas donde puede descansar. </div>',
            '<div class="instrucciones"><p>Tenga en cuenta que el texto no aparecerá completo.</p><p>Primero verá unas <span style="color:red;">XXXX</span> que indican dónde aparecerá el texto.  <br> Luego de unos segundos aparecerán unas <span style="color:green;">++++</span>. <p>En ese momento, presione la barra espaciadora para comenzar a leer.<br>Para avanzar al siguiente fragmento, presione la barra espaciadora.</p><p> Cuando termine de leer el último fragmento, presione la barra para pasar a la pregunta.</div>',
            '<div class="instrucciones"><p>Para responder tiene que presionar la tecla <b>F</b> si la afirmación es falsa y <b>J</b> si es verdadera.</p><p>Utilice las dos manos de esta manera: <p> <img src="dedos.png" width="50%"></p><p>Los pulgares en la barra espaciadora y los dedos índices en las teclas F y J.</p></div>',
            '<div class="instrucciones"><p>Algunas preguntas pueden tener más de una respuesta dependiendo de cómo interprete el diálogo.<br>Responda según lo que usted crea que es correcto.</p><p>A continuación podrá practicar con algunos diálogos.</p><p>&nbsp;</p><p>&nbsp;</p><b>Presione "siguiente" o la barra espaciadora para comenzar con la práctica.</div>'
            ],
     show_clickable_nav: true,
     button_label_next: "Siguiente",
     button_label_previous : "Volver",
     key_forward: 32
             };
//Pantalla iniciar exp.
var iniciar_exp_txt = {
  type: 'html-keyboard-response',
  stimulus: '<p align="center"><p align="center" style="font-size:18px">¡Excelente! Ahora comenzará el experimento.</p><p>&nbsp;<p><p align="center"><b>Presione la barra espaciadora para continuar.</b></p>',
  choices: ['space', 32],
  data: {condicion: 'Inicio', sorteo_id: sorteo_id}
};

//Pantalla descanso
var descanso = {
  type: 'html-keyboard-response',
  stimulus: '<p align="center"><p align="center" style="font-size:18px">Si lo desea, puede descansar.</p><p>&nbsp;<p><p align="center"><b>Presione la barra espaciadora para continuar.</b></p>',
  choices: ['space', 32]
};

//Estímulos y pantallas importados por script. Se crean bloques

//Bloque practica. pan_PRACTICA_1 a 4


//Pantallas forma 1
/*  Condición                    | número de stim
    PARTICULARIZADA_ALGUNOS         1-3
    PARTICULARIZADA_TODOS           10-12
    GENERALIZADA_ALGUNOS            7-9
    NEUTRA_ALGUNOS                  4-6
    RELLENO_CONPARTICULARIZADA      1-6
    RELLENO_SINPARTICULARIZADA      7-12
    RELLENO_OTROSCUANT              1-12
*/
// Definir bloques por condicion
var f1_PARTICULARIZADA_ALGUNOS = [];
var f1_PARTICULARIZADA_TODOS = [];
var f1_GENERALIZADA_ALGUNOS = [];
var f1_NEUTRA_ALGUNOS = [];
var f1_RELLENO_CONPARTICULARIZADA = [];
var f1_RELLENO_SINPARTICULARIZADA = [];
var f1_RELLENO_OTROSCUANT = [];


// Push pantallas a bloques

f1_PARTICULARIZADA_ALGUNOS.push(pan_PARTICULARIZADA_ALGUNOS_1, pan_PARTICULARIZADA_ALGUNOS_2, pan_PARTICULARIZADA_ALGUNOS_3);
f1_PARTICULARIZADA_TODOS.push(pan_PARTICULARIZADA_TODOS_10, pan_PARTICULARIZADA_TODOS_11, pan_PARTICULARIZADA_TODOS_12);
f1_GENERALIZADA_ALGUNOS.push(pan_GENERALIZADA_ALGUNOS_7, pan_GENERALIZADA_ALGUNOS_8, pan_GENERALIZADA_ALGUNOS_9);
f1_NEUTRA_ALGUNOS.push(pan_NEUTRA_ALGUNOS_4, pan_NEUTRA_ALGUNOS_5, pan_NEUTRA_ALGUNOS_6);
f1_RELLENO_CONPARTICULARIZADA.push(pan_RELLENO_CONPARTICULARIZADA_1, pan_RELLENO_CONPARTICULARIZADA_2, pan_RELLENO_CONPARTICULARIZADA_3, pan_RELLENO_CONPARTICULARIZADA_4, pan_RELLENO_CONPARTICULARIZADA_5, pan_RELLENO_CONPARTICULARIZADA_6);
f1_RELLENO_SINPARTICULARIZADA.push(pan_RELLENO_SINPARTICULARIZADA_7, pan_RELLENO_SINPARTICULARIZADA_8, pan_RELLENO_SINPARTICULARIZADA_9, pan_RELLENO_SINPARTICULARIZADA_10, pan_RELLENO_SINPARTICULARIZADA_11, pan_RELLENO_SINPARTICULARIZADA_12);
f1_RELLENO_OTROSCUANT.push(pan_RELLENO_OTROSCUANT_1, pan_RELLENO_OTROSCUANT_2, pan_RELLENO_OTROSCUANT_3, pan_RELLENO_OTROSCUANT_4, pan_RELLENO_OTROSCUANT_5, pan_RELLENO_OTROSCUANT_6, pan_RELLENO_OTROSCUANT_7, pan_RELLENO_OTROSCUANT_8, pan_RELLENO_OTROSCUANT_9, pan_RELLENO_OTROSCUANT_10, pan_RELLENO_OTROSCUANT_11, pan_RELLENO_OTROSCUANT_12);


//Randomizar
var f1_PARTICULARIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f1_PARTICULARIZADA_ALGUNOS, 1);
var f1_PARTICULARIZADA_TODOS_rndm = jsPsych.randomization.repeat(f1_PARTICULARIZADA_TODOS, 1);
var f1_GENERALIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f1_GENERALIZADA_ALGUNOS, 1);
var f1_NEUTRA_ALGUNOS_rndm = jsPsych.randomization.repeat(f1_NEUTRA_ALGUNOS, 1);
var f1_RELLENO_CONPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f1_RELLENO_CONPARTICULARIZADA , 1);
var f1_RELLENO_SINPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f1_RELLENO_SINPARTICULARIZADA , 1);
var f1_RELLENO_OTROSCUANT_rndm = jsPsych.randomization.repeat(f1_RELLENO_OTROSCUANT, 1);

// Crear bloques
var f1_blo1 = [];
var f1_blo2 = [];
var f1_blo3 = [];

//Push elementos a bloques
f1_blo1.push(f1_PARTICULARIZADA_ALGUNOS_rndm[0],
             f1_PARTICULARIZADA_TODOS_rndm[0],
             f1_GENERALIZADA_ALGUNOS_rndm[0],
             f1_NEUTRA_ALGUNOS_rndm[0],
             f1_RELLENO_CONPARTICULARIZADA_rndm[0], f1_RELLENO_CONPARTICULARIZADA_rndm[1],
             f1_RELLENO_SINPARTICULARIZADA_rndm[0], f1_RELLENO_SINPARTICULARIZADA_rndm[1],
             f1_RELLENO_OTROSCUANT_rndm[0], f1_RELLENO_OTROSCUANT_rndm[1],f1_RELLENO_OTROSCUANT_rndm[2],f1_RELLENO_OTROSCUANT_rndm[3]
           );


f1_blo2.push(f1_PARTICULARIZADA_ALGUNOS_rndm[1],
             f1_PARTICULARIZADA_TODOS_rndm[1],
             f1_GENERALIZADA_ALGUNOS_rndm[1],
             f1_NEUTRA_ALGUNOS_rndm[1],
             f1_RELLENO_CONPARTICULARIZADA_rndm[2], f1_RELLENO_CONPARTICULARIZADA_rndm[3],
             f1_RELLENO_SINPARTICULARIZADA_rndm[2], f1_RELLENO_SINPARTICULARIZADA_rndm[3],
             f1_RELLENO_OTROSCUANT_rndm[4], f1_RELLENO_OTROSCUANT_rndm[5],f1_RELLENO_OTROSCUANT_rndm[6],f1_RELLENO_OTROSCUANT_rndm[7]
           );

f1_blo3.push(f1_PARTICULARIZADA_ALGUNOS_rndm[2],
             f1_PARTICULARIZADA_TODOS_rndm[2],
             f1_GENERALIZADA_ALGUNOS_rndm[2],
             f1_NEUTRA_ALGUNOS_rndm[2],
             f1_RELLENO_CONPARTICULARIZADA_rndm[4], f1_RELLENO_CONPARTICULARIZADA_rndm[5],
             f1_RELLENO_SINPARTICULARIZADA_rndm[4], f1_RELLENO_SINPARTICULARIZADA_rndm[5],
             f1_RELLENO_OTROSCUANT_rndm[8], f1_RELLENO_OTROSCUANT_rndm[9],f1_RELLENO_OTROSCUANT_rndm[10],f1_RELLENO_OTROSCUANT_rndm[11]
           );

//Randomizar
var f1_blo1_rndm = jsPsych.randomization.repeat(f1_blo1, 1);
var f1_blo2_rndm = jsPsych.randomization.repeat(f1_blo2, 1);
var f1_blo3_rndm = jsPsych.randomization.repeat(f1_blo3, 1);

//Crear forma con bloques
var f1_final = [];

for (var i = 0; i < f1_blo1_rndm.length; i++) {
  f1_final.push(f1_blo1_rndm[i]);
}

f1_final.push(descanso);

for (var i = 0; i < f1_blo2_rndm.length; i++) {
  f1_final.push(f1_blo2_rndm[i]);
}
f1_final.push(descanso);

for (var i = 0; i < f1_blo3_rndm.length; i++) {
  f1_final.push(f1_blo3_rndm[i]);
}




//Pantallas forma 2
/*  Condición                    | número de stim     | cantidad por bloque
    PARTICULARIZADA_ALGUNOS         4-6                       1
    PARTICULARIZADA_TODOS           1-3                       1
    GENERALIZADA_ALGUNOS            10-12                     1
    NEUTRA_ALGUNOS                  7-9                       1
    RELLENO_CONPARTICULARIZADA      1-6                       2
    RELLENO_SINPARTICULARIZADA      7-12                      2
    RELLENO_OTROSCUANT              1-12                      4
*/

var f2_PARTICULARIZADA_ALGUNOS = [];
var f2_PARTICULARIZADA_TODOS = [];
var f2_GENERALIZADA_ALGUNOS = [];
var f2_NEUTRA_ALGUNOS = [];
var f2_RELLENO_CONPARTICULARIZADA = [];
var f2_RELLENO_SINPARTICULARIZADA = [];
var f2_RELLENO_OTROSCUANT = [];

// Push pantallas a bloques

f2_PARTICULARIZADA_ALGUNOS.push(pan_PARTICULARIZADA_ALGUNOS_4, pan_PARTICULARIZADA_ALGUNOS_5, pan_PARTICULARIZADA_ALGUNOS_6);
f2_PARTICULARIZADA_TODOS.push(pan_PARTICULARIZADA_TODOS_1, pan_PARTICULARIZADA_TODOS_2, pan_PARTICULARIZADA_TODOS_3);
f2_GENERALIZADA_ALGUNOS.push(pan_GENERALIZADA_ALGUNOS_10, pan_GENERALIZADA_ALGUNOS_11, pan_GENERALIZADA_ALGUNOS_12);
f2_NEUTRA_ALGUNOS.push(pan_NEUTRA_ALGUNOS_7, pan_NEUTRA_ALGUNOS_8, pan_NEUTRA_ALGUNOS_9);
f2_RELLENO_CONPARTICULARIZADA.push(pan_RELLENO_CONPARTICULARIZADA_1, pan_RELLENO_CONPARTICULARIZADA_2, pan_RELLENO_CONPARTICULARIZADA_3, pan_RELLENO_CONPARTICULARIZADA_4, pan_RELLENO_CONPARTICULARIZADA_5, pan_RELLENO_CONPARTICULARIZADA_6);
f2_RELLENO_SINPARTICULARIZADA.push(pan_RELLENO_SINPARTICULARIZADA_7, pan_RELLENO_SINPARTICULARIZADA_8, pan_RELLENO_SINPARTICULARIZADA_9, pan_RELLENO_SINPARTICULARIZADA_10, pan_RELLENO_SINPARTICULARIZADA_11, pan_RELLENO_SINPARTICULARIZADA_12);
f2_RELLENO_OTROSCUANT.push(pan_RELLENO_OTROSCUANT_1, pan_RELLENO_OTROSCUANT_2, pan_RELLENO_OTROSCUANT_3, pan_RELLENO_OTROSCUANT_4, pan_RELLENO_OTROSCUANT_5, pan_RELLENO_OTROSCUANT_6, pan_RELLENO_OTROSCUANT_7, pan_RELLENO_OTROSCUANT_8, pan_RELLENO_OTROSCUANT_9, pan_RELLENO_OTROSCUANT_10, pan_RELLENO_OTROSCUANT_11, pan_RELLENO_OTROSCUANT_12);


//Randomizar
var f2_PARTICULARIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f2_PARTICULARIZADA_ALGUNOS, 1);
var f2_PARTICULARIZADA_TODOS_rndm = jsPsych.randomization.repeat(f2_PARTICULARIZADA_TODOS, 1);
var f2_GENERALIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f2_GENERALIZADA_ALGUNOS, 1);
var f2_NEUTRA_ALGUNOS_rndm = jsPsych.randomization.repeat(f2_NEUTRA_ALGUNOS, 1);
var f2_RELLENO_CONPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f2_RELLENO_CONPARTICULARIZADA , 1);
var f2_RELLENO_SINPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f2_RELLENO_SINPARTICULARIZADA , 1);
var f2_RELLENO_OTROSCUANT_rndm = jsPsych.randomization.repeat(f2_RELLENO_OTROSCUANT, 1);

// Crear bloques
var f2_blo1 = [];
var f2_blo2 = [];
var f2_blo3 = [];

//Push elementos a bloques
f2_blo1.push(f2_PARTICULARIZADA_ALGUNOS_rndm[0],
             f2_PARTICULARIZADA_TODOS_rndm[0],
             f2_GENERALIZADA_ALGUNOS_rndm[0],
             f2_NEUTRA_ALGUNOS_rndm[0],
             f2_RELLENO_CONPARTICULARIZADA_rndm[0], f2_RELLENO_CONPARTICULARIZADA_rndm[1],
             f2_RELLENO_SINPARTICULARIZADA_rndm[0], f2_RELLENO_SINPARTICULARIZADA_rndm[1],
             f2_RELLENO_OTROSCUANT_rndm[0], f2_RELLENO_OTROSCUANT_rndm[1],f2_RELLENO_OTROSCUANT_rndm[2],f2_RELLENO_OTROSCUANT_rndm[3]
           );


f2_blo2.push(f2_PARTICULARIZADA_ALGUNOS_rndm[1],
             f2_PARTICULARIZADA_TODOS_rndm[1],
             f2_GENERALIZADA_ALGUNOS_rndm[1],
             f2_NEUTRA_ALGUNOS_rndm[1],
             f2_RELLENO_CONPARTICULARIZADA_rndm[2], f2_RELLENO_CONPARTICULARIZADA_rndm[3],
             f2_RELLENO_SINPARTICULARIZADA_rndm[2], f2_RELLENO_SINPARTICULARIZADA_rndm[3],
             f2_RELLENO_OTROSCUANT_rndm[4], f2_RELLENO_OTROSCUANT_rndm[5],f2_RELLENO_OTROSCUANT_rndm[6],f2_RELLENO_OTROSCUANT_rndm[7]
           );
f2_blo3.push(f2_PARTICULARIZADA_ALGUNOS_rndm[2],
             f2_PARTICULARIZADA_TODOS_rndm[2],
             f2_GENERALIZADA_ALGUNOS_rndm[2],
             f2_NEUTRA_ALGUNOS_rndm[2],
             f2_RELLENO_CONPARTICULARIZADA_rndm[4], f2_RELLENO_CONPARTICULARIZADA_rndm[5],
             f2_RELLENO_SINPARTICULARIZADA_rndm[4], f2_RELLENO_SINPARTICULARIZADA_rndm[5],
             f2_RELLENO_OTROSCUANT_rndm[8], f2_RELLENO_OTROSCUANT_rndm[9],f2_RELLENO_OTROSCUANT_rndm[10],f2_RELLENO_OTROSCUANT_rndm[11]
           );
//Randomizar
var f2_blo1_rndm = jsPsych.randomization.repeat(f2_blo1, 1);
var f2_blo2_rndm = jsPsych.randomization.repeat(f2_blo2, 1);
var f2_blo3_rndm = jsPsych.randomization.repeat(f2_blo3, 1);

//Crear forma con bloques
var f2_final = [];

for (var i = 0; i < f2_blo1_rndm.length; i++) {
  f2_final.push(f2_blo1_rndm[i]);
}

f2_final.push(descanso);

for (var i = 0; i < f2_blo2_rndm.length; i++) {
  f2_final.push(f2_blo2_rndm[i]);
}

f2_final.push(descanso);

for (var i = 0; i < f2_blo3_rndm.length; i++) {
  f2_final.push(f2_blo3_rndm[i]);
}


//Pantallas forma 3
/*  Condición                    | número de stim
    PARTICULARIZADA_ALGUNOS         7-9
    PARTICULARIZADA_TODOS           4-6
    GENERALIZADA_ALGUNOS            1-3
    NEUTRA_ALGUNOS                  10-12
    RELLENO_CONPARTICULARIZADA      7-12
    RELLENO_SINPARTICULARIZADA      1-6
    RELLENO_OTROSCUANT              1-12

*/

var f3_PARTICULARIZADA_ALGUNOS = [];
var f3_PARTICULARIZADA_TODOS = [];
var f3_GENERALIZADA_ALGUNOS = [];
var f3_NEUTRA_ALGUNOS = [];
var f3_RELLENO_CONPARTICULARIZADA = [];
var f3_RELLENO_SINPARTICULARIZADA = [];
var f3_RELLENO_OTROSCUANT = [];


// Push pantallas a bloques

f3_PARTICULARIZADA_ALGUNOS.push(pan_PARTICULARIZADA_ALGUNOS_7, pan_PARTICULARIZADA_ALGUNOS_8, pan_PARTICULARIZADA_ALGUNOS_9);
f3_PARTICULARIZADA_TODOS.push(pan_PARTICULARIZADA_TODOS_4, pan_PARTICULARIZADA_TODOS_5, pan_PARTICULARIZADA_TODOS_6);
f3_GENERALIZADA_ALGUNOS.push(pan_GENERALIZADA_ALGUNOS_1, pan_GENERALIZADA_ALGUNOS_2, pan_GENERALIZADA_ALGUNOS_3);
f3_NEUTRA_ALGUNOS.push(pan_NEUTRA_ALGUNOS_10, pan_NEUTRA_ALGUNOS_11, pan_NEUTRA_ALGUNOS_12);
f3_RELLENO_CONPARTICULARIZADA.push(pan_RELLENO_CONPARTICULARIZADA_7, pan_RELLENO_CONPARTICULARIZADA_8, pan_RELLENO_CONPARTICULARIZADA_9, pan_RELLENO_CONPARTICULARIZADA_10, pan_RELLENO_CONPARTICULARIZADA_11, pan_RELLENO_CONPARTICULARIZADA_12);
f3_RELLENO_SINPARTICULARIZADA.push(pan_RELLENO_SINPARTICULARIZADA_1, pan_RELLENO_SINPARTICULARIZADA_2, pan_RELLENO_SINPARTICULARIZADA_3, pan_RELLENO_SINPARTICULARIZADA_4, pan_RELLENO_SINPARTICULARIZADA_5, pan_RELLENO_SINPARTICULARIZADA_6);
f3_RELLENO_OTROSCUANT.push(pan_RELLENO_OTROSCUANT_1, pan_RELLENO_OTROSCUANT_2, pan_RELLENO_OTROSCUANT_3, pan_RELLENO_OTROSCUANT_4, pan_RELLENO_OTROSCUANT_5, pan_RELLENO_OTROSCUANT_6, pan_RELLENO_OTROSCUANT_7, pan_RELLENO_OTROSCUANT_8, pan_RELLENO_OTROSCUANT_9, pan_RELLENO_OTROSCUANT_10, pan_RELLENO_OTROSCUANT_11, pan_RELLENO_OTROSCUANT_12);


//Randomizar
var f3_PARTICULARIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f3_PARTICULARIZADA_ALGUNOS, 1);
var f3_PARTICULARIZADA_TODOS_rndm = jsPsych.randomization.repeat(f3_PARTICULARIZADA_TODOS, 1);
var f3_GENERALIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f3_GENERALIZADA_ALGUNOS, 1);
var f3_NEUTRA_ALGUNOS_rndm = jsPsych.randomization.repeat(f3_NEUTRA_ALGUNOS, 1);
var f3_RELLENO_CONPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f3_RELLENO_CONPARTICULARIZADA , 1);
var f3_RELLENO_SINPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f3_RELLENO_SINPARTICULARIZADA , 1);
var f3_RELLENO_OTROSCUANT_rndm = jsPsych.randomization.repeat(f3_RELLENO_OTROSCUANT, 1);

// Crear bloques
var f3_blo1 = [];
var f3_blo2 = [];
var f3_blo3 = [];

//Push elementos a bloques
f3_blo1.push(f3_PARTICULARIZADA_ALGUNOS_rndm[0],
             f3_PARTICULARIZADA_TODOS_rndm[0],
             f3_GENERALIZADA_ALGUNOS_rndm[0],
             f3_NEUTRA_ALGUNOS_rndm[0],
             f3_RELLENO_CONPARTICULARIZADA_rndm[0], f3_RELLENO_CONPARTICULARIZADA_rndm[1],
             f3_RELLENO_SINPARTICULARIZADA_rndm[0], f3_RELLENO_SINPARTICULARIZADA_rndm[1],
             f3_RELLENO_OTROSCUANT_rndm[0], f3_RELLENO_OTROSCUANT_rndm[1],f3_RELLENO_OTROSCUANT_rndm[2],f3_RELLENO_OTROSCUANT_rndm[3]
           );


f3_blo2.push(f3_PARTICULARIZADA_ALGUNOS_rndm[1],
             f3_PARTICULARIZADA_TODOS_rndm[1],
             f3_GENERALIZADA_ALGUNOS_rndm[1],
             f3_NEUTRA_ALGUNOS_rndm[1],
             f3_RELLENO_CONPARTICULARIZADA_rndm[2], f3_RELLENO_CONPARTICULARIZADA_rndm[3],
             f3_RELLENO_SINPARTICULARIZADA_rndm[2], f3_RELLENO_SINPARTICULARIZADA_rndm[3],
             f3_RELLENO_OTROSCUANT_rndm[4], f3_RELLENO_OTROSCUANT_rndm[5],f3_RELLENO_OTROSCUANT_rndm[6],f3_RELLENO_OTROSCUANT_rndm[7]
           );

f3_blo3.push(f3_PARTICULARIZADA_ALGUNOS_rndm[2],
             f3_PARTICULARIZADA_TODOS_rndm[2],
             f3_GENERALIZADA_ALGUNOS_rndm[2],
             f3_NEUTRA_ALGUNOS_rndm[2],
             f3_RELLENO_CONPARTICULARIZADA_rndm[4], f3_RELLENO_CONPARTICULARIZADA_rndm[5],
             f3_RELLENO_SINPARTICULARIZADA_rndm[4], f3_RELLENO_SINPARTICULARIZADA_rndm[5],
             f3_RELLENO_OTROSCUANT_rndm[8], f3_RELLENO_OTROSCUANT_rndm[9],f3_RELLENO_OTROSCUANT_rndm[10],f3_RELLENO_OTROSCUANT_rndm[11]
           );

//Randomizar
var f3_blo1_rndm = jsPsych.randomization.repeat(f3_blo1, 1);
var f3_blo2_rndm = jsPsych.randomization.repeat(f3_blo2, 1);
var f3_blo3_rndm = jsPsych.randomization.repeat(f3_blo3, 1);

//Crear forma con bloques
var f3_final = [];

for (var i = 0; i < f3_blo1_rndm.length; i++) {
  f3_final.push(f3_blo1_rndm[i]);
}

f3_final.push(descanso);

for (var i = 0; i < f3_blo2_rndm.length; i++) {
  f3_final.push(f3_blo2_rndm[i]);
}

f3_final.push(descanso);

for (var i = 0; i < f3_blo3_rndm.length; i++) {
  f3_final.push(f3_blo3_rndm[i]);
}




//Pantallas forma 4
/*  Condición                    | número de stim
    PARTICULARIZADA_ALGUNOS         10-12
    PARTICULARIZADA_TODOS           7-9
    GENERALIZADA_ALGUNOS            4-6
    NEUTRA_ALGUNOS                  1-3
    RELLENO_CONPARTICULARIZADA      7-12
    RELLENO_SINPARTICULARIZADA      1-6
    RELLENO_OTROSCUANT              1-12

*/

var f4_PARTICULARIZADA_ALGUNOS = [];
var f4_PARTICULARIZADA_TODOS = [];
var f4_GENERALIZADA_ALGUNOS = [];
var f4_NEUTRA_ALGUNOS = [];
var f4_RELLENO_CONPARTICULARIZADA = [];
var f4_RELLENO_SINPARTICULARIZADA = [];
var f4_RELLENO_OTROSCUANT = [];


// Push pantallas a bloques

f4_PARTICULARIZADA_ALGUNOS.push(pan_PARTICULARIZADA_ALGUNOS_10, pan_PARTICULARIZADA_ALGUNOS_11, pan_PARTICULARIZADA_ALGUNOS_12);
f4_PARTICULARIZADA_TODOS.push(pan_PARTICULARIZADA_TODOS_7, pan_PARTICULARIZADA_TODOS_8, pan_PARTICULARIZADA_TODOS_9);
f4_GENERALIZADA_ALGUNOS.push(pan_GENERALIZADA_ALGUNOS_4, pan_GENERALIZADA_ALGUNOS_5, pan_GENERALIZADA_ALGUNOS_6);
f4_NEUTRA_ALGUNOS.push(pan_NEUTRA_ALGUNOS_1, pan_NEUTRA_ALGUNOS_2, pan_NEUTRA_ALGUNOS_3);
f4_RELLENO_CONPARTICULARIZADA.push(pan_RELLENO_CONPARTICULARIZADA_7, pan_RELLENO_CONPARTICULARIZADA_8, pan_RELLENO_CONPARTICULARIZADA_9, pan_RELLENO_CONPARTICULARIZADA_10, pan_RELLENO_CONPARTICULARIZADA_11, pan_RELLENO_CONPARTICULARIZADA_12);
f4_RELLENO_SINPARTICULARIZADA.push(pan_RELLENO_SINPARTICULARIZADA_1, pan_RELLENO_SINPARTICULARIZADA_2, pan_RELLENO_SINPARTICULARIZADA_3, pan_RELLENO_SINPARTICULARIZADA_4, pan_RELLENO_SINPARTICULARIZADA_5, pan_RELLENO_SINPARTICULARIZADA_6);
f4_RELLENO_OTROSCUANT.push(pan_RELLENO_OTROSCUANT_1, pan_RELLENO_OTROSCUANT_2, pan_RELLENO_OTROSCUANT_3, pan_RELLENO_OTROSCUANT_4, pan_RELLENO_OTROSCUANT_5, pan_RELLENO_OTROSCUANT_6, pan_RELLENO_OTROSCUANT_7, pan_RELLENO_OTROSCUANT_8, pan_RELLENO_OTROSCUANT_9, pan_RELLENO_OTROSCUANT_10, pan_RELLENO_OTROSCUANT_11, pan_RELLENO_OTROSCUANT_12);

//Randomizar
var f4_PARTICULARIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f4_PARTICULARIZADA_ALGUNOS, 1);
var f4_PARTICULARIZADA_TODOS_rndm = jsPsych.randomization.repeat(f4_PARTICULARIZADA_TODOS, 1);
var f4_GENERALIZADA_ALGUNOS_rndm = jsPsych.randomization.repeat(f4_GENERALIZADA_ALGUNOS, 1);
var f4_NEUTRA_ALGUNOS_rndm = jsPsych.randomization.repeat(f4_NEUTRA_ALGUNOS, 1);
var f4_RELLENO_CONPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f4_RELLENO_CONPARTICULARIZADA , 1);
var f4_RELLENO_SINPARTICULARIZADA_rndm = jsPsych.randomization.repeat(f4_RELLENO_SINPARTICULARIZADA , 1);
var f4_RELLENO_OTROSCUANT_rndm = jsPsych.randomization.repeat(f4_RELLENO_OTROSCUANT, 1);

// Crear bloques
var f4_blo1 = [];
var f4_blo2 = [];
var f4_blo3 = [];

//Push elementos a bloques
f4_blo1.push(f4_PARTICULARIZADA_ALGUNOS_rndm[0],
             f4_PARTICULARIZADA_TODOS_rndm[0],
             f4_GENERALIZADA_ALGUNOS_rndm[0],
             f4_NEUTRA_ALGUNOS_rndm[0],
             f4_RELLENO_CONPARTICULARIZADA_rndm[0], f4_RELLENO_CONPARTICULARIZADA_rndm[1],
             f4_RELLENO_SINPARTICULARIZADA_rndm[0], f4_RELLENO_SINPARTICULARIZADA_rndm[1],
             f4_RELLENO_OTROSCUANT_rndm[0], f4_RELLENO_OTROSCUANT_rndm[1],f4_RELLENO_OTROSCUANT_rndm[2],f4_RELLENO_OTROSCUANT_rndm[3]
           );


f4_blo2.push(f4_PARTICULARIZADA_ALGUNOS_rndm[1],
             f4_PARTICULARIZADA_TODOS_rndm[1],
             f4_GENERALIZADA_ALGUNOS_rndm[1],
             f4_NEUTRA_ALGUNOS_rndm[1],
             f4_RELLENO_CONPARTICULARIZADA_rndm[2], f4_RELLENO_CONPARTICULARIZADA_rndm[3],
             f4_RELLENO_SINPARTICULARIZADA_rndm[2], f4_RELLENO_SINPARTICULARIZADA_rndm[3],
             f4_RELLENO_OTROSCUANT_rndm[4], f4_RELLENO_OTROSCUANT_rndm[5],f4_RELLENO_OTROSCUANT_rndm[6],f4_RELLENO_OTROSCUANT_rndm[7]
           );

f4_blo3.push(f4_PARTICULARIZADA_ALGUNOS_rndm[2],
             f4_PARTICULARIZADA_TODOS_rndm[2],
             f4_GENERALIZADA_ALGUNOS_rndm[2],
             f4_NEUTRA_ALGUNOS_rndm[2],
             f4_RELLENO_CONPARTICULARIZADA_rndm[4], f4_RELLENO_CONPARTICULARIZADA_rndm[5],
             f4_RELLENO_SINPARTICULARIZADA_rndm[4], f4_RELLENO_SINPARTICULARIZADA_rndm[5],
             f4_RELLENO_OTROSCUANT_rndm[8], f4_RELLENO_OTROSCUANT_rndm[9],f4_RELLENO_OTROSCUANT_rndm[10],f4_RELLENO_OTROSCUANT_rndm[11]
           );

//Randomizar
var f4_blo1_rndm = jsPsych.randomization.repeat(f4_blo1, 1);
var f4_blo2_rndm = jsPsych.randomization.repeat(f4_blo2, 1);
var f4_blo3_rndm = jsPsych.randomization.repeat(f4_blo3, 1);

//Crear forma con bloques
var f4_final = [];

for (var i = 0; i < f4_blo1_rndm.length; i++) {
  f4_final.push(f4_blo1_rndm[i]);
}
f4_final.push(descanso);
for (var i = 0; i < f4_blo2_rndm.length; i++) {
  f4_final.push(f4_blo2_rndm[i]);
}
f4_final.push(descanso);
for (var i = 0; i < f4_blo3_rndm.length; i++) {
  f4_final.push(f4_blo3_rndm[i]);
}


// Crear save data
//Crear nombre de archivo

var archivo = "lor_f_" + formasRndmAssign + "_s_" + subject_id;

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

//Funcion setear ultimo intento
/*
var guardar_ultimo = {
    type: 'call-function',
    func: function(){ saveData( "ultimo_trial" + ".js", datos_guardar);
                    }};
*/

//Crear final
var final = {
  type: 'html-keyboard-response',
  stimulus: '<p align="center">¡Gracias por participar!</p> <p align="center">Su código para el sorteo es:<p><b>'+ sorteo_id +'</b></p><p align="center">Anote el código para participar del sorteo.<br>Si tiene alguna pregunta o desea participar de más actividades como esta, puede escribir a <a href="mailto:loredo.rod@gmail.com" target="_blank">loredo.rod@gmail.com</a> <p>&nbsp;<p><p align="center"><b>Cierre la pestaña o el navegador para terminar.</b></p>',
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
timeline.push(pan_PRACTICA_1, pan_PRACTICA_2, pan_PRACTICA_3, pan_PRACTICA_4);
timeline.push(descanso);
timeline.push(iniciar_exp_txt);

//Llamado condicional
if (formasRndmAssign == 1) {
  for (var i = 0; i < f1_final.length; i++) {
    timeline.push(f1_final[i]);
  }
}

if (formasRndmAssign == 2) {
  for (var i = 0; i < f2_final.length; i++) {
    timeline.push(f2_final[i]);
  }
}

if (formasRndmAssign == 3) {
  for (var i = 0; i < f3_final.length; i++) {
    timeline.push(f3_final[i]);
  }
}

if (formasRndmAssign == 4) {
  for (var i = 0; i < f4_final.length; i++) {
    timeline.push(f4_final[i]);
  }
}

//saveData
timeline.push(savingdata);

//Final
timeline.push(final);

// Iniciar experimento
jsPsych.init({
  show_progress_bar: true,
  timeline: timeline,
  preload_images: images,
  on_finish: function(){
// jsPsych.data.displayData();
  }

});
