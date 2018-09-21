// Declarar variables a usar

var timeline = [];
var opciones = ['1 <br>Incorrecta', '2', '3','4', '5', '6', '7 <br>Correcta'];

// Generar id de sujeto
var subject_id = jsPsych.randomization.randomID(8);
console.log(subject_id);

// Generar valor de forma
var formas = [1, 2];
var formasRndm = jsPsych.randomization.repeat(formas, 1);
var formasRndmAssign = formasRndm[0];
console.log(formasRndmAssign);

//Variable sexo para save_data
var sex = ""

// Crear bienvenida. Agrega on_finish a todos los trial el subject_id
var bienvenida = {
  type: 'html-keyboard-response',
  stimulus: '<p align="center">Bienvenidos a la actividad.<br> En la próxima página encontrará el consentimiento y las instrucciones.</p><p align="center">Esta actividad solo puede realizarse en computadoras (NO tablet ni celulares).<p>&nbsp;<p><p align="center"><b>Presione cualquier tecla para continuar.</b></p>',
  data: {bienvenida: 'bienvenida'} ,
  on_finish: jsPsych.data.addProperties({sujeto: subject_id, forma: formasRndmAssign})
};




// Crear Consentimiento
var consentimiento= {
    type: 'instructions',
    pages: [
      '<div class="small" ><p align="justify"> Esta investigación tiene como objetivo investigar la comprensión y producción de oraciones en adultos <b>hablantes nativos de español</b>. Si decide hacer esta actividad, primero se le solicitará información sobre su edad, sexo y nivel educativo. Luego tendrá que evaluar diferentes oraciones y decidir qué tan correctas le parecen. La actividad puede completarse en un periodo de <b>5 a 10 minutos.</b></p> <p align="justify"> Su participación en <b>esta actividad es voluntaria</b> y puede abandonarla en cualquier momento que lo desee. Simplemente puede cerrar el programa que está utilizando para navegar por internet. Esta actividad no supone ningún riesgo asociado a su participación y toda la información que brinde no será compartida con nadie. Será tratada de manera <b>confidencial y anónima</b>. El programa no registra ningún tipo de dato que pueda individualizar al participante.</p> <p align="justify"> Si desea recibir más información puede escribirle a Ailín Franco, investigadora responsable de esta actividad al correo <a href="mailto:ailinpfranco@gmail.com" target="_blank">ailinpfranco@gmail.com</a></p><p>&nbsp;</p> <p align="left"><b>Consentimiento</b></p><p align="justify"><b> Haciendo click en <i>aceptar</i> acepto participar de manera completamente voluntaria en esta actividad, entendiendo tanto el objetivo de la investigación como la descripción de las tareas a realizar. Asimismo, certifico que soy mayor de 18 años y que comprendo que tengo la libertad de abandonar la actividad en cualquier momento que lo desee.</b></p></div>',
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
var page_1_options_1 = ["Menos de 20 años", "20 a 45 años", "46 a 65 años ", "Más de 65 años"];
var page_1_options_2 = ["Masculino", "Femenino"];
var page_2_options = ["Primario en curso/completo", "Secundario en curso/completo", "Universitario en curso/completo"];
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
           })}};


//Instrucciones
var instrucciones= {
    type: 'instructions',
    pages: [
      '<p>En esta actividad usted va a leer diferentes oraciones.</p> <p>Indique qué tan correctas le resultan las oraciones, siendo  1 = incorrecta y 7 = muy correcta. <br> Tenga en cuenta que también puede haber valores intermedios como 2, 3, 4, 5, 6.  </p><p> Para responder tendrá un tiempo limitado, por lo que deberá hacerlo prestando atención pero lo más rápido posible.</p><p>Entre las oraciones tendrá una pantalla que puede utilizar para descansar</p>',
      '<p>A continuación podrá practicar con algunas oraciones.</p>'
     ],
    show_clickable_nav: true,
    button_label_next: "Siguiente",
    button_label_previous : "Volver"
  };


// Pantallas descanso e inicio
var descanso = {
  type: 'html-button-response',
  stimulus: "",
  prompt: "<p align='center'> Si desea puede descansar</p><p align='center'>Presione el botón para continuar.</p>",
  choices: ["<p>Continuar</p>"],
  button_html: '<button class="jspsych-btn-descanso">%choice%</button>'
};

var iniciar_practica = {
  type: 'html-button-response',
  stimulus: "",
  prompt: "<p align='center'>Presione el botón para comenzar la práctica.</p>",
  choices: ["<p>Comenzar</p>"],
  button_html: '<button class="jspsych-btn-descanso">%choice%</button>'
};


var iniciar_exp_txt = {
  type: 'html-keyboard-response',
  stimulus: '<p align="center"><p align="center" style="font-size:18px">¡Excelente! Ahora comenzará el experimento.</p><p>&nbsp;<p><p align="center"><b>Presione cualquier tecla para continuar.</b></p>',
};

var iniciar_exp = {
  type: 'html-button-response',
  stimulus: "",
  prompt: "<p align='center'>Presione el botón para comenzar.</p>",
  choices: ["<p>Comenzar</p>"],
  button_html: '<button class="jspsych-btn-descanso">%choice%</button>'
};


