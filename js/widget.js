
// ELEMENTOS DEL DOM
const $widget = document.getElementById('waw-widget'); // widget de accesibilidad
const $close_button = document.getElementById('close-button');
const $open_button = document.getElementById('open-button');

const $mask = document.getElementById('waw-reading-mask'); // máscara de lectura
const $mask_top = document.getElementById('waw-reading-mask__top'); // parte superior de la máscara de lectura
const $mask_middle = document.getElementById('waw-reading-mask__middle'); // parte central de la máscara de lectura
const $mask_controls = document.getElementById('reading-controls-mask'); // controles de la máscara de lectura
const $bmask_plus = document.getElementById('btn-plus-mask'); // botón para aumentar el tamaño de la máscara
const $bmask_minus = document.getElementById('btn-minus-mask'); // botón para disminuir el tamaño de la máscara
const $bmask_close = document.getElementById('btn-close-mask'); // botón para cerrar la máscara de lectura

const $line = document.getElementById('guia-lectura'); // línea guía de lectura
const $line_controls = document.getElementById('reading-controls-line'); // controles de la línea guía de lectura
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
let posYmouse = innerHeight / 2; // posición del mouse en el eje Y - para la máscara y linea de lectura

let widget_open = false // estado del widget

let touchDevice = false; // indica si el dispositivo es táctil

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
    voice_reading: false, // estado de la lectura por voz
    dark_theme: false, // estado del tema oscuro
    text_size: 100 // tamaño del texto
}

// almacenamiento en local de los estados de ajustes de accesibilidad

const saveStatesToLocalStorage = () => {
    if (localStorage.getItem('wawStates')) return;
    localStorage.setItem('wawStates', JSON.stringify(states));
};
const updateStatesToLocalStorage = () => localStorage.setItem('wawStates', JSON.stringify(states));

const loadStatesFromLocalStorage = () => {
    const saved = localStorage.getItem('wawStates');
    if (saved) Object.assign(states, JSON.parse(saved));
    else return;
    if(states.dark_theme) document.documentElement.classList.add("dark-theme");
    if(states.big_cursor) activateBigCursor();
    if(states.greyscale) activateGrayscale();
    if(states.color_invert) activateColorInvert();
    if(states.highlight_links) activateHighlightLinks();
    if(states.reading_line) activateReadingLine();
    if(states.reading_mask) activateReadingMask();
    if(states.voice_reading) activateVoiceReading();
    document.documentElement.style.fontSize = states.text_size + '%';
    $text_slider.value = states.text_size;
}


// mascara de lectura

const updateMaskPosition = (e) => {
    posYmouse = e.clientY; // Actualiza la posición del mouse
    if(posYmouse <= mask_height / 2)
        $mask_top.style.height = "0px";
    else if(posYmouse >= innerHeight - (mask_height / 2))
        $mask_top.style.height = (innerHeight - mask_height) + 'px';
    else
        $mask_top.style.height = posYmouse - (mask_height / 2) + 'px';
}

const updateMaskSize = () => {
    $mask_middle.style.height = mask_height + 'px';
    $mask_top.style.height = posYmouse - (mask_height / 2) + 'px';
}

const readingMaskControls = (e)=>{ // Controla botones de la máscara de lectura y sus acciones
    $mask_controls.classList.add("active");
    if(e.target == $bmask_plus)
        mask_height = (mask_height + 10 > max_height) ? max_height : mask_height + 10;
    else if(e.target == $bmask_minus)
        mask_height = (mask_height - 10 < min_height) ? min_height : mask_height - 10;
    else if(e.target == $bmask_close)
        deactivateReadingMask();
    updateMaskSize();
}

const activateReadingMask = () => {
    states.reading_mask = true;
    if(touchDevice){
        if(states.reading_line) deactivateReadingLine(); // Desactiva la línea guía si está activa
        posYmouse = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
    } 
    else
        document.addEventListener('mousemove', updateMaskPosition); // Añade el evento de movimiento del mouse para la máscara de lectura
    updateMaskSize();
    $mask.classList.remove('hidden');
    $btn_reading_mask.classList.add('active');
}

const deactivateReadingMask = () => {
    states.reading_mask = false;
    document.removeEventListener('mousemove', updateMaskPosition); // Elimina el evento de movimiento del mouse para la máscara de lectura
    $mask.classList.add('hidden');
    $mask_controls.classList.remove("active");
    $btn_reading_mask.classList.remove('active');
}

const toggleReadingMask = () => {
    if(states.reading_mask) deactivateReadingMask();
    else activateReadingMask();
}


// linea de guia de lectura

const activateReadingLine = () => {
    states.reading_line = true;
    if(touchDevice){
        if(states.reading_mask) deactivateReadingMask(); // Desactiva la máscara de lectura si está activa
        posY = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
    } 
    else{
        posY = posYmouse
        document.addEventListener('mousemove', updateReadingLine); // Añade el evento de movimiento del mouse para la línea guía
    }
    updateReadingLine({clientY: posY}); // Inicializa la posición de la línea guía al abrirla
    $line.classList.remove('hidden');
    $btn_reading_line.classList.add('active');
}

