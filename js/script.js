
// ELEMENTOS DEL DOM
const $widget = document.getElementById('waw-widget'); // widget de accesibilidad

const $mask = document.getElementById('waw-reading-mask'); // máscara de lectura
const $mask_top = document.getElementById('waw-reading-mask__top'); // parte superior de la máscara de lectura
const $mask_middle = document.getElementById('waw-reading-mask__middle'); // parte central de la máscara de lectura
const $bmask_plus = document.getElementById('btn-plus-mask'); // botón para aumentar el tamaño de la máscara
const $bmask_minus = document.getElementById('btn-minus-mask'); // botón para disminuir el tamaño de la máscara
const $bmask_close = document.getElementById('btn-close-mask'); // botón para cerrar la máscara de lectura

const $line = document.getElementById('guia-lectura'); // línea guía de lectura
const $bline_close = document.getElementById('btn-close-line'); // botón para cerrar la guía de lectura

const $text_slider = document.getElementById('text-slider')
const $btn_reading_mask = document.getElementById('btn-reading-mask'); // botón para activar/desactivar la máscara de lectura
const $btn_reading_line = document.getElementById('btn-reading-line'); // botón para activar/desactivar la línea guía de lectura
const $btn_big_cursor = document.getElementById('btn-big-cursor'); // botón para activar/desactivar el cursor grande
const $btn_color_invert = document.getElementById('btn-color-invert'); // botón para activar/desactivar la inversión de colores
const $btn_greyscale = document.getElementById('btn-greyscale'); // botón para activar/desactivar la escala de grises
const $btn_highlight_links = document.getElementById('btn-highlight-links'); // botón para activar/desactivar el resaltado de enlaces
const $btn_voice_reading = document.getElementById('btn-voice-reading'); // botón para activar/desactivar la lectura por voz

let mask_height = 100;  // altura inicial de la máscara de lectura
let posYmouse = 100; // posición del mouse en el eje Y - para la máscara y linea de lectura

let widget_open = false // estado del widget
let text_size = 100

const min_height = 50 // altura mínima de la máscara de lectura
const max_height = 300; // altura máxima de la máscara de lectura


// ESTADO DE LOS AJUSTES DE ACCESIBILIDAD
const states = {
    reading_mask: false, // estado de la máscara de lectura
    reading_line: false, // estado de la guía de lectura
    big_cursor: false, // estado del cursor grande
    color_invert: false, // estado de la inversión de colores
    greyscale: false, // estado de la escala de grises
    highlight_links: false, // estado del resaltado de enlaces
    voice_reading: false // estado de la lectura por voz
}


const handleReadingMask = (e) => {
    posYmouse = e.clientY; // Actualiza la posición del mouse
    if(posYmouse <= mask_height / 2)
        $mask_top.style.height = "0px";
    else if(posYmouse >= innerHeight - (mask_height / 2))
        $mask_top.style.height = (innerHeight - mask_height) + 'px';
    else
        $mask_top.style.height = posYmouse - (mask_height / 2) + 'px';
}

const handleReadingLine = (e) => { // Actualiza la posición de la línea guía
    posYmouse = e.clientY;
    $line.style.top = (posYmouse - 3) + 'px'; 
}

const updateMaskSize = () => {
    $mask_middle.style.height = mask_height + 'px';
    $mask_top.style.height = posYmouse - (mask_height / 2) + 'px';
}

const readingMaskControls = (e)=>{ // Controla botones de la máscara de lectura y sus acciones
    if(e.target == $bmask_plus){
        mask_height = (mask_height + 10 > max_height) ? max_height : mask_height + 10;
    }else if(e.target == $bmask_minus){
        mask_height = (mask_height - 10 < min_height) ? min_height : mask_height - 10;
    }else if(e.target == $bmask_close){
        $mask.classList.add('hidden');
        states.reading_mask = false;
        $btn_reading_mask.classList.remove('active'); // Desactiva el botón de la máscara de lectura
    }
    updateMaskSize();
}
const readingLineControls = (e)=>{ // Controla el boton de cierre de la guía de lectura
    if(e.target == $bline_close){
        $line.classList.add('hidden');
        states.reading_line = false;
        $btn_reading_line.classList.remove('active'); // Desactiva el botón de la guía de lectura
    }
}

const toggleReadingMask = () => {
    states.reading_mask = !states.reading_mask;
    if(states.reading_mask){
        $mask.classList.remove('hidden');
        $btn_reading_mask.classList.add('active'); // Activa el botón de la máscara de lectura
        updateMaskSize(); // Actualiza el tamaño de la máscara al abrirla
        document.addEventListener('mousemove', handleReadingMask); // Añade el evento de movimiento del mouse para la máscara de lectura
    }
    else {
        $mask.classList.add('hidden');
        $btn_reading_mask.classList.remove('active'); // Desactiva el botón de la máscara de lectura
        document.removeEventListener('mousemove', handleReadingMask); // Elimina el evento de movimiento del mouse para la máscara de lectura
    }
}
const toggleReadingLine = () => {
    states.reading_line = !states.reading_line;
    if(states.reading_line){
        $line.classList.remove('hidden');
        $btn_reading_line.classList.add('active'); // Activa el botón de la guía de lectura
        document.addEventListener('mousemove', handleReadingLine); // Añade el evento de movimiento del mouse para la línea guía
        handleReadingLine({clientY: posYmouse}); // Inicializa la posición de la línea guía al abrirla
    }
    else {
        $line.classList.add('hidden');
        $btn_reading_line.classList.remove('active'); // Desactiva el botón de la guía de lectura
        document.removeEventListener('mousemove', handleReadingLine); // Elimina el evento de movimiento del mouse para la línea guía
    }
}