// Crear estímulos

    // Práctica
    var estim_PRACTICA_1 = "<p>El secretario trabaja.</p>";
    var estim_PRACTICA_2 = "<p>La estrella brilla el cielo.</p>";
    var estim_PRACTICA_3 = "<p>El alumno promete al profesor.</p>";
    var estim_PRACTICA_4 = "<p>El niño pega la figurita en el álbum.</p>";

        //Control

              //Agramaticales
              var estim_CONTROL_AGR_1 = "<p>El perro tiembla la pelota.</p>";
              var estim_CONTROL_AGR_2 = "<p>La actriz baila la directora.</p>";
              var estim_CONTROL_AGR_3 = "<p>María ríe los estantes.</p>";
              var estim_CONTROL_AGR_4 = "<p>El globo explota los animales.</p>";
              var estim_CONTROL_AGR_5 = "<p>El sol brilla la comida.</p>";
              var estim_CONTROL_AGR_6 = "<p>El colectivo viene los autos.</p>";

              //Gramaticales
              var estim_CONTROL_GR_1 = "<p>El pescador arroja la botella al mar.</p>";
              var estim_CONTROL_GR_2 = "<p>Juan pone el libro en el estante.</p>";
              var estim_CONTROL_GR_3 = "<p>El repartidor entrega  la mercadería al cliente.</p>";
              var estim_CONTROL_GR_4 = "<p>El hombre vende un televisor al joven.</p>";
              var estim_CONTROL_GR_5 = "<p>La abuela paga la cuenta a la moza.</p>";
              var estim_CONTROL_GR_6 = "<p>La madre sirve la sopa a la hija.</p>";

//Condición 1. Alternantes gramaticales transitivos
var estim_ALT_GR_TR_1 = "<p>El diputado ahoga al gato.</p>";
var estim_ALT_GR_TR_2 = "<p>El sol calienta el piso.</p>";
var estim_ALT_GR_TR_3 = "<p>El viento apaga la vela.</p>";
var estim_ALT_GR_TR_4 = "<p>El niño rompe el vidrio.</p>";
var estim_ALT_GR_TR_5 = "<p>El conductor cierra la ventana.</p>";
var estim_ALT_GR_TR_6 = "<p>El juez abre la puerta.</p>";

//Condición 2. Alternantes gramaticales intransitivos
var estim_ALT_GR_INTR_1 = "<p>El gato se ahoga.</p>";
var estim_ALT_GR_INTR_2 = "<p>El piso se calienta.</p>";
var estim_ALT_GR_INTR_3 = "<p>La vela se apaga.</p>";
var estim_ALT_GR_INTR_4 = "<p>El vidrio se rompe.</p>";
var estim_ALT_GR_INTR_5 = "<p>La ventana se cierra.</p>";
var estim_ALT_GR_INTR_6 = "<p>La puerta se abre.</p>";

//Condición 3. Alternantes agramaticales -1 argumento
var estim_ALT_AGR_MENOSARG_1 = "<p>El diputado ahoga.</p>";
var estim_ALT_AGR_MENOSARG_2 = "<p>El sol calienta.</p>";
var estim_ALT_AGR_MENOSARG_3 = "<p>El viento apaga.</p>";
var estim_ALT_AGR_MENOSARG_4 = "<p>El niño rompe.</p>";
var estim_ALT_AGR_MENOSARG_5 = "<p>El conductor cierra.</p>";
var estim_ALT_AGR_MENOSARG_6 = "<p>El juez abre.</p>";

//Condición 4. No alternantes gramaticales
var estim_NALT_GR_TR_1 = "<p>El tigre muerde al león.</p>";
var estim_NALT_GR_TR_2 = "<p>La enfermera lava a la paciente.</p>";
var estim_NALT_GR_TR_3 = "<p>La novia abraza a la madrina.</p>";
var estim_NALT_GR_TR_4 = "<p>Juan golpea al verdulero.</p>";
var estim_NALT_GR_TR_5 = "<p>El patrullero persigue a la moto.</p>";
var estim_NALT_GR_TR_6 = "<p>El marinero saluda al capitán.</p>";

//Condición 5. No alternantes agramaticales
var estim_NALT_AGR_1 = "<p>La secretaria imprime el informe el papel.</p>";
var estim_NALT_AGR_2 = "<p>La niña lee la novela el perro.</p>";
var estim_NALT_AGR_3 = "<p>La jefa castiga a la empleada la mascota.</p>";
var estim_NALT_AGR_4 = "<p>El abuelo limpia el baño la abuela.</p>";
var estim_NALT_AGR_5 = "<p>La peluquera  empuja a la doctora la anciana.</p>";
var estim_NALT_AGR_6 = "<p>El gato sigue al ratón la hormiga.</p>";

//Condición 6. No alternantes agramaticales 1- argumento
var estim_NALT_AGR_MENOSARG_1 = "<p>El carpintero toca.</p>";
var estim_NALT_AGR_MENOSARG_2 = "<p>El joven dibuja.</p>";
var estim_NALT_AGR_MENOSARG_3 = "<p>El conductor golpea.</p>";
var estim_NALT_AGR_MENOSARG_4 = "<p>El señor dispara.</p>";
var estim_NALT_AGR_MENOSARG_5 = "<p>El perro atrapa.</p>";
var estim_NALT_AGR_MENOSARG_6 = "<p>El maestro corta.</p>";