const deactivateReadingLine = () => {
    document.removeEventListener('mousemove', updateReadingLine); // Elimina el evento de movimiento del mouse para la línea guía
    $line.classList.add('hidden');
    $line_controls.classList.remove("active");
    $btn_reading_line.classList.remove('active');
    states.reading_line = false;
}

const toggleReadingLine = () => {
    if(states.reading_line) deactivateReadingLine();
    else activateReadingLine();
}

const updateReadingLine = (e) => { // Actualiza la posición de la línea guía
    posYmouse = e.clientY; // Actualiza la posición del mouse
    $line.style.top = (posYmouse - 4) + 'px'; 
}

const readingLineControls = (e)=>{ // Controla el boton de cierre de la guía de lectura
    $line_controls.classList.add("active");
    if(e.target == $bline_close){
        $line.classList.add('hidden');
        $line_controls.classList.remove("active");
        states.reading_line = false;
        $btn_reading_line.classList.remove('active'); // Desactiva el botón de la guía de lectura
    }
}

// manejo de gestos táctiles para la máscara y linea de lectura

let startY = 0;

const mask = new Hammer($mask_middle);

mask.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

mask.on("panstart", () => startY = parseFloat($mask_top.style.height))

mask.on("panmove", (ev) => {
    const newY = startY + ev.deltaY;
    $mask_top.style.height = `${newY}px`;
});

mask.on("swipe", (ev) => {
    if (ev.direction === Hammer.DIRECTION_LEFT) $mask_controls.classList.add("active");
    if (ev.direction === Hammer.DIRECTION_RIGHT) $mask_controls.classList.remove("active");
});

const line = new Hammer($line);
line.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

line.on("panstart", () => startY = parseFloat($line.style.top))
line.on("panmove", (ev) => {
    const newY = startY + ev.deltaY;
    $line.style.top = `${newY - 4}px`;
});
line.on("panend", () => startY = parseFloat($line.style.top));

line.on("swipe", (ev) => {
    if (ev.direction === Hammer.DIRECTION_RIGHT) $line_controls.classList.add("active");
    if (ev.direction === Hammer.DIRECTION_LEFT) $line_controls.classList.remove("active");
});


// inversor de colores

const activateColorInvert = () =>{
    document.documentElement.classList.add('WAWInvertedColor');
    $btn_color_invert.classList.add('active');
    states.color_invert = true;
}
const deactivateColorInvert = () =>{
    document.documentElement.classList.remove('WAWInvertedColor');
    $btn_color_invert.classList.remove('active');
    states.color_invert = false;
}
const toggleColorInvert = () =>{
    if(states.color_invert) deactivateColorInvert();
    else activateColorInvert();
}

// cursor grnde 

const activateBigCursor = () =>{
    document.documentElement.classList.add('WAWBigCursor');
    $btn_big_cursor.classList.add('active');
    states.big_cursor = true;
}
const deactivateBigCursor = () =>{
    document.documentElement.classList.remove('WAWBigCursor');
    $btn_big_cursor.classList.remove('active');
    states.big_cursor = false;
}
const toggleBigCursor = () =>{
    if(states.big_cursor) deactivateBigCursor();
    else activateBigCursor();
}

// escala de grises 

const activateGrayscale = () =>{
    document.documentElement.classList.add('WAWGreyscale');
    $btn_greyscale.classList.add('active');
    states.greyscale = true;
}
const deactivateGrayscale = () =>{
    document.documentElement.classList.remove('WAWGreyscale');
    $btn_greyscale.classList.remove('active');
    states.greyscale = false;
}

const toggleGrayscale = () =>{
    if(states.greyscale) deactivateGrayscale();
    else activateGrayscale();
}


// resaltar enlaces

const activateHighlightLinks = () =>{
    document.documentElement.classList.add('WAWHighlightLinks');
    $btn_highlight_links.classList.add('active');
    states.highlight_links = true;
}
const deactivateHighlightLinks = () =>{
    document.documentElement.classList.remove('WAWHighlightLinks');
    $btn_highlight_links.classList.remove('active');
    states.highlight_links = false;
}

const toggleHighlightLinks = () =>{
    if(states.highlight_links) deactivateHighlightLinks();
    else activateHighlightLinks();
}

// control del tamaño del texto

const controlText = (btn) => {
    if (btn.id === "btn-text-plus" && states.text_size < 150) {
        states.text_size += 10;
    } else if (btn.id === "btn-text-minus" && states.text_size > 80) {
        states.text_size -= 10;
    }
    $text_slider.value = states.text_size;
    document.documentElement.style.fontSize = states.text_size + '%';
}