const optionsButtons = (target) => { //controla que función debe aplicarse según el boton presionado (puede simplificarse)
    if(target.closest('.opcion') && !target.closest('.opcion--reset') && !target.closest('.opcion--texto')){
        target.closest('.opcion').classList.toggle('active');
        if(target.closest("#btn-reading-line")){
            toggleReadingLine()
        }
        else if(target.closest("#btn-reading-mask")){
            toggleReadingMask();
        }
        else if(target.closest("#btn-big-cursor")){
            states.big_cursor = !states.big_cursor;
            document.documentElement.classList.toggle('WAWBigCursor');
        }
        else if(target.closest("#btn-color-invert")){
            states.color_invert = !states.color_invert;
            document.documentElement.classList.toggle('WAWInvertedColor');
        }
        else if(target.closest("#btn-greyscale")){
            states.greyscale = !states.greyscale;
            document.documentElement.classList.toggle('WAWGreyscale');
        }
        else if(target.closest("#btn-highlight-links")){
            states.highlight_links = !states.highlight_links;
            document.documentElement.classList.toggle('WAWHighlightLinks');
        }
        else if(target.closest("#btn-voice-reading")){
            states.voice_reading = !states.voice_reading
            if(states.voice_reading)
                readText("lectura de pantalla activada");
            else{
                if(temporal_element) temporal_element.classList.remove("read-text");
                readText("lectura de pantalla desactivada");
            }
        }
    }
}

const resetWidgetFunctions = () => {
    Object.keys(states).forEach(key => {states[key] = false;});
    states.reading_mask = true;
    states.reading_line = true;
    toggleReadingLine();
    toggleReadingMask();
    document.querySelectorAll('.opcion').forEach(opcion => {
        opcion.classList.remove('active');
    });
    document.documentElement.classList.remove('WAWBigCursor', 'WAWInvertedColor', 'WAWGreyscale', 'WAWHighlightLinks');
    if(temporal_element) temporal_element.classList.remove("read-text");
}

const toggleTheme = () => document.documentElement.classList.toggle("dark-theme")
const toggleWidget = () => {
    $widget.classList.toggle('open');
    widget_open = !widget_open;
}

const controlText = (btn) => {
    if (btn.id === "btn-text-plus" && text_size < 150) {
        text_size += 10;
    } else if (btn.id === "btn-text-minus" && text_size > 80) {
        text_size -= 10;
    }
    $text_slider.value = text_size;
    document.body.style.fontSize = text_size + '%';
}


// :::::::::::::::  control de la lectura de pantalla (en desarrollo)   :::::::::::::::

let voice_reading_speed = 0.8
let voice_reading_lang = "es-ES"

let temporal_element = null;
let temporal_message = "";
let temporal_tag = null;

const readText = (message = temporal_message) => {
    const text = new SpeechSynthesisUtterance(message);
    text.lang = voice_reading_lang
    text.rate = voice_reading_speed
    speechSynthesis.cancel();
    window.speechSynthesis.speak(text);
}

const tag_list={
    P: "Párrafo",
    H1: "Título Nivel 1",
    H2: "Título Nivel 2",
    H3: "Título Nivel 3",
    H4: "Título Nivel 4",
    H5: "Título Nivel 5",
    H6: "Título Nivel 6",
}

// ::::::::::::::::::::::::




document.addEventListener("click", (e) => {
    posYmouse = e.clientY; // Actualiza la posición del mouse al hacer clic
    optionsButtons(e.target);
    //if(widget_open && !$widget.contains(e.target)) toggleWidget() // cierra el widget al hacer click fuera del mismo
    if(e.target.closest("#boton-abrir") || e.target.closest("#boton-cerrar")) toggleWidget(); 
    else if(e.target.closest("[data-function='control-text']")) controlText(e.target)
    else if(e.target.closest('[data-function="reset"]')) resetWidgetFunctions();
    else if(e.target.closest('[data-function="toggle-theme"]')) toggleTheme();
    else if(states.reading_mask) readingMaskControls(e);
    else if(states.reading_line) readingLineControls(e);

    //lectura de pantalla (en desarrollo)
    if(states.voice_reading){ 
        if(e.target.tagName === 'IMG'){
            if(temporal_element) temporal_element.classList.remove("read-text");
            temporal_element = e.target
            temporal_element.classList.add("read-text");
            temporal_message = "Imagen. " + ((e.target.alt) ? e.target.alt : "Sin descripcion")
            temporal_tag = e.target.tagName
            readText()
        }
        else if((e.target.tagName === 'SPAN' || e.target.tagName === 'STRONG') && e.target.parentElement.tagName === 'P'){
            if(temporal_element) temporal_element.classList.remove("read-text");
            temporal_element = e.target.parentElement
            temporal_element.classList.add("read-text");
            temporal_message = "Parrafo. " + temporal_element.textContent
            temporal_tag = temporal_element.tagName
            readText()
        }
        else if(e.target.tagName in tag_list){
            if(temporal_element) temporal_element.classList.remove("read-text");
            temporal_element = e.target
            temporal_element.classList.add("read-text");
            temporal_message = tag_list[e.target.tagName] + '. ' + temporal_element.textContent
            temporal_tag = e.target.tagName
            readText()
        }
    }
    console.log(e)
    // ::::::::::::::::::::::::
});

$text_slider.addEventListener('input', (e) => {
    text_size = e.target.value;
    document.documentElement.style.fontSize = text_size + '%';
    console.log(text_size)
});