// Crear códigos
var cod_ALT_GR_TR_1 = "ALT_GR_TR_1";
var cod_ALT_GR_TR_2 = "ALT_GR_TR_2";
var cod_ALT_GR_TR_3 = "ALT_GR_TR_3";
var cod_ALT_GR_TR_4 = "ALT_GR_TR_4";
var cod_ALT_GR_TR_5 = "ALT_GR_TR_5";
var cod_ALT_GR_TR_6 = "ALT_GR_TR_6";

var cod_ALT_GR_INTR_1 = "ALT_GR_INTR_1";
var cod_ALT_GR_INTR_2 = "ALT_GR_INTR_2";
var cod_ALT_GR_INTR_3 = "ALT_GR_INTR_3";
var cod_ALT_GR_INTR_4 = "ALT_GR_INTR_4";
var cod_ALT_GR_INTR_5 = "ALT_GR_INTR_5";
var cod_ALT_GR_INTR_6 = "ALT_GR_INTR_6";

var cod_ALT_AGR_MENOSARG_1 = "ALT_AGR_MENOSARG_1";
var cod_ALT_AGR_MENOSARG_2 = "ALT_AGR_MENOSARG_2";
var cod_ALT_AGR_MENOSARG_3 = "ALT_AGR_MENOSARG_3";
var cod_ALT_AGR_MENOSARG_4 = "ALT_AGR_MENOSARG_4";
var cod_ALT_AGR_MENOSARG_5 = "ALT_AGR_MENOSARG_5";
var cod_ALT_AGR_MENOSARG_6 = "ALT_AGR_MENOSARG_6";

var cod_NALT_GR_TR_1 = "NALT_GR_TR_1";
var cod_NALT_GR_TR_2 = "NALT_GR_TR_2";
var cod_NALT_GR_TR_3 = "NALT_GR_TR_3";
var cod_NALT_GR_TR_4 = "NALT_GR_TR_4";
var cod_NALT_GR_TR_5 = "NALT_GR_TR_5";
var cod_NALT_GR_TR_6 = "NALT_GR_TR_6";

var cod_NALT_AGR_1 = "NALT_AGR_1";
var cod_NALT_AGR_2 = "NALT_AGR_2";
var cod_NALT_AGR_3 = "NALT_AGR_3";
var cod_NALT_AGR_4 = "NALT_AGR_4";
var cod_NALT_AGR_5 = "NALT_AGR_5";
var cod_NALT_AGR_6 = "NALT_AGR_6";

var cod_NALT_AGR_MENOSARG_1 = "NALT_AGR_MENOSARG_1";
var cod_NALT_AGR_MENOSARG_2 = "NALT_AGR_MENOSARG_2";
var cod_NALT_AGR_MENOSARG_3 = "NALT_AGR_MENOSARG_3";
var cod_NALT_AGR_MENOSARG_4 = "NALT_AGR_MENOSARG_4";
var cod_NALT_AGR_MENOSARG_5 = "NALT_AGR_MENOSARG_5";
var cod_NALT_AGR_MENOSARG_6 = "NALT_AGR_MENOSARG_6";

var cod_CONTROL_GR_1 = "CONTROL_GR_1";
var cod_CONTROL_GR_2 = "CONTROL_GR_2";
var cod_CONTROL_GR_3 = "CONTROL_GR_3";
var cod_CONTROL_GR_4 = "CONTROL_GR_4";
var cod_CONTROL_GR_5 = "CONTROL_GR_5";
var cod_CONTROL_GR_6 = "CONTROL_GR_6";

var cod_CONTROL_AGR_1 = "CONTROL_AGR_1";
var cod_CONTROL_AGR_2 = "CONTROL_AGR_2";
var cod_CONTROL_AGR_3 = "CONTROL_AGR_3";
var cod_CONTROL_AGR_4 = "CONTROL_AGR_4";
var cod_CONTROL_AGR_5 = "CONTROL_AGR_5";
var cod_CONTROL_AGR_6 = "CONTROL_AGR_6";

var cod_PRACTICA_1 = "PRACTICA_1";
var cod_PRACTICA_2 = "PRACTICA_2";
var cod_PRACTICA_3 = "PRACTICA_3";
var cod_PRACTICA_4 = "PRACTICA_4";


// Crear pantallas de la práctica
var pan_PRACTICA_1 = {type: "html-button-response", stimulus: estim_PRACTICA_1, prompt: '<p>&nbsp;</p><p>Indique qué tan correcta le resulta las oración, siendo  1 = incorrecta y 7 = muy correcta.</p>', choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 10000, data: {codigo: cod_PRACTICA_1}};
var pan_PRACTICA_2 = {type: "html-button-response", stimulus: estim_PRACTICA_2, prompt: '<p>&nbsp;</p><p>Indique qué tan correcta le resulta las oración, siendo  1 = incorrecta y 7 = muy correcta.</p>', choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 10000, data: {codigo: cod_PRACTICA_2}};
var pan_PRACTICA_3 = {type: "html-button-response", stimulus: estim_PRACTICA_3, prompt: '<p>&nbsp;</p><p>Indique qué tan correcta le resulta las oración, siendo  1 = incorrecta y 7 = muy correcta.</p>', choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 10000, data: {codigo: cod_PRACTICA_3}};
var pan_PRACTICA_4 = {type: "html-button-response", stimulus: estim_PRACTICA_4, prompt: '<p>&nbsp;</p><p>Indique qué tan correcta le resulta las oración, siendo  1 = incorrecta y 7 = muy correcta.</p>',  choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 10000, data: {codigo: cod_PRACTICA_4}};

