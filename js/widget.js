
// ELEMENTOS DEL DOM
const $widget = document.getElementById('waw-widget'); // widget de accesibilidad
const $close_button = document.getElementById('close-button');
const $open_button = document.getElementById('open-button');

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
let dark_theme = false
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
        updateMaskSize(); // Actualiza el tamaño de la máscara al abrirla
        document.addEventListener('mousemove', handleReadingMask); // Añade el evento de movimiento del mouse para la máscara de lectura
        $mask.classList.remove('hidden');
    }
    else {
        document.removeEventListener('mousemove', handleReadingMask); // Elimina el evento de movimiento del mouse para la máscara de lectura
        $mask.classList.add('hidden');
    }
}

const toggleReadingLine = () => {
    states.reading_line = !states.reading_line;
    if(states.reading_line){
        document.addEventListener('mousemove', handleReadingLine); // Añade el evento de movimiento del mouse para la línea guía
        handleReadingLine({clientY: posYmouse}); // Inicializa la posición de la línea guía al abrirla
        $line.classList.remove('hidden');
    }
    else {
        document.removeEventListener('mousemove', handleReadingLine); // Elimina el evento de movimiento del mouse para la línea guía
        $line.classList.add('hidden');
    }
}

const toggleColorInvert = () =>{
    states.color_invert = !states.color_invert;
    document.documentElement.classList.toggle('WAWInvertedColor');
}

const toggleBigCursor = () =>{
    states.big_cursor = !states.big_cursor;
    document.documentElement.classList.toggle('WAWBigCursor');
}

const toggleGrayscale = () =>{
    states.greyscale = !states.greyscale;
    document.documentElement.classList.toggle('WAWGreyscale');
}

const toggleHighlightLinks = () =>{
    states.highlight_links = !states.highlight_links;
    document.documentElement.classList.toggle('WAWHighlightLinks');
}

let focoPorTeclado = false;

const focusByTab = (e) =>{if (e.key === 'Tab') focoPorTeclado = true;}
const focusByMousedown = () => focoPorTeclado = false
const handleFocusIn = (e) =>{
    if (!focoPorTeclado) return;
    readElement(generateDescription(e.target))
}

const toggleVoiceReading = () =>{
    states.voice_reading = !states.voice_reading
    if(states.voice_reading) {
        document.addEventListener('keydown', focusByTab);
        document.addEventListener('mousedown', focusByMousedown);
        document.addEventListener('focusin', handleFocusIn);
        readElement("lectura de pantalla activada");
    }
    else{
        document.removeEventListener('keydown', focusByTab);
        document.removeEventListener('mousedown', focusByMousedown);
        document.removeEventListener('focusin', handleFocusIn);
        if(temporal_element) temporal_element.classList.remove("read-text");
        readElement("lectura de pantalla desactivada");
    }
}

const optionsButtons = (target) => { //controla que función debe aplicarse según el boton presionado
    target.closest('.opcion').classList.toggle('active');
    if(target.closest("#btn-reading-line")) toggleReadingLine();
    else if(target.closest("#btn-reading-mask")) toggleReadingMask();
    else if(target.closest("#btn-big-cursor")) toggleBigCursor();
    else if(target.closest("#btn-color-invert")) toggleColorInvert();
    else if(target.closest("#btn-greyscale")) toggleGrayscale();
    else if(target.closest("#btn-highlight-links")) toggleHighlightLinks();
    else if(target.closest("#btn-voice-reading")) toggleVoiceReading();
    
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
    if(widget_open) {
        $widget.removeAttribute("inert");
        $close_button.focus();
        $open_button.setAttribute("inert","")
    }
    else {
        $widget.setAttribute("inert","");
        $open_button.removeAttribute("inert")
        $open_button.focus();
    }
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

const generateDescription = (target) => {
    let description = '';
    let tag = target.tagName.toLowerCase();
    let rol = target.getAttribute('role');
    let label = target.getAttribute('aria-label') || target.alt || target.innerText || target.value || target.placeholder || "Sin descripción";

    if (rol) description += rol + ': ';
    else if (tag === 'a') description += 'Enlace: ';
    else if (tag === 'button') description += 'Botón: ';
    else if (tag === 'input') description += 'Campo: ';
    else if(tag in tag_list) description += tag_list[tag] + ': '

    return description + label.trim();
}

const readElement = (message) => {
    const text = new SpeechSynthesisUtterance(message);
    text.lang = voice_reading_lang
    text.rate = voice_reading_speed
    speechSynthesis.cancel();
    speechSynthesis.speak(text);
}

const tag_list={
    p: "Párrafo",
    h1: "Título Nivel 1",
    h2: "Título Nivel 2",
    h3: "Título Nivel 3",
    h4: "Título Nivel 4",
    h5: "Título Nivel 5",
    h6: "Título Nivel 6",
    img: "Imagen",
    span:"",
    strong: "",
    mark: "",
    i: ""
}

// ::::::::::::::::::::::::



document.addEventListener("click", (e) => {
    posYmouse = e.clientY; // Actualiza la posición del mouse al hacer clic
    if(e.target.closest('.opcion') && !e.target.closest('.opcion--reset') && !e.target.closest('.opcion--texto')) optionsButtons(e.target);
    if(widget_open && !$widget.contains(e.target)) toggleWidget() // cierra el widget al hacer click fuera del mismo
    if(e.target.closest("#open-button") || e.target.closest("#close-button")) toggleWidget(); 
    else if(e.target.closest("[data-waw-function='control-text']")) controlText(e.target)
    else if(e.target.closest('[data-waw-function="reset"]')) resetWidgetFunctions();
    else if(e.target.closest('[data-waw-function="toggle-theme"]')) toggleTheme();
    if(states.reading_mask) readingMaskControls(e);
    if(states.reading_line) readingLineControls(e);

    //lectura de pantalla (en desarrollo)
    if(states.voice_reading){ 
        if(e.target.tagName.toLowerCase() in tag_list){
            if(temporal_element) temporal_element.classList.remove("read-text");
            temporal_element = e.target
            temporal_element.classList.add("read-text");
            readElement(generateDescription(e.target))
        }
    }
    // ::::::::::::::::::::::::
});

$text_slider.addEventListener('input', (e) => {
    text_size = e.target.value;
    document.documentElement.style.fontSize = text_size + '%';
    console.log(text_size)
});