const updateFontSize = (e) => {
    states.text_size = Number(e.target.value);
    document.documentElement.style.fontSize = states.text_size + '%';
}

// detección de dispositivo tactil o escritorio

const isMobile = () => {
    let mobileAgent = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (mobileAgent) {
        touchDevice = true;
        $mask.classList.add("mobile");
        $line.classList.add("mobile");
        $mask_controls.classList.remove("desktop");
        $line_controls.classList.remove("desktop");
        console.log("Estás en móvil o tablet");
    } else {
        touchDevice = false;
        $mask.classList.remove("mobile");
        $line.classList.remove("mobile");
        $mask_controls.classList.add("desktop");
        $line_controls.classList.add("desktop");
        console.log("Estás en PC");
    }
}

// ================================================


// reiniciar todas las funciones del widget

const resetWidgetFunctions = () => {
    deactivateBigCursor();
    deactivateColorInvert();
    deactivateGrayscale();
    deactivateHighlightLinks();
    deactivateReadingLine();
    deactivateReadingMask();
    deactivateVoiceReading();
    states.text_size = 100;
    $text_slider.value = states.text_size;
    document.documentElement.style.fontSize = states.text_size + '%';
    if(elementToRead) elementToRead.classList.remove("read-text");
}

// manejo del tema oscuro

const toggleTheme = () => {
    document.documentElement.classList.toggle("dark-theme")
    states.dark_theme = !states.dark_theme
}

// abrir/cerrar el widget

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



// :::::::::::::::  control de la lectura de pantalla (en desarrollo)   :::::::::::::::

let voice_reading_speed = 0.8
let voice_reading_lang = "es-ES"

let elementToRead = null;
let focoPorTeclado = false;

const focusByTab = (e) =>{if (e.key === 'Tab') focoPorTeclado = true;}
const focusByMousedown = () => focoPorTeclado = false
const handleFocusIn = (e) =>{
    if (!focoPorTeclado) return;
    readElement(generateDescription(e.target))
}

const toggleVoiceReading = () =>{
    if(states.voice_reading) deactivateVoiceReading();
    else activateVoiceReading();
}

const activateVoiceReading = () =>{
    states.voice_reading = true;
    document.addEventListener('keydown', focusByTab);
    document.addEventListener('mousedown', focusByMousedown);
    document.addEventListener('focusin', handleFocusIn);
    $btn_voice_reading.classList.add('active');
    readElement("lectura de pantalla activada");

}

const deactivateVoiceReading = () =>{
    states.voice_reading = false;
    document.removeEventListener('keydown', focusByTab);
    document.removeEventListener('mousedown', focusByMousedown);
    document.removeEventListener('focusin', handleFocusIn);
    $btn_voice_reading.classList.remove('active');
    if(elementToRead) elementToRead.classList.remove("read-text");
    elementToRead = null;
    readElement("lectura de pantalla desactivada");
}

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

const selectElementToRead = (element) => {
    if(element.tagName.toLowerCase() in tag_list){
        if(element.closest(".opcion")) return; // evita leer los elementos del widget
        if(elementToRead) elementToRead.classList.remove("read-text");
        elementToRead = element
        elementToRead.classList.add("read-text");
        readElement(generateDescription(element))
    }
}

const tag_list={ //lista de etiquetas comunes para la lectura de pantalla
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
    posYmouse = e.clientY; // Actualiza la posición del mouse
    if(e.target.closest("#btn-reading-line")) toggleReadingLine();
    else if(e.target.closest("#btn-reading-mask")) toggleReadingMask();
    else if(e.target.closest("#btn-big-cursor")) toggleBigCursor();
    else if(e.target.closest("#btn-color-invert")) toggleColorInvert();
    else if(e.target.closest("#btn-greyscale")) toggleGrayscale();
    else if(e.target.closest("#btn-highlight-links")) toggleHighlightLinks();
    else if(e.target.closest("#btn-voice-reading")) toggleVoiceReading();
    else if(e.target.closest("#open-button") || e.target.closest("#close-button")) toggleWidget(); 
    else if(e.target.closest("[data-waw-function='control-text']")) controlText(e.target)
    else if(e.target.closest('[data-waw-function="reset"]')) resetWidgetFunctions();
    else if(e.target.closest('[data-waw-function="toggle-theme"]')) toggleTheme();
    else if(e.target.closest('#reading-controls-mask')) readingMaskControls(e);
    else if(e.target.closest('#reading-controls-line')) readingLineControls(e);
    else if(widget_open && !$widget.contains(e.target)) toggleWidget() // cierra el widget al hacer click fuera del mismo

    updateStatesToLocalStorage();
    //lectura de pantalla (en desarrollo)
    if(states.voice_reading) selectElementToRead(e.target);
    
});

$text_slider.addEventListener('input', updateFontSize);

isMobile();
saveStatesToLocalStorage();
loadStatesFromLocalStorage();