// Crear bloque de práctica y randomizar
var bloque_practica = [];
bloque_practica.push(pan_PRACTICA_1, pan_PRACTICA_2, pan_PRACTICA_3, pan_PRACTICA_4);
var bloque_practica_RNDM = jsPsych.randomization.repeat(bloque_practica, 1);

// Agregar descansos
var practica_FINAL = [];
for (var i = 0; i < bloque_practica_RNDM.length; i++) {
  practica_FINAL.push(descanso);
  practica_FINAL.push(bloque_practica_RNDM[i]);
}

// Elimino el primer descanso
practica_FINAL.shift();

// Crear forma 1

//Control
      //gramaticales
      var pan_CONTROL_GR_1_f1 = {type: "html-button-response", stimulus: estim_CONTROL_GR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_1}};
      var pan_CONTROL_GR_2_f1 = {type: "html-button-response", stimulus: estim_CONTROL_GR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_2}};
      var pan_CONTROL_GR_3_f1 = {type: "html-button-response", stimulus: estim_CONTROL_GR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_3}};
      var pan_CONTROL_GR_4_f1 = {type: "html-button-response", stimulus: estim_CONTROL_GR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_4}};
      var pan_CONTROL_GR_5_f1 = {type: "html-button-response", stimulus: estim_CONTROL_GR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_5}};
      var pan_CONTROL_GR_6_f1 = {type: "html-button-response", stimulus: estim_CONTROL_GR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_6}};

var control_GR_f1 = [];
control_GR_f1.push(pan_CONTROL_GR_1_f1);
control_GR_f1.push(pan_CONTROL_GR_2_f1);
control_GR_f1.push(pan_CONTROL_GR_3_f1);
control_GR_f1.push(pan_CONTROL_GR_4_f1);
control_GR_f1.push(pan_CONTROL_GR_5_f1);
control_GR_f1.push(pan_CONTROL_GR_6_f1);
var control_GR_f1_RNDM = jsPsych.randomization.repeat(control_GR_f1, 1);

      //agramaticales
      var pan_CONTROL_AGR_1_f1 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_1}};
      var pan_CONTROL_AGR_2_f1 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_2}};
      var pan_CONTROL_AGR_3_f1 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_3}};
      var pan_CONTROL_AGR_4_f1 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_4}};
      var pan_CONTROL_AGR_5_f1 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_5}};
      var pan_CONTROL_AGR_6_f1 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_6}};

var control_AGR_f1 = [];
control_AGR_f1.push(pan_CONTROL_AGR_1_f1);
control_AGR_f1.push(pan_CONTROL_AGR_2_f1);
control_AGR_f1.push(pan_CONTROL_AGR_3_f1);
control_AGR_f1.push(pan_CONTROL_AGR_4_f1);
control_AGR_f1.push(pan_CONTROL_AGR_5_f1);
control_AGR_f1.push(pan_CONTROL_AGR_6_f1);
var control_AGR_f1_RNDM = jsPsych.randomization.repeat(control_AGR_f1, 1);

// Alternante gramatical transitivo 1-3
var pan_ALT_GR_TR_1 = {type: "html-button-response", stimulus: estim_ALT_GR_TR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_TR_1}};
var pan_ALT_GR_TR_2 = {type: "html-button-response", stimulus: estim_ALT_GR_TR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_TR_2}};
var pan_ALT_GR_TR_3 = {type: "html-button-response", stimulus: estim_ALT_GR_TR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_TR_3}};

var f1_ALT_GR_TR = [];
f1_ALT_GR_TR.push(pan_ALT_GR_TR_1);
f1_ALT_GR_TR.push(pan_ALT_GR_TR_2);
f1_ALT_GR_TR.push(pan_ALT_GR_TR_3);
var f1_ALT_GR_TR_RNDM = jsPsych.randomization.repeat(f1_ALT_GR_TR, 1);


// Alternante gramatical intransitivo 4-6
var pan_ALT_GR_INTR_4 = {type: "html-button-response", stimulus: estim_ALT_GR_INTR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_INTR_4}};
var pan_ALT_GR_INTR_5 = {type: "html-button-response", stimulus: estim_ALT_GR_INTR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_INTR_5}};
var pan_ALT_GR_INTR_6 = {type: "html-button-response", stimulus: estim_ALT_GR_INTR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_INTR_6}};

var f1_ALT_GR_INTR = [];
f1_ALT_GR_INTR.push(pan_ALT_GR_INTR_4);
f1_ALT_GR_INTR.push(pan_ALT_GR_INTR_5);
f1_ALT_GR_INTR.push(pan_ALT_GR_INTR_6);
var f1_ALT_GR_INTR_RNDM = jsPsych.randomization.repeat(f1_ALT_GR_INTR, 1);

// Alternante agramatical menos 1 arg 1,3,5
var pan_ALT_AGR_MENOSARG_1 = {type: "html-button-response", stimulus: estim_ALT_AGR_MENOSARG_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_AGR_MENOSARG_1}};
var pan_ALT_AGR_MENOSARG_3 = {type: "html-button-response", stimulus: estim_ALT_AGR_MENOSARG_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_AGR_MENOSARG_3}};
var pan_ALT_AGR_MENOSARG_5 = {type: "html-button-response", stimulus: estim_ALT_AGR_MENOSARG_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_AGR_MENOSARG_5}};

var f1_ALT_AGR_MENOSARG = [];
f1_ALT_AGR_MENOSARG.push(pan_ALT_AGR_MENOSARG_1);
f1_ALT_AGR_MENOSARG.push(pan_ALT_AGR_MENOSARG_3);
f1_ALT_AGR_MENOSARG.push(pan_ALT_AGR_MENOSARG_5);
var f1_ALT_AGR_MENOSARG_RNDM = jsPsych.randomization.repeat(f1_ALT_AGR_MENOSARG, 1);

//No alternante gramatical transitivo 1-3
var pan_NALT_GR_TR_1 = {type: "html-button-response", stimulus: estim_NALT_GR_TR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_GR_TR_1}};
var pan_NALT_GR_TR_2 = {type: "html-button-response", stimulus: estim_NALT_GR_TR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_GR_TR_2}};
var pan_NALT_GR_TR_3 = {type: "html-button-response", stimulus: estim_NALT_GR_TR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_GR_TR_3}};

var f1_NALT_GR_TR = [];
f1_NALT_GR_TR.push(pan_NALT_GR_TR_1);
f1_NALT_GR_TR.push(pan_NALT_GR_TR_2);
f1_NALT_GR_TR.push(pan_NALT_GR_TR_3);
var f1_NALT_GR_TR_RNDM = jsPsych.randomization.repeat(f1_NALT_GR_TR, 1);

//No alternante agramatical 4-6
var pan_NALT_AGR_4 = {type: "html-button-response", stimulus: estim_NALT_AGR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_4}};
var pan_NALT_AGR_5 = {type: "html-button-response", stimulus: estim_NALT_AGR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_5}};
var pan_NALT_AGR_6 = {type: "html-button-response", stimulus: estim_NALT_AGR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_6}};

var f1_NALT_AGR = [];
f1_NALT_AGR.push(pan_NALT_AGR_4);
f1_NALT_AGR.push(pan_NALT_AGR_5);
f1_NALT_AGR.push(pan_NALT_AGR_6);
var f1_NALT_AGR_RNDM = jsPsych.randomization.repeat(f1_NALT_AGR, 1);

//No alternante agramatical menos 1 arg 1-3
var pan_NALT_AGR_MENOSARG_1 = {type: "html-button-response", stimulus: estim_NALT_AGR_MENOSARG_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_MENOSARG_1}};
var pan_NALT_AGR_MENOSARG_2 = {type: "html-button-response", stimulus: estim_NALT_AGR_MENOSARG_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_MENOSARG_2}};
var pan_NALT_AGR_MENOSARG_3 = {type: "html-button-response", stimulus: estim_NALT_AGR_MENOSARG_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_MENOSARG_3}};

var f1_NALT_AGR_MENOSARG = [];
f1_NALT_AGR_MENOSARG.push(pan_NALT_AGR_MENOSARG_1);
f1_NALT_AGR_MENOSARG.push(pan_NALT_AGR_MENOSARG_2);
f1_NALT_AGR_MENOSARG.push(pan_NALT_AGR_MENOSARG_3);
var f1_NALT_AGR_MENOSARG_RNDM = jsPsych.randomization.repeat(f1_NALT_AGR_MENOSARG, 1);

/* Crear bloques

Condición         Cantidad por bloque

ALT_GR_TR                 1
ALT_GR_INTR               1
ALT_AGR_MENOSARG          1
NALT_GR_TR                1
NALT_AGR                  1
NALT_AGR_MENOSARG         1
CONTROL_GR                2
CONTROL_AGR               2
*/

var f1_bloque_1 = [f1_ALT_GR_TR_RNDM[0], f1_ALT_GR_INTR_RNDM[0], f1_ALT_AGR_MENOSARG_RNDM[0],f1_NALT_GR_TR_RNDM[0] ,f1_NALT_AGR_RNDM[0], f1_NALT_AGR_MENOSARG_RNDM[0], control_GR_f1_RNDM[0], control_GR_f1_RNDM[1], control_AGR_f1_RNDM[0], control_AGR_f1_RNDM[1]];
var f1_bloque_2 = [f1_ALT_GR_TR_RNDM[1], f1_ALT_GR_INTR_RNDM[1], f1_ALT_AGR_MENOSARG_RNDM[1],f1_NALT_GR_TR_RNDM[1] ,f1_NALT_AGR_RNDM[1], f1_NALT_AGR_MENOSARG_RNDM[1], control_GR_f1_RNDM[2], control_GR_f1_RNDM[3], control_AGR_f1_RNDM[2], control_AGR_f1_RNDM[3]];
var f1_bloque_3 = [f1_ALT_GR_TR_RNDM[2], f1_ALT_GR_INTR_RNDM[2], f1_ALT_AGR_MENOSARG_RNDM[2],f1_NALT_GR_TR_RNDM[2] ,f1_NALT_AGR_RNDM[2], f1_NALT_AGR_MENOSARG_RNDM[2], control_GR_f1_RNDM[4], control_GR_f1_RNDM[5], control_AGR_f1_RNDM[4], control_AGR_f1_RNDM[5]];

//Randomizar
var f1_bloque_1_RNDM = jsPsych.randomization.repeat(f1_bloque_1, 1);
var f1_bloque_2_RNDM = jsPsych.randomization.repeat(f1_bloque_2, 1);
var f1_bloque_3_RNDM = jsPsych.randomization.repeat(f1_bloque_3, 1);

//Agregar descanso
var f1_bloque_1_FINAL = [];
for (var i = 0; i < f1_bloque_1_RNDM.length; i++) {
  f1_bloque_1_FINAL.push(descanso);
  f1_bloque_1_FINAL.push(f1_bloque_1_RNDM[i]);
}

var f1_bloque_2_FINAL = [];
for (var i = 0; i < f1_bloque_2_RNDM.length; i++) {
  f1_bloque_2_FINAL.push(descanso);
  f1_bloque_2_FINAL.push(f1_bloque_2_RNDM[i]);
}

var f1_bloque_3_FINAL = [];
for (var i = 0; i < f1_bloque_3_RNDM.length; i++) {
  f1_bloque_3_FINAL.push(descanso);
  f1_bloque_3_FINAL.push(f1_bloque_3_RNDM[i]);
}



//Crear forma 2
//Control
      //gramaticales
      var pan_CONTROL_GR_1_f2 = {type: "html-button-response", stimulus: estim_CONTROL_GR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_1}};
      var pan_CONTROL_GR_2_f2 = {type: "html-button-response", stimulus: estim_CONTROL_GR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_2}};
      var pan_CONTROL_GR_3_f2 = {type: "html-button-response", stimulus: estim_CONTROL_GR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_3}};
      var pan_CONTROL_GR_4_f2 = {type: "html-button-response", stimulus: estim_CONTROL_GR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_4}};
      var pan_CONTROL_GR_5_f2 = {type: "html-button-response", stimulus: estim_CONTROL_GR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_5}};
      var pan_CONTROL_GR_6_f2 = {type: "html-button-response", stimulus: estim_CONTROL_GR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_GR_6}};

      var control_GR_f2 = [];
      control_GR_f2.push(pan_CONTROL_GR_1_f2);
      control_GR_f2.push(pan_CONTROL_GR_2_f2);
      control_GR_f2.push(pan_CONTROL_GR_3_f2);
      control_GR_f2.push(pan_CONTROL_GR_4_f2);
      control_GR_f2.push(pan_CONTROL_GR_5_f2);
      control_GR_f2.push(pan_CONTROL_GR_6_f2);
      var control_GR_f2_RNDM = jsPsych.randomization.repeat(control_GR_f2, 1);


      //agramaticales
      var pan_CONTROL_AGR_1_f2 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_1}};
      var pan_CONTROL_AGR_2_f2 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_2}};
      var pan_CONTROL_AGR_3_f2 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_3}};
      var pan_CONTROL_AGR_4_f2 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_4}};
      var pan_CONTROL_AGR_5_f2 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_5}};
      var pan_CONTROL_AGR_6_f2 = {type: "html-button-response", stimulus: estim_CONTROL_AGR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_CONTROL_AGR_6}};

      var control_AGR_f2 = [];
      control_AGR_f2.push(pan_CONTROL_AGR_1_f2);
      control_AGR_f2.push(pan_CONTROL_AGR_2_f2);
      control_AGR_f2.push(pan_CONTROL_AGR_3_f2);
      control_AGR_f2.push(pan_CONTROL_AGR_4_f2);
      control_AGR_f2.push(pan_CONTROL_AGR_5_f2);
      control_AGR_f2.push(pan_CONTROL_AGR_6_f2);
      var control_AGR_f2_RNDM = jsPsych.randomization.repeat(control_AGR_f2, 1);


// Alternante gramatical transitivo 4-6
var pan_ALT_GR_TR_4 = {type: "html-button-response", stimulus: estim_ALT_GR_TR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_TR_4}};
var pan_ALT_GR_TR_5 = {type: "html-button-response", stimulus: estim_ALT_GR_TR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_TR_5}};
var pan_ALT_GR_TR_6 = {type: "html-button-response", stimulus: estim_ALT_GR_TR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_TR_6}};

var f2_ALT_GR_TR = [];
f2_ALT_GR_TR.push(pan_ALT_GR_TR_4, pan_ALT_GR_TR_5, pan_ALT_GR_TR_6);
var f2_ALT_GR_TR_RNDM = jsPsych.randomization.repeat(f2_ALT_GR_TR, 1);

// Alternante gramatical intransitivo 1-3
var pan_ALT_GR_INTR_1 = {type: "html-button-response", stimulus: estim_ALT_GR_INTR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_INTR_1}};
var pan_ALT_GR_INTR_2 = {type: "html-button-response", stimulus: estim_ALT_GR_INTR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_INTR_2}};
var pan_ALT_GR_INTR_3 = {type: "html-button-response", stimulus: estim_ALT_GR_INTR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_GR_INTR_3}};

var f2_ALT_GR_INTR = [];
f2_ALT_GR_INTR.push(pan_ALT_GR_INTR_1, pan_ALT_GR_INTR_2, pan_ALT_GR_INTR_3);
var f2_ALT_GR_INTR_RNDM = jsPsych.randomization.repeat(f2_ALT_GR_INTR, 1);

// Alternante agramatical menos 1 arg 2,4,6
var pan_ALT_AGR_MENOSARG_2 = {type: "html-button-response", stimulus: estim_ALT_AGR_MENOSARG_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_AGR_MENOSARG_2}};
var pan_ALT_AGR_MENOSARG_4 = {type: "html-button-response", stimulus: estim_ALT_AGR_MENOSARG_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_AGR_MENOSARG_4}};
var pan_ALT_AGR_MENOSARG_6 = {type: "html-button-response", stimulus: estim_ALT_AGR_MENOSARG_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_ALT_AGR_MENOSARG_6}};

var f2_ALT_AGR_MENOSARG = [];
f2_ALT_AGR_MENOSARG.push(pan_ALT_AGR_MENOSARG_2, pan_ALT_AGR_MENOSARG_4, pan_ALT_AGR_MENOSARG_6);
var f2_ALT_AGR_MENOSARG_RNDM = jsPsych.randomization.repeat(f2_ALT_AGR_MENOSARG, 1);

//No alternante gramatical transitivo 4-6
var pan_NALT_GR_TR_4 = {type: "html-button-response", stimulus: estim_NALT_GR_TR_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_GR_TR_4}};
var pan_NALT_GR_TR_5 = {type: "html-button-response", stimulus: estim_NALT_GR_TR_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_GR_TR_5}};
var pan_NALT_GR_TR_6 = {type: "html-button-response", stimulus: estim_NALT_GR_TR_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_GR_TR_6}};

var f2_NALT_GR_TR = [];
f2_NALT_GR_TR.push(pan_NALT_GR_TR_4, pan_NALT_GR_TR_5, pan_NALT_GR_TR_6);
var f2_NALT_GR_TR_RNDM = jsPsych.randomization.repeat(f2_NALT_GR_TR, 1);

//No alternante agramatical 1-3
var pan_NALT_AGR_1 = {type: "html-button-response", stimulus: estim_NALT_AGR_1, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_1}};
var pan_NALT_AGR_2 = {type: "html-button-response", stimulus: estim_NALT_AGR_2, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_2}};
var pan_NALT_AGR_3 = {type: "html-button-response", stimulus: estim_NALT_AGR_3, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_3}};

var f2_NALT_AGR = [];
f2_NALT_AGR.push(pan_NALT_AGR_1, pan_NALT_AGR_2, pan_NALT_AGR_3);
var f2_NALT_AGR_RNDM = jsPsych.randomization.repeat(f2_NALT_AGR, 1);

//No alternante agramatical menos 1 arg 4-6
var pan_NALT_AGR_MENOSARG_4 = {type: "html-button-response", stimulus: estim_NALT_AGR_MENOSARG_4, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_MENOSARG_4}};
var pan_NALT_AGR_MENOSARG_5 = {type: "html-button-response", stimulus: estim_NALT_AGR_MENOSARG_5, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_MENOSARG_5}};
var pan_NALT_AGR_MENOSARG_6 = {type: "html-button-response", stimulus: estim_NALT_AGR_MENOSARG_6, choices: opciones, button_html: '<button class="jspsych-btn-padding">%choice%</button>', trial_duration: 8000, data: {codigo: cod_NALT_AGR_MENOSARG_6}};

var f2_NALT_AGR_MENOSARG = [];
f2_NALT_AGR_MENOSARG.push(pan_NALT_AGR_MENOSARG_4, pan_NALT_AGR_MENOSARG_5, pan_NALT_AGR_MENOSARG_6);
var f2_NALT_AGR_MENOSARG_RNDM = jsPsych.randomization.repeat(f2_NALT_AGR_MENOSARG, 1);


/* Crear bloques

Condición         Cantidad por bloque

ALT_GR_TR                 1
ALT_GR_INTR               1
ALT_AGR_MENOSARG          1
NALT_GR_TR                1
NALT_AGR                  1
NALT_AGR_MENOSARG         1
CONTROL_GR                2
CONTROL_AGR               2
*/

var f2_bloque_1 = [f2_ALT_GR_TR_RNDM[0], f2_ALT_GR_INTR_RNDM[0], f2_ALT_AGR_MENOSARG_RNDM[0],f2_NALT_GR_TR_RNDM[0] ,f2_NALT_AGR_RNDM[0], f2_NALT_AGR_MENOSARG_RNDM[0], control_GR_f2_RNDM[0], control_GR_f2_RNDM[1], control_AGR_f2_RNDM[0], control_AGR_f2_RNDM[1]];
var f2_bloque_2 = [f2_ALT_GR_TR_RNDM[1], f2_ALT_GR_INTR_RNDM[1], f2_ALT_AGR_MENOSARG_RNDM[1],f2_NALT_GR_TR_RNDM[1] ,f2_NALT_AGR_RNDM[1], f2_NALT_AGR_MENOSARG_RNDM[1], control_GR_f2_RNDM[2], control_GR_f2_RNDM[3], control_AGR_f2_RNDM[2], control_AGR_f2_RNDM[3]];
var f2_bloque_3 = [f2_ALT_GR_TR_RNDM[2], f2_ALT_GR_INTR_RNDM[2], f2_ALT_AGR_MENOSARG_RNDM[2],f2_NALT_GR_TR_RNDM[2] ,f2_NALT_AGR_RNDM[2], f2_NALT_AGR_MENOSARG_RNDM[2], control_GR_f2_RNDM[4], control_GR_f2_RNDM[5], control_AGR_f2_RNDM[4], control_AGR_f2_RNDM[5]];


//Randomizar
var f2_bloque_1_RNDM = jsPsych.randomization.repeat(f2_bloque_1, 1);
var f2_bloque_2_RNDM = jsPsych.randomization.repeat(f2_bloque_2, 1);
var f2_bloque_3_RNDM = jsPsych.randomization.repeat(f2_bloque_3, 1);

//Agregar descanso
var f2_bloque_1_FINAL = [];
for (var i = 0; i < f2_bloque_1_RNDM.length; i++) {
  f2_bloque_1_FINAL.push(descanso);
  f2_bloque_1_FINAL.push(f2_bloque_1_RNDM[i]);
}

var f2_bloque_2_FINAL = [];
for (var i = 0; i < f2_bloque_2_RNDM.length; i++) {
  f2_bloque_2_FINAL.push(descanso);
  f2_bloque_2_FINAL.push(f2_bloque_2_RNDM[i]);
}

var f2_bloque_3_FINAL = [];
for (var i = 0; i < f2_bloque_3_RNDM.length; i++) {
  f2_bloque_3_FINAL.push(descanso);
  f2_bloque_3_FINAL.push(f2_bloque_3_RNDM[i]);
}


// Crear save data
//Crear nombre de archivo

var archivo = "fra_f_" + formasRndmAssign + "_s_" + subject_id;
console.log(archivo);

//Función
function saveData(filename, filedata){
   $.ajax({
      type:'post',
      cache: false,
      url: 'save_data.php', // Esta es la ruta al PHP script. Cambiar si es necesario.
      data: {filename: filename, filedata: filedata}
   });
};


//Llamar función
var savingdata = {
    type: 'call-function',
    func: function(){ saveData(archivo + "_" + sex + ".csv", jsPsych.data.get().csv());
                    console.log("guardando...")}
                  };

//Crear final
var final = {
  type: 'html-keyboard-response',
  stimulus: '<p align="center">¡Gracias por participar!</p><p align="center">Si tiene alguna pregunta o desea participar de más actividades como esta, puede escribir a <a href="mailto:ailinpfranco@gmail.com" target="_blank">ailinpfranco@gmail.com</a> <p>&nbsp;<p><p align="center"><b>Cierre la pestaña o el navegador para terminar.</b></p>',
  data: {bienvenida: 'final'},
  choices: {},
  trial_duration: 10000,
  on_finish: function(){
    window.location.href = "https://psicoling.com.ar";
  }
 };




// Crear línea de tiempo

timeline.push(bienvenida);
timeline.push(consentimiento)
timeline.push(demograficos_1)
timeline.push(demograficos_2)
timeline.push(demograficos_3)
timeline.push(demograficos_4)
timeline.push(instrucciones)
timeline.push(iniciar_practica)

// Sumar práctica a la timeline
for (var i = 0; i < practica_FINAL.length; i++) {
  timeline.push(practica_FINAL[i]);
}

timeline.push(iniciar_exp_txt)
timeline.push(iniciar_exp)


// Sumar condicional según el n de forma.
if (formasRndmAssign == 1) {
  for (var i = 1; i < f1_bloque_1_FINAL.length; i++) {
    timeline.push(f1_bloque_1_FINAL[i]);
  }

  for (var i = 0; i < f1_bloque_2_FINAL.length; i++) {
    timeline.push(f1_bloque_2_FINAL[i]);
  }

  for (var i = 0; i < f1_bloque_3_FINAL.length; i++) {
    timeline.push(f1_bloque_3_FINAL[i]);
  }
}


if (formasRndmAssign == 2) {
  for (var i = 1; i < f2_bloque_1_FINAL.length; i++) {
    timeline.push(f2_bloque_1_FINAL[i]);
  }

  for (var i = 0; i < f2_bloque_2_FINAL.length; i++) {
    timeline.push(f2_bloque_2_FINAL[i]);
  }

  for (var i = 0; i < f2_bloque_3_FINAL.length; i++) {
    timeline.push(f2_bloque_3_FINAL[i]);
  }
}
timeline.push(savingdata);
timeline.push(final);


// Iniciar experimento
jsPsych.init({
  show_progress_bar: true,
  timeline: timeline,
  on_finish: function(){
// jsPsych.data.displayData();
  }

});